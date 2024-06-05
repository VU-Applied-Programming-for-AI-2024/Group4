#
# Flask tryout code - doesn't work
#


# importing Flask and other modules
from flask import Flask, request, render_template 
 
print("i'm working")
# Flask constructor
app = Flask(__name__)   
 
# A decorator used to tell the application
# which URL is associated function
@app.route('/', methods =["GET", "POST"])
def gfg():
    print('gfg activated')
    if request.method == "POST":
       # getting input with name = username in HTML (registration)form
       username = request.form.get("username")
       # getting input with name = mail in HTML (registration)form 
       email = request.form.get("mail") 
       print(username, email)
       return "Your username and email are "+username + email
    return render_template("registerpage.html")
 
if __name__=='__main__':
   app.run()