from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("./index.html", route="/")

@app.route("/goals")
def goals():
    return render_template("./goals.html", route="/goals")

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
