from flask import *
from flask import jsonify
from model_draft import main
app = Flask(__name__)

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
     'name':'Smriti',
     'dob':'28-03-1992',
     'register_date':'01-01-2019',
     'sex':'Female',
     'pps':'12345',
     'parent':'Pradeep'
    }
        
]

@app.route("/")
@app.route("/home")
def hello():
    return jsonify(posts)

@app.route("/upload", methods = ['POST'])
def register():
    if request.method == 'POST': 
        f = request.files['file']  
        f.save(f.filename)  
        return f.filename
#    score = main(image_path)
#    return score

#    name = request.args.get("name", "World")
#    return f'Hello, {escape(name)}!'
    
if __name__ == '__main__':
    app.run(debug=True)
    