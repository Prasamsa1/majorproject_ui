from flask import Flask, render_template, url_for, request,jsonify,redirect
import random
app = Flask(__name__)

#load the model
data = ["Prasamsa Paudel"]

@app.route('/')
def home_page():
    return render_template('index.html')

@app.route('/',methods=['POST'])
def predict():
    if request.method == 'POST':
        text = request.form.getlist("text_area")
        sentence = random.choice(data)
        output=sentence
        print(output)
        # return str(sentence)

    return str(output)

if __name__ == '__main__':
    app.run(debug=True)