from flask import Flask, render_template, request, jsonify, Blueprint, redirect, url_for, flash
from flask_login import current_user

game = Blueprint('game', __name__)

@game.route('/game_only', methods=["GET", "POST"])
def game_only():
    return render_template('game-only.html')