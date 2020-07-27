from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
import json
import subprocess
import socket

def log_command(args):
    print(' '.join(args))

app = Flask(__name__, template_folder='client')
CORS(app)

@app.route('/api/getplayers', methods=['GET'])
def getplayers():
	args = ['playerctl', '-l']
	players = str(subprocess.check_output(args), 'utf-8').split('\n')[:-1]
	log_command(args)
	return jsonify(players)

@app.route('/api/getvolume', methods=['GET'])
def getvolume():
	args = ['pulseaudio-ctl', 'full-status']
	volume = str(subprocess.check_output(args), 'utf-8').split(' ')[0]
	log_command(args)
	return jsonify(volume)

@app.route('/api/playpause', methods=['POST'])
def playpause():
	data = json.loads(str(request.data, 'utf-8'))
	args = ['playerctl', '-p', data['player'], 'play-pause']
	subprocess.call(args)
	log_command(args)
	return ('', 204)

@app.route('/api/rewind', methods=['POST'])
def rewind():
	data = json.loads(str(request.data, 'utf-8'))
	args = ['playerctl', '-p', data['player'], 'position', '5-']
	subprocess.call(args)
	log_command(args)
	return('', 204)

@app.route('/api/fastforward', methods=['POST'])
def fastforward():
	data = json.loads(str(request.data, 'utf-8'))
	args = ['playerctl', '-p', data['player'], 'position', '5+']
	subprocess.call(args)
	log_command(args)
	return('', 204)

@app.route('/api/setvolume', methods=['POST'])
def setvolume():
	data = json.loads(str(request.data, 'utf-8'))
	args = ['playerctl', '-p', data['player'], 'volume', data['volume']]
	subprocess.call(args)
	log_command(args)
	return('', 204)
