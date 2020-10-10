import pandas as pd
from sqlalchemy import create_engine
from config import cxnstring

## i have to change "actors_csv" and "actors" as well as "my_db.sqlite"
pd.read_csv("actors_csv").to_sql(name="actors", con=create_engine(cxnstring)) #create_engine("sqlite:///my_db.sqlite"))

## having trouble running init_db, says actors_csv doesn't exist,
## i know i need to change it but idk what to