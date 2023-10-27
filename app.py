from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///./sports.db'  # Using SQLite for simplicity
db = SQLAlchemy(app)

class SportsData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    player_name = db.Column(db.String(80), nullable=False)
    score = db.Column(db.Integer, nullable=False)
    game_date = db.Column(db.Date, nullable=False)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload_data', methods=['POST'])
def upload_data():
    data = request.json
    new_entry = SportsData(player_name=data['player_name'], score=data['score'], game_date=data['game_date'])
    db.session.add(new_entry)
    db.session.commit()
    return jsonify(success=True)

@app.route('/get_data', methods=['GET'])
def get_data():
    all_data = SportsData.query.all()
    return jsonify([{ 'player_name': data.player_name, 'score': data.score, 'game_date': str(data.game_date) } for data in all_data])

if __name__ == '__main__':
    db.create_all()  # Create tables based on the models
    app.run(debug=True)
