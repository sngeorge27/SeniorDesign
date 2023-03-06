import os
import json

from sqlalchemy import create_engine, Table, Column, Integer, String, Float, MetaData
from sqlalchemy.schema import CreateTable
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy.orm.collections import attribute_mapped_collection

from sdp.util import project_path

engine = create_engine(
    f"postgresql+psycopg2://{os.environ['DATABASE_USER']}:{os.environ['DATABASE_PASSWORD']}@{os.environ['DATABASE_IP']}:5432/{os.environ['DATABASE_NAME']}"
)

meta = MetaData()

Base = declarative_base()

nutrient_definitions = json.load(
    open(os.path.join(project_path, "nutrient_definitions.json")))


class Food(Base):
  __tablename__ = "food"
  id = Column(Integer, primary_key=True)
  fdc_id = Column(Integer)
  name = Column(String)
  origin_dataset = Column(String)

  def __init__(self, fdc_id, name, origin_dataset):
    self.fdc_id = fdc_id
    self.name = name
    self.origin_dataset = origin_dataset

  def __repr__(self):
    return f"({self.name.ljust(24)} {self.fdc_id})"

  def __str__(self):
    return self.__repr__()


class Nutrient(Base):
  __tablename__ = "nutrient"
  id = Column(Integer, primary_key=True)
  fdc_id = Column(Integer)
  nutrient_id = Column(Integer)
  amount_per_100g = Column(Float)

  def __init__(self, fdc_id, nutrient_id, amount_per_100g):
    self.fdc_id = fdc_id
    self.nutrient_id = nutrient_id
    self.amount_per_100g = amount_per_100g

  def __repr__(self):
    definition = [
        d for d in nutrient_definitions if d["id"] == self.nutrient_id
    ][0]
    return f"({definition['name'].ljust(32)} {str(self.amount_per_100g).ljust(8)} {definition['unitName'].ljust(2)})"

  def __str__(self):
    return self.__repr__()


Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)()
