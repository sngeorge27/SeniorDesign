import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from loguru import logger
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager

from sabrosa_backend import logic_engine
from sabrosa_backend.logic_engine import search_index, master_food_nutrient_amounts, food_df, nutrient_definitions, get_intake_profile

app = Flask(__name__)
CORS(app)


@app.route('/')
def status():
  return jsonify({"success": True})


# Change to integrate with database
# For now is hard coded for username = test, password = test
@app.route('/api/token', methods=["POST"])
def create_token():
  email = request.json.get("email", None)
  password = request.json.get("password", None)
  print(email, password)
  if email != "test" or password != "test":
    return {"msg": "Wrong email or password"}, 401

  access_token = create_access_token(identity=email)
  print(access_token)
  response = {"access_token": access_token}
  return response


@app.route("/api/logout", methods=["POST"])
def logout():
  response = jsonify({"msg": "logout successful"})
  unset_jwt_cookies(response)
  return response


@app.route('/api/signup', methods=["POST"])
def create_user():
  firstName = request.json.get("firstName", None)
  lastName = request.json.get("lastName", None)
  age = request.json.get("age", None)
  sex = request.json.get("sex", None)
  email = request.json.get("email", None)
  password = request.json.get("password", None)

  logger.info('%s logged in successfully', firstName)

  access_token = create_access_token(identity=email)
  response = {"access_token": access_token}
  return response


@app.route('/api/user')
def get_user():
  response_body = {
      "firstName": "Test",
      "lastName": "Last",
      "age": 23,
      "sex": "male",
      "email": "test@email.com",
  }

  return response_body


@app.route('/api/profile')
def my_profile():
  age = request.json.get("age", None)
  sex = request.json.get("sex", None)
  response_body = logic_engine.get_intake_profile(age, sex)

  return response_body


@app.route("/api/goals", methods=["POST"])
def goals():
  age = request.json.get("age", 25)
  sex = request.json.get("sex", "M")
  isPregnant = request.json.get("isPregnant", None)
  isLactating = request.json.get("isLactating", None)
  macroRatio = request.json.get("macroRatio", None)
  heightInches = request.json.get("heightInches", None)
  weightPounds = request.json.get("weightPounds", None)

  targets, upper_limits = logic_engine.get_intake_profile(
      age, sex, isLactating, isPregnant, macroRatio, heightInches,
      weightPounds)

  lines = []
  for i, n_def in enumerate(nutrient_definitions):
    if not (targets[i] is None and upper_limits[i] is None):
      lines.append({
          **n_def,
          "RDI":
          targets[i] if targets[i] is not None else -1,
          "UL":
          upper_limits[i] if upper_limits[i] is not None else -1,
      })

  logger.info(lines)
  return jsonify(lines)


# EXTENDED API
@app.route("/api/search", methods=["POST"])
def search():
  results = logic_engine.search(request.json['query'],
                                request.json.get('vegetarian', False),
                                num_results=6)
  return jsonify(results)


@app.route("/api/recommend", methods=["POST"])
def recommend():
  age = request.json.get("age", 25)
  sex = request.json.get("sex", "M")
  isPregnant = request.json.get("isPregnant", None)
  isLactating = request.json.get("isLactating", None)
  macroRatio = request.json.get("macroRatio", None)
  heightInches = request.json.get("heightInches", None)
  weightPounds = request.json.get("weightPounds", None)
  foodLog = request.json.get("foodLog", [])
  targets, upper_limits = logic_engine.get_intake_profile(
      age, sex, isLactating, isPregnant, macroRatio, heightInches,
      weightPounds)
  meal_nutrient_amounts = logic_engine.get_food_log_nutrient_amounts(foodLog)
  top_foods = logic_engine.recommend(meal_nutrient_amounts, targets,
                                     upper_limits)
  return jsonify(top_foods)


@app.route("/api/get_food", methods=["POST"])
def get_food_nutrients():
  # get nutrients for food, according to n_def schema
  food_index = [
      i for i, fdc_id in enumerate(food_df['fdc_id'].tolist())
      if fdc_id == request.json['fdc_id']
  ][0]
  nutrient_amounts = master_food_nutrient_amounts[food_index]
  nutrients = []
  for i, n_def in enumerate(nutrient_definitions):
    nutrients.append({**n_def, 'amount': nutrient_amounts[i]})
  return jsonify(nutrients)


@app.route("/api/add_food")
def add_food():
  pass


if __name__ == "__main__":
  print("Hello world")
  app.run(port=5005)
