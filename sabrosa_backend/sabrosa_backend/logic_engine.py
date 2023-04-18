import random
import copy
import pickle
import os
import json
from timeit import timeit
from typing import List

import matplotlib.pyplot as plt
from matplotlib.cm import get_cmap
import thefuzz.process
from tqdm import tqdm
import numpy as np
import pandas as pd

from sabrosa_backend.util import project_path

# load and setup data
food_df = pd.read_csv(os.path.join(project_path, "shortened_food.csv"))
use_fdc_ids = food_df['fdc_id'].tolist()
nutrient_df = pd.read_csv(os.path.join(project_path, "nutrient.csv"))
nutrient_df = nutrient_df[nutrient_df['fdc_id'].isin(use_fdc_ids)]
food_df = food_df.sort_values(['fdc_id'])
nutrient_df = nutrient_df.sort_values(['fdc_id', 'nutrient_id'])
nutrient_definitions = json.load(
    open(os.path.join(project_path, "nutrient_definitions.json")))
intake_profiles = json.load(
    open(os.path.join(project_path, "intake_profiles.json")))
global_uls = json.load(open(os.path.join(project_path, "global_uls.json")))
intake_profile_mapping = json.load(
    open(os.path.join(project_path, "intake_profile_mapping.json")))
reversed_intake_profile_mapping = {
    v: k
    for k, v in intake_profile_mapping.items()
}
nutrient_definitions = sorted(nutrient_definitions, key=lambda x: x['id'])
master_food_nutrient_amounts = []

for fdc_id, group in nutrient_df.groupby('fdc_id'):
  master_food_nutrient_amounts.append(group['amount_per_100g'].values)

master_food_nutrient_amounts = np.array(master_food_nutrient_amounts)

from transformers import AutoTokenizer, AutoModel

tokenizer = AutoTokenizer.from_pretrained(
    "sentence-transformers/paraphrase-MiniLM-L3-v2")
model = AutoModel.from_pretrained(
    "sentence-transformers/paraphrase-MiniLM-L3-v2")

