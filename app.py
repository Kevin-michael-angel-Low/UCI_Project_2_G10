import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from sqlalchemy import MetaData

from flask import Flask, jsonify, render_template



#################################################
# Database Setup
#################################################
rds_connection_string = "Platinum9823#:postgres#@localhost:5432/project2_db"
engine = create_engine(f'postgresql://{rds_connection_string}')


m = MetaData()
m.reflect(engine)
for table in m.tables.values():
    print(table.name)
    for column in table.c:
        print(column.name)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
covid_data = Base.classes.covid_data

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/json_simple<br/>"
        f"/json_sorted<br/>"
        f"/json_date<br/>"

    )

# Hospital name, week, lat, long
@app.route("/hospital_name")
def names():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all passenger names"""
    # Query all passengers
    results = session.query(covid_data.hospital_name).all()

    session.close()

    # Convert list of tuples into normal list
    all_names = list(np.ravel(results))

    return jsonify(all_names)

# city, Hospital name, week, lat, long, percent covid patients, percent capacity full, 
@app.route("/json_simple")
def json_simple():
    session = Session(engine)

    results = session.query(covid_data.city, covid_data.hospital_name, covid_data.latitude,
    covid_data.longitude, covid_data.week_data_collected, covid_data.percent_covid_patients,
    covid_data.percent_capacity_full).all()

    session.close()

    all_data = []
    for city, hospital_name, longitude, latitude, week_data_collected, percent_covid_patients, percent_capacity_full in results:
        data_dict = {}
        data_dict['city'] = city
        data_dict['hospital'] = hospital_name
        data_dict['latitude'] = latitude
        data_dict['longitude'] = latitude
        data_dict['date'] = week_data_collected
        data_dict['percent_covid_patients'] = percent_covid_patients
        data_dict['percent_capacity_full'] = percent_capacity_full
        all_data.append(data_dict)
    
    return jsonify(all_data)
    with open('json_simple.json', 'w') as f:
        json.dump(request.form, f)

# Sorted json
@app.route("/json_sorted")
def json_sorted():
    session = Session(engine)

    results = session.query(covid_data.city, covid_data.hospital_name, covid_data.latitude,
    covid_data.longitude, covid_data.week_data_collected, covid_data.percent_covid_patients,
    covid_data.percent_capacity_full).all()

    session.close()

    all_data = []
    for city, hospital_name, longitude, latitude, week_data_collected, percent_covid_patients, percent_capacity_full in results:
        data_dict = {}
        data_dict['city'] = city
        data_dict['hospital'] = hospital_name
        data_dict['location'] = longitude, latitude
        data_dict['covid_date_and_percent'] = week_data_collected, percent_covid_patients, percent_capacity_full
        all_data.append(data_dict)
    
    return jsonify(all_data)

@app.route("/json_date")
def json_date():
    session = Session(engine)

    results = session.query(covid_data.week_data_collected).all()

    session.close()

    all_data = []
    for week_data_collected in results:
        data_dict = {}
        data_dict['date'] = week_data_collected
        all_data.append(data_dict)
    
    return jsonify(all_data)

# @app.route("/api/v1.0/passengers")
# def passengers():
#     # Create our session (link) from Python to the DB
#     session = Session(engine)

#     """Return a list of passenger data including the name, age, and sex of each passenger"""
#     # Query all passengers
#     results = session.query(Passenger.name, Passenger.age, Passenger.sex).all()

#     session.close()

#     # Create a dictionary from the row data and append to a list of all_passengers
#     all_passengers = []
#     for name, age, sex in results:
#         passenger_dict = {}
#         passenger_dict["name"] = name
#         passenger_dict["age"] = age
#         passenger_dict["sex"] = sex
#         all_passengers.append(passenger_dict)

#     return jsonify(all_passengers)

@app.route("/covid_site")
def home_page():
    return render_template('index.html', embed='string name!')


if __name__ == '__main__':
    app.run(debug=True)