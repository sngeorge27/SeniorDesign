import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager

app = Flask(__name__)

app.config["JWT_SECRET_KEY"] = "please-remember-to-change-me"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=24)
jwt = JWTManager(app)
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

  app.logger.info('%s logged in successfully', firstName)

  access_token = create_access_token(identity=email)
  response = {"access_token": access_token}
  return response


@app.route('/api/user')
@jwt_required()
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
@jwt_required()
def my_profile():
  response_body = {"name": "Test name", "about": "Test about"}

  return response_body


@app.route("/api/goals", methods=["POST"])
@jwt_required()
def goals():
  age = request.json.get("age", None)
  sex = request.json.get("sex", None)

  test_res = {"age": age, "sex": sex}

  return test_res


if __name__ == "__main__":
  app.run(debug=True, port=5000)
