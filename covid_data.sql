DROP TABLE covid_data;

CREATE TABLE covid_data(
	Week_Data_Collected DATE,
	State TEXT,
	Zip INT,
	Hospital_Name TEXT,
	City TEXT,
	Total_Beds_Available FLOAT,
	Total_Covid_Patients FLOAT,
	Total_Beds_in_Use FLOAT,
	Percent_Covid_Patients FLOAT,
	Percent_Capacity_Full FLOAT,
	Latitude FLOAT,
	Longitude FLOAT
);


SELECT * FROM covid_data;
