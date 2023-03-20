import json
from flask import Flask, request, jsonify
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager

app = Flask(__name__)

app.config["JWT_SECRET_KEY"] = "please-remember-to-change-me"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(app)

@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token 
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response

# Change to integrate with database
# For now is hard coded for username = test, password = test
@app.route('/api/token', methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email != "test" or password != "test":
        return {"msg": "Wrong email or password"}, 401

    access_token = create_access_token(identity=email)
    response = {"access_token":access_token}
    return response

@app.route("/api/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

@app.route('/api/profile')
@jwt_required()
def my_profile():
    response_body = {
        "name": "Test name",
        "about" :"Test about"
    }

    return response_body

@app.route("/api/goals", methods=["GET"])
def goals():
    return {"test": 1234}

# @app.route("/progress")
# def progress():
#     return render_template("./progress.html", route="/progress")

# @app.route("/track")
# def track():
#     return render_template("./track.html", route="/track")

# @app.route("/profile")
# def profile():
#     return render_template("./profile.html", route="/profile")

# @app.route("/settings")
# def settings():
#     return render_template("./settings.html", route="/settings")

if __name__ == "__main__":
    app.run()