index_strings = (food_df['shortened_name'] + " " + food_df['emojis']).tolist()
index_strings = [str(s) for s in index_strings]
embeds = []
for b_i in tqdm(range(len(index_strings) // 32 + 1)):
  start = b_i * 32
  end = min([len(index_strings), (b_i + 1) * 32])
  if start < end:
    these_embeds = model(**tokenizer.batch_encode_plus(
        index_strings[start:end], return_tensors="pt",
        padding=True)).pooler_output.detach().numpy()
    embeds.append(these_embeds)

search_index = np.concatenate(embeds, axis=0)


def get_food_log_nutrient_amounts(food_log):
  if len(food_log) == 0:
    return np.zeros(master_food_nutrient_amounts.shape[1])
  entry = food_log[0]
  nutrient_amounts = master_food_nutrient_amounts[use_fdc_ids.index(
      entry['fdc_id'])] * entry['amount'] / 100
  for entry in food_log[1:]:
    nutrient_amounts += master_food_nutrient_amounts[use_fdc_ids.index(
        entry['fdc_id'])] * entry['amount'] / 100
  return nutrient_amounts


def get_intake_profile(age: float,
                       sex: str,
                       is_lactating=False,
                       is_pregnant=False,
                       macro_ratio="maintain",
                       height_inches=68,
                       weight_pounds=150):
  def inner():
    assert sex in ["M", "F"]
    if is_lactating or is_pregnant:
      assert sex == "F"
    for entry in intake_profiles:
      min_years = entry['profile']['minAgeMonths'] / 12 + entry['profile'][
          'minAgeYears']
      max_years = entry['profile']['maxAgeMonths'] / 12 + (
          entry['profile']['maxAgeYears']
          if entry['profile']['maxAgeYears'] is not None else 100)
      if age >= min_years and age < max_years:
        if is_lactating and entry['profile']['lifeStageGroup'] == 'lactating':
          return entry
        if is_pregnant and entry['profile']['lifeStageGroup'] == 'pregnant':
          return entry
        if sex == "M" and entry['profile']['lifeStageGroup'] in [
            'infant', 'child', 'male'
        ]:
          return entry
        if sex == "F" and not is_lactating and not is_pregnant and entry[
            'profile']['lifeStageGroup'] in ['infant', 'child', 'female']:
          return entry

  macro_ratios = {
      "maintain": {
          "carb": 50,
          "fat": 30,
          "protein": 20
      },
      "loss": {
          "carb": 40,
          "protein": 30,
          "fat": 30
      },
      "gain": {
          "protein": 25,
          "carb": 50,
          "fat": 25
      },
      "keto": {
          "carb": 5,
          "protein": 30,
          "fat": 65
      }
  }
  calories = None
  if sex == "M":
    calories = 66 + (6.23 * weight_pounds) + (12.7 * height_inches) - (6.8 *
                                                                       age)
  else:
    calories = 655 + (4.35 * weight_pounds) + (4.7 * height_inches) - (4.7 *
                                                                       age)

  macro_amounts = {
      k: round(((v / 100) * calories) / (9 if k == "fat" else 4))
      for k, v in macro_ratios[macro_ratio].items()
  }

  entry = inner()
  if entry is not None:
    rdis = [{
        'value': value,
        'id': intake_profile_mapping[name]
    } for name, value in entry['RDI'].items()
            if name in intake_profile_mapping.keys()]
    uls = [{
        'value': value,
        'id': intake_profile_mapping[name]
    } for name, value in entry['UL'].items()
           if name in intake_profile_mapping.keys()]
    for global_ul in global_uls:
      matches = [ul for ul in uls if ul['id'] == global_ul['id']]
      if len(matches) == 0:
        uls.append(global_ul)
      elif matches[0]['value'] is None:
        match_i = [
            i for i, ul in enumerate(uls) if ul['id'] == global_ul['id']
        ][0]
        uls[match_i] = global_ul
    reversed_intake_profile_mapping
    target_amounts = []
    upper_limit_amounts = []
    for n_def in nutrient_definitions:
      rdi_counted = False
      ul_counted = False
      if n_def['id'] == 208:
        target_amounts.append(round(calories))
        upper_limit_amounts.append(round(calories * 1.1))
      else:
        for rdi in rdis:
          if rdi['id'] == n_def['id']:
            if rdi['id'] == 255:
              target_amounts.append(rdi['value'] * 1000)
              rdi_counted = True
            elif rdi['id'] == 312:
              target_amounts.append(rdi['value'] / 1000)
              rdi_counted = True
            elif rdi['id'] not in [203, 204, 205]:
              target_amounts.append(rdi['value'])
              rdi_counted = True
        for ul in uls:
          if ul['id'] == n_def['id']:
            if ul['id'] == 255:
              upper_limit_amounts.append(ul['value'] * 1000)
            elif ul['id'] == 312:
              upper_limit_amounts.append(ul['value'] / 1000)
            else:
              upper_limit_amounts.append(ul['value'])
            ul_counted = True
        if not rdi_counted:
          if n_def['id'] == 203:
            target_amounts.append(macro_amounts['protein'])
          elif n_def['id'] == 204:
            target_amounts.append(macro_amounts['fat'])
          elif n_def['id'] == 205:
            target_amounts.append(macro_amounts['carb'])
          else:
            target_amounts.append(None)
        if not ul_counted:
          upper_limit_amounts.append(None)
    return np.array(target_amounts), np.array(upper_limit_amounts)


def visualize_profile(target_amounts, upper_limit_amounts):
  lines = []
  for i, n_def in enumerate(nutrient_definitions):
    if not all([
        target_amounts[i] is None, upper_limit_amounts[i] is None, n_def['id']
        not in [204, 269]
    ]):
      lines.append({
          **n_def,
          "RDI":
          str(target_amounts[i]) +
          n_def['unitName'] if target_amounts[i] is not None else 'none',
          "UL":
          str(upper_limit_amounts[i]) +
          n_def['unitName'] if upper_limit_amounts[i] is not None else 'none',
      })
  pd.DataFrame(lines).to_csv("targets.csv")


def ratios_to_score(ratios):
  return np.where(ratios > 1, 1, ratios).sum(axis=-1)


def recommend(meal_nutrient_amounts,
              target_amounts,
              upper_limit_amounts,
              top_k=6,
              serving_size_to_recommend=50):
  target_amounts_placeholder = np.where(target_amounts == None, 0,
                                        target_amounts)
  upper_limits_placeholder = np.where(upper_limit_amounts == None, np.inf,
                                      upper_limit_amounts)
  init_ratios = np.where(
      meal_nutrient_amounts < target_amounts_placeholder,
      meal_nutrient_amounts / np.where(target_amounts_placeholder == 0, np.inf,
                                       target_amounts_placeholder),
      1 - (meal_nutrient_amounts - target_amounts_placeholder) /
      (upper_limits_placeholder - target_amounts_placeholder))
  candidate_nutrient_matrices = (
      meal_nutrient_amounts +
      (master_food_nutrient_amounts * serving_size_to_recommend / 100))
  ratios = np.where(
      candidate_nutrient_matrices < target_amounts_placeholder[np.newaxis],
      candidate_nutrient_matrices /
      np.where(target_amounts_placeholder == 0, np.inf,
               target_amounts_placeholder)[np.newaxis], 1 -
      (candidate_nutrient_matrices - target_amounts_placeholder[np.newaxis]) /
      (upper_limits_placeholder - target_amounts_placeholder)[np.newaxis])
  init_ratios = np.where(init_ratios < 0, 0, init_ratios)
  ratios = np.where(ratios < 0, 0, ratios)
  food_scores = (ratios * (food_df['popular_score'] >= 3).values.astype(np.float32)[:, np.newaxis]).sum(axis=-1)
  print(food_scores)
  # food_scores = ratios.sum(axis=-1)
  top_foods = np.argsort(food_scores)[::-1][random.randint(0, 7)::8][:top_k]
  improvement = ratios[top_foods.tolist()] - init_ratios[np.newaxis]
  if init_ratios.sum() > food_scores.max():
    return []
  else:
    relevant_to_target_idxs = np.where(target_amounts)[0]
    significant_nutrient_idxs = np.argsort(improvement, axis=-1)[:, ::-1]
    significant_nutrient_idxs = np.array(
        [[v for v in sub if v in relevant_to_target_idxs]
         for sub in significant_nutrient_idxs])[:top_k]
    significant_nutrients = [[nutrient_definitions[idx] for idx in idxs]
                             for idxs in significant_nutrient_idxs]
    to_return = food_df.iloc[top_foods]
    to_return['significant_1'] = [
        sig[0]['name'] for sig in significant_nutrients
    ]
    to_return['significant_2'] = [
        sig[1]['name'] for sig in significant_nutrients
    ]
    to_return['significant_3'] = [
        sig[2]['name'] for sig in significant_nutrients
    ]
    return to_return.to_dict('records')


def search(query, vegetarian=False, num_results=16):
  embed = model(**tokenizer([query], return_tensors="pt",
                            padding=True)).pooler_output.detach().numpy()
  semantic_scores = np.matmul(search_index, embed.T)[:, 0] / (
      np.linalg.norm(search_index, axis=-1) * np.linalg.norm(embed))
  levenstein_scores = np.array([
      r[1] / 100 for r in list(
          thefuzz.process.extractWithoutOrder(query,
                                              food_df['shortened_name']))
  ]) * 0.5
  combined_scores = (semantic_scores + levenstein_scores) * (
      (food_df['popular_score'] + 10) / 20)
  top_results = np.argsort(combined_scores)[::-1]
  result_rows = food_df.iloc[top_results][:num_results * 2]
  result_rows['search_score'] = sorted(combined_scores)[::-1][:num_results * 2]
  if vegetarian:
    result_rows = result_rows[result_rows['is_vegetarian']]
  result_rows = result_rows.to_dict('records')[:num_results]
  result_rows = [r for r in result_rows if r['search_score'] > 0.4]
  return result_rows


if __name__ == "__main__":
  targets, _ = get_intake_profile(20, "F", False, False, "loss", 64, 150)
  use_idxs = np.where(targets)[0]
  coef = np.corrcoef(master_food_nutrient_amounts[:, use_idxs], rowvar=False)
  coef = np.concatenate([coef, 3 * coef.mean(axis=0)[np.newaxis]], axis=0)
  plt.imshow(coef)
  plt.xticks(np.arange(coef.shape[1]),
             [nutrient_definitions[idx]['name'] for idx in use_idxs],
             rotation=90)
  plt.tight_layout()
  plt.savefig("correlation.png")
