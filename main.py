from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
import json
import subprocess

app = Flask(__name__, template_folder='client')
CORS(app)

@app.route('/api/getplayers', methods=['GET'])
def getplayers():
	players = str(subprocess.check_output(['playerctl', '-l']), 'utf-8').split('\n')[:-1]
	return jsonify(players)

@app.route('/api/getvolume', methods=['GET'])
def getvolume():
	volume = str(subprocess.check_output(['pulseaudio-ctl', 'full-status']), 'utf-8').split(' ')[0]
	return jsonify(volume)

@app.route('/api/playpause', methods=['POST'])
def playpause():
	data = json.loads(str(request.data, 'utf-8'))
	subprocess.call(['playerctl', '-p', data['player'], 'play-pause'])
	print('testing')
	return ('', 204)

@app.route('/api/rewind', methods=['POST'])
def rewind():
	data = json.loads(str(request.data, 'utf-8'))
	subprocess.call(['playerctl', '-p', data['player'], 'position', '5-'])
	return('', 204)

@app.route('/api/fastforward', methods=['POST'])
def fastforward():
	data = json.loads(str(request.data, 'utf-8'))
	subprocess.call(['playerctl', '-p', data['player'], 'position', '5+'])
	return('', 204)

@app.route('/api/setvolume', methods=['POST'])
def setvolume():
	data = json.loads(str(request.data, 'utf-8'))
	subprocess.call(['pulseaudio-ctl', 'set', data['volume']])
	return('', 204)
