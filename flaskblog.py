from flask import Flask, render_template
from flask import jsonify
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

@app.route("/about")
def about():
    return "<h1>About Us</h1>"

#    name = request.args.get("name", "World")
#    return f'Hello, {escape(name)}!'
    
if __name__ == '__main__':
    app.run(debug=True)
    