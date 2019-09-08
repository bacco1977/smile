#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Sep  5 12:15:46 2019

@author: smrverma
"""

import os
from flask import *
from flask import jsonify
from model_draft import main
from flask_cors import CORS, cross_origin
from end_to_end_draft11 import score
from database import DB
from jobs import Patient 

"""
Please update UPLOAD_FOLDER location with your local file system
"""
UPLOAD_FOLDER = './uploaded_images' 

app = Flask(__name__)
DB.init()
app.secret_key = "secret key"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

cors = CORS(app, supports_credentials=True, resources={r"/api/*": {"origins": "*"}})

@app.route("/")
@app.route("/home", methods=['GET','POST'])
@cross_origin()
def hello():
    cursor = DB.find_all(collection='patient')
    for document in cursor:
        print(document)
        x = str(document)
        print(str(document))
        print(jsonify(str(document)))
        return jsonify(document)

@app.route("/api/list", methods=['GET'])
@cross_origin()
def api_list():
    patientList = []
    cursor = DB.find_all(collection='patient')
    for document in cursor:
        new_patient = Patient(name=document[u'name'],email=document[u'email'],dob=document[u'dob'],register_date=document[u'register_date'], gender=document[u'gender'],patientId=document[u'patientId'],guardian=document[u'guardian'],latest_score=document[u'latest_score'])
        patientList.append(new_patient.json())
    return jsonify(patientList)


@app.route('/api/success', methods = ['POST'])
@cross_origin()
def success():
    if request.method == 'POST':
        print("this is okay: "+(request.form['username']))
        f = request.files['image']  
        f.save(os.path.join(app.config['UPLOAD_FOLDER'], f.filename))
        resp = make_response(json.dumps("Success"))
        resp.status_code = 201
        image = './uploaded_images/'+f.filename
        print ("image: " + image)
        scorevalue = (1-score(image))*100
        add_record(request.form['username'],request.form['email'],request.form['dob'],request.form['registration'],request.form['gender'],request.form['patientId'],request.form['guardian'],scorevalue)
        return str(scorevalue)
    return ''


def add_record(username, email, dob, registration, gender, patientId, guardian, latest_score):
    """Adds patients to the database."""
    new_patient = Patient(name=username,email=email,dob=dob,register_date=registration, gender=gender,patientId=patientId,guardian=guardian, latest_score=latest_score)
    new_patient.insert()                                                                                                                                                         
    return ('', 204)
    
if __name__ == '__main__':
    app.run(debug=True)
    