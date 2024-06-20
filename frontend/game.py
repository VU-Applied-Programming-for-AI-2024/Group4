from flask import Flask, render_template, request, jsonify, Blueprint, redirect, url_for, flash, session
from flask_login import current_user

game = Blueprint('game', __name__)

# @game.route('/game_only', methods=['GET', 'POST'])
# def game_only():
#    print('here')
#    return render_template('game-only.html')

@game.route('/game_only', methods=['GET', 'POST'])
def game_only():
   if request.method == 'GET':
      furnitures = [session['floor'], 
                   session['view'],
                   session['theme'],
                   session['misc']]
      print(furnitures)
      if all(furniture is not None for furniture in furnitures):
         type_view = "Bar" if furnitures[1].startswith('Bar') else "Coffee"
         type_theme = "Bar" if furnitures[2].startswith('Bar') else "Coffee"
         session['light'] = type_view + type_theme + '.png'
         # return render_template('game-only.html', floor=furnitures[0], view=furnitures[1], theme=furnitures[2], misc=furnitures[3], light=session['light'])
         return render_template('game-only.html')
      else:
         flash("Access denied: pick all furniture and login")
         return redirect(url_for('general.search'))