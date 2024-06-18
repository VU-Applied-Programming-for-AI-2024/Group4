from flask import Flask
from auth import auth as auth_blueprint
from auth import login_manager
from db import db, db_path
from general import general as general_blueprint
from search import search as search_blueprint

app = Flask(__name__)
app.config["SECRET_KEY"] = '4ae628294ab30b9ef4d89841bc9c8bec23572095ee35e12eaefa2160276aace4'
app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{db_path}"
db.init_app(app)
login_manager.init_app(app)

app.register_blueprint(auth_blueprint)
app.register_blueprint(general_blueprint)
app.register_blueprint(search_blueprint)

with app.app_context():
    db.create_all()


# @app.route('/register', methods =["GET", "POST"])
# def register():
#    if request.method == "POST":
#        # getting input with name = username in HTML (registration)form
#        username = request.form.get("username")
#        # getting input with name = mail in HTML (registration)form 
#        email = request.form.get("mail") 
#        print(username, email)
#        return render_template('registrationSucceeded.html')
#    return render_template('registerpage.html')

if __name__ == "__main__":
    app.run(debug=True)