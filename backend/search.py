from flask import Flask, render_template
import os

template_dir = os.path.abspath("../frontend/static")
app = Flask(__name__, template_folder=template_dir, static_folder=template_dir)

@app.route('/')
@app.route('/search')
def search_page():
    return render_template("search.html")

@app.route('/data')
def search_data_page():
    return render_template("data.html")

app.run()