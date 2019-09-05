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
from end_to_end_draft9 import score
from database import DB
from jobs import Patient 


"""
Please update UPLOAD_FOLDER location with your local file system
"""
UPLOAD_FOLDER = './uploaded_images' 

app = Flask(__name__)
app.secret_key = "secret key"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

cors = CORS(app, supports_credentials=True, resources={r"/api/*": {"origins": "*"}})

posts = [
    {
     'name':'Smriti',
     'dob':'28-03-1992',
     'register_date':'01-01-2019',
     'sex':'Female',
     'pps':'12345',
     'parent':'Pradeep'
    },
     {
     'name':'Bob',
     'dob':'28-03-1992',
     'register_date':'01-01-2019',
     'sex':'Male',
     'pps':'2121212',
     'parent':'Pradeep'
    },
    {
     'name':'Phoebe',
     'dob':'28-03-1992',
     'register_date':'01-01-2019',
     'sex':'Female',
     'pps':'194321094812',
     'parent':'Pradeep'
    },
     {
     'name':'Fellyph',
     'dob':'28-03-1992',
     'register_date':'01-01-2019',
     'sex':'Male',
     'pps':'4392480',
     'parent':'Pradeep'
    },
    {
     'name':'Andrew',
     'dob':'28-03-1992',
     'register_date':'01-01-2019',
     'sex':'Male',
     'pps':'078932',
     'parent':'Pradeep'
    },
     {
     'name':'Priya',
     'dob':'28-03-1992',
     'register_date':'01-01-2019',
     'sex':'Female',
     'pps':'6473920',
     'parent':'Pradeep'
    }
        
]

@app.route("/")
@app.route("/home", methods=['GET','POST'])
@cross_origin()
def hello():
    return jsonify(posts)

@app.route("/api/list", methods=['GET'])
@cross_origin()
def api_list():
    return jsonify(posts)
#
#@app.route('/image')  
#def image():  
#    return render_template("file_upload_form.html")  


@app.route('/api/success', methods = ['POST'])
@cross_origin()
def success():
    if request.method == 'POST':
        print(request.files)
        f = request.files['image']  
        f.save(os.path.join(app.config['UPLOAD_FOLDER'], f.filename))
        resp = make_response(json.dumps("Success"))
        resp.status_code = 201
        image = './uploaded_images/'+f.filename
        print ("image: " + image)
        scorevalue = 1-score(image)
        print ("scorevalue: " + str(scorevalue))
        print ("score: "+str(scorevalue*100))
        return str(scorevalue*100)
    return ''
#    score = main(image_path)
#    return score

    
@app.route('/add_record')
def add_record():
    """Adds patients to the database."""
    new_patient = Patient(name='Smriti',dob='28-03-1992',register_date='01-01-2019', gender='Female',pps='12345',guardian='Pradeep')
    new_patient.insert()                                                                                                                                                         
    return ('', 204)
    
if __name__ == '__main__':
    app.run(debug=True)
    