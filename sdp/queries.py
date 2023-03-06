from sdp.database import Session, Food, Nutrient

this_food = Session.query(Food).filter(Food.name.ilike('%hummus%')).first()
this_food_nutrients = Session.query(Nutrient).filter_by(fdc_id=this_food.fdc_id).all()

print(this_food)
for nutrient in this_food_nutrients:
  print(nutrient)
