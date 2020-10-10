from flask import Flask, render_template
import pandas as pd
from sqlalchemy import create_engine
from config import cxnstring

app = Flask(__name__)

engine = create_engine(cxnstring, pool_recycle=3600)

@app.route("/")
def index():
    return render_template("index.html")

app.route("/sqltest")
def psqltest():
    response = pd.read_sql("SELECT * FROM actors LIMIT 10", engine)
    return Response(response.to_json(orient="records",date_format="iso"), mimetype="application/json")

#endpoints! , if you have multiple pages or
#if you're reading from database that will
# run python function from database
#@app.route("/endpoint")


if __name__ == "__main__":
    app.run()