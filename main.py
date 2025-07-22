from flask import Flask, render_template, jsonify, request, send_from_directory
import os, random, csv

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/landing')
def landing():
    return render_template('landing.html')

@app.route('/labelview1')
def labelview1():
    return render_template('labelview1.html')

@app.route('/workspace')
def workspace():
    return render_template('workspace.html')

if __name__ == "__main__":
    app.run(debug=True)