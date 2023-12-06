from flask import Flask, render_template, request, jsonify
import pandas as pd
import pickle

app = Flask(__name__)

# Load the trained model
with open('trained_model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit():
    # Step 1: Receive data from the frontend
    data = request.json

    # Step 2: Format the received data for the model
    # Ensure that the DataFrame structure here matches how the model was trained
    features = pd.DataFrame([data['variables']])

    # Step 3: Use the model to predict the credit score
    predicted_score = model.predict(features)

    # Step 4: Return the predicted score to the frontend
    return jsonify({'credit_score': predicted_score[0]})

@app.route('/result')
def result():
    score = request.args.get('score', 'Not Calculated')
    return f'''
    <!DOCTYPE html>
    <html>
    <head>
        <title>Credit Score Result</title>
        <style>
            body {{
                background-color: black;
                color: red;
                margin: 0;
                height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                font-size: 24px;
            }}
        </style>
    </head>
    <body>
        <div>
            <h1>Your Credit Score is: {score}</h1>
        </div>
    </body>
    </html>
    '''

    
if __name__ == '__main__':
    app.run(debug=True)


