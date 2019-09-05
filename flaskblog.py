from flask import Flask, render_template
app = Flask(__name__)

@app.route("/")
@app.route("/home")
def hello():
    return render_template('home.html')

@app.route("/about")
def about():
    return "<h1>About Us</h1>"

#    name = request.args.get("name", "World")
#    return f'Hello, {escape(name)}!'
    
if __name__ == '__main__':
    app.run(debug=True)
    