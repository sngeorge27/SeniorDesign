from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("./index.html", route="/", userName="Brandon")

@app.route("/api/goals", methods=["GET"])
def goals():
    return {"test": 1234}

@app.route("/progress")
def progress():
    return render_template("./progress.html", route="/progress")

@app.route("/track")
def track():
    return render_template("./track.html", route="/track")

@app.route("/profile")
def profile():
    return render_template("./profile.html", route="/profile")

@app.route("/settings")
def settings():
    return render_template("./settings.html", route="/settings")

if __name__ == "__main__":
    app.run()
