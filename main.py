from flask import Flask, redirect, render_template, request, session, url_for

app = Flask(__name__)

#@app.route("/login", methods=["GET", "POST"])
#def login():
#    if request.method == "POST":
#        email = request.form.get("email")
#        password = request.form.get("password")

#        if email in UserData and UserData[email][1] == password:
#            session["email"] = email
#            return redirect(url_for("profile"))
#    return render_template("login.html")

@app.route("/")
def login():
    return render_template("./login.html", route="/")

@app.route("/index")
def index():
    return render_template("./index.html", route="/index")

@app.route("/sign_up")
def sign_up():
    return render_template("./sign_up.html", route="/sign_up")

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
    app.run(host='0.0.0.0', port=8080, debug=True)
