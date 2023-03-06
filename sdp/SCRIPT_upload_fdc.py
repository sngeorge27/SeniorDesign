import json
import os
import numpy as np
from tqdm import tqdm
import matplotlib.pyplot as plt
from collections import Counter

from sdp.SCRIPT_process_fdc import combined_foods, combined_nutrients
from sdp.database import Food, Nutrient, Session
from sdp.util import project_path

core_ids = json.load(open(os.path.join(project_path, "core_ids.json")))


def analyze():
  fdc_ids = combined_nutrients['fdc_id'].unique().tolist()
  sources = combined_foods['data_type'].unique().tolist()
  sources = [
      s for s in sources if s not in ['sample_food', 'market_acquisition']
  ]
  fig, axes = plt.subplots(len(sources), figsize=(16, 6))
  for i, data_type in enumerate(sources):
    nutrient_id_samples = []
    fdc_ids = combined_foods[combined_foods['data_type'] ==
                             data_type]['fdc_id'].unique().tolist()
    for fdc_id in tqdm(fdc_ids[::32][:512]):
      this_food_nutrients = combined_nutrients[combined_nutrients['fdc_id'] ==
                                               fdc_id]
      nutrient_id_samples.append(this_food_nutrients['nutrient_id'].tolist())
    counts = Counter([n for k in nutrient_id_samples for n in k])
    axes[i].set_title(f"Prevalence for {data_type} ({len(fdc_ids)} foods)")
    amt = min([128, len(counts)])
    print(data_type, amt, counts.most_common(amt))
    axes[i].scatter(
        np.arange(amt),
        [v / len(nutrient_id_samples) for k, v in counts.most_common(128)])
    axes[i].set_xticks(np.arange(amt), [k for k, v in counts.most_common(128)],
                       rotation=90)

  plt.savefig("results.png")
  plt.show()


def upload():
  use_foods = combined_foods[combined_foods['data_type'] ==
                             'survey_fndds_food']

  for food_i in tqdm(range(use_foods.shape[0])):
    food_row = use_foods.iloc[food_i]
    nutrients = combined_nutrients[combined_nutrients['fdc_id'] ==
                                   food_row['fdc_id']]
    at_least_one_nutrient = False
    for nutrient_i in range(nutrients.shape[0]):
      nutrient_row = nutrients.iloc[nutrient_i]
      if int(nutrient_row['nutrient_id']) in core_ids:
        at_least_one_nutrient = True
        Session.add(
            Nutrient(fdc_id=int(food_row['fdc_id']),
                     nutrient_id=int(nutrient_row['nutrient_id']),
                     amount_per_100g=float(nutrient_row['amount'])))
    if at_least_one_nutrient:
      Session.add(
          Food(fdc_id=int(food_row['fdc_id']),
               name=food_row['description'],
               origin_dataset=food_row['data_type']))
    Session.flush()
    Session.commit()


if __name__ == "__main__":
  # analyze()
  upload()
