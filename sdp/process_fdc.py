import os
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

from sdp.util import project_path

data_dir = os.path.join(project_path, "data")

combined_foods = []
combined_nutrients = []
source_ratios = {}
source_threshold_nutrients = {}
for source in ["foundation", "survey", "branded"]:
  food = pd.read_csv(os.path.join(data_dir, source, "food.csv"))
  for to_drop in ["food_category_id", "publication_date"]:
    if to_drop in food.columns:
      food = food.drop(to_drop, axis=1)
  attribute = pd.read_csv(os.path.join(data_dir, source, "food_attribute.csv"))
  nutrient = pd.read_csv(os.path.join(data_dir, source, "food_nutrient.csv"))
  for to_drop in [
      "data_points", "derivation_id", "min", "max", "median", "footnote",
      "min_year_acqured", "min_year_acquired"
  ]:
    if to_drop in nutrient.columns:
      nutrient = nutrient.drop(to_drop, axis=1)

  combined_foods.append(food)
  combined_nutrients.append(nutrient)
  source_ratios[source] = len(nutrient) / len(food)
  source_threshold_nutrients[source] = (nutrient['fdc_id'].value_counts() > 15).sum()

combined_foods = pd.concat(combined_foods)
combined_nutrients = pd.concat(combined_nutrients)

print(source_ratios)
print(source_threshold_nutrients)

print(f"{combined_foods.shape[0] / 1000 / 1000:0.2f}m foods")
print(f"{combined_nutrients.shape[0] / 1000 / 1000:0.2f}m nutrients")