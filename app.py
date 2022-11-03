from flask import Flask, render_template, url_for, request,jsonify
import random
app = Flask(__name__)

#load the model
data = ["Prasamsa Paudel", "Gaming", "meet you", "one"]

@app.route('/',methods=['GET'])
def home_page():
    return render_template('index.html')

@app.route('/',methods=['POST'])
def predict():
    if request.method == 'POST':
        text = request.form.getlist("text_area")
        sentence = random.choice(data)
        print (text[0]+sentence)
        output=text[0]+sentence

    return render_template('index.html',output=output)
