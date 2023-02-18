import json
import re
from enum import Enum

import requests
import pandas as pd
from bs4 import BeautifulSoup
from attrs import define

sources = [
    "https://www.ncbi.nlm.nih.gov/books/NBK545442/table/appJ_tab3/?report=objectonly",
    "https://www.ncbi.nlm.nih.gov/books/NBK56068/table/summarytables.t2/?report=objectonly",
    "https://www.ncbi.nlm.nih.gov/books/NBK56068/table/summarytables.t4/?report=objectonly"
]


class LifeStageGroup(Enum):
  infant = 1
  child = 2
  male = 3
  female = 4
  pregnant = 5
  lactating = 6

  @staticmethod
  def from_string(s):
    if s == "Infants":
      return LifeStageGroup.infant
    elif s == "Children":
      return LifeStageGroup.child
    elif s == "Males":
      return LifeStageGroup.male
    elif s == "Females":
      return LifeStageGroup.female
    elif s == "Pregnancy":
      return LifeStageGroup.pregnant
    elif s == "Lactation":
      return LifeStageGroup.lactating
    else:
      raise RuntimeError(s)


@define
class Profile:
  lifeStageGroup: LifeStageGroup
  minAgeMonths: int
  maxAgeMonths: int
  minAgeYears: int
  maxAgeYears: int

  def __hash__(self):
    return hash((self.lifeStageGroup, self.minAgeMonths, self.maxAgeMonths,
                 self.minAgeYears, self.maxAgeYears))

  @staticmethod
  def is_same(a, b):
    if a.lifeStageGroup != b.lifeStageGroup:
      return False
    if a.minAgeMonths != b.minAgeMonths:
      return False
    if a.maxAgeMonths != b.maxAgeMonths:
      return False
    if a.minAgeYears != b.minAgeYears:
      return False
    if a.maxAgeYears != b.maxAgeYears:
      return False
    return True

  def to_json(self):
    return {
        "lifeStageGroup": self.lifeStageGroup.name,
        "minAgeMonths": self.minAgeMonths,
        "maxAgeMonths": self.maxAgeMonths,
        "minAgeYears": self.minAgeYears,
        "maxAgeYears": self.maxAgeYears
    }


def convert_to_digit(s):
  digits = [c for c in s if c.isdigit() or c == "."]
  return float("".join(digits)) if len(digits) > 0 else None


profiles_results = {}
for source in sources:
  response = requests.get(source)
  soup = BeautifulSoup(response.text, "html.parser")
  table = soup.find("table", {"class": "no_bottom_margin"})
  df = pd.read_html(str(table))[0]
  lifestage_group = None
  for row_i in range(len(df)):
    lifestage_group_str = df.iloc[row_i][
        'Life-Stage Group'] if 'Life-Stage Group' in df.iloc[
            row_i] else df.iloc[row_i]['Life Stage Group']
    lifestage_group_str = lifestage_group_str.split(
        "> ")[1] if "> " in lifestage_group_str else lifestage_group_str
    if lifestage_group_str[0].isdigit():
      values = [
          convert_to_digit(v) if isinstance(v, str) else v
          for v in df.iloc[row_i].tolist()[1:]
      ]
      lifestage_group_str = lifestage_group_str.replace("–", "-")
      if "mo" in lifestage_group_str:
        minAgeMonths = int(
            lifestage_group_str.replace(" mo", "").split("-")[0])
        maxAgeMonths = int(
            lifestage_group_str.replace(" mo", "").split("-")[1])
        minAgeYears = 0
        maxAgeYears = 0
      else:
        minAgeMonths = 0
        maxAgeMonths = 0
        minAgeYears = int(lifestage_group_str.replace(" y", "").split("-")[0])
        maxAgeYears = int(lifestage_group_str.replace(
            " y", "").split("-")[1]) if "-" in lifestage_group_str else None
      profile = Profile(lifestage_group, minAgeMonths, maxAgeMonths,
                        minAgeYears, maxAgeYears)
      updated = False
      for existing_profile in profiles_results.keys():
        # print(existing_profile, profile)
        if Profile.is_same(existing_profile, profile):
          profiles_results[existing_profile].update(
              {k: v
               for k, v in zip(df.columns[1:], values)})
          updated = True
          break
      if not updated:
        profiles_results[profile] = {
            k: v
            for k, v in zip(df.columns[1:], values)
        }
    else:
      lifestage_group = LifeStageGroup.from_string(lifestage_group_str)

to_write = []
for profile, rdis in profiles_results.items():
  to_write.append({"profile": profile.to_json(), "RDIs": rdis})

with open("intake_config.json", "w") as f:
  f.write(json.dumps(to_write, indent=2))
