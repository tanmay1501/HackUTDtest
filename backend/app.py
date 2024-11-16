from flask import Flask, request, jsonify
from flask_restful import Api, Resource
from flask_cors import CORS


# from flask_graphql import GraphQLView
# from graphene import ObjectType, String, Field, Schema

import pandas as pd

app = Flask(__name__)
CORS(app)
api = Api(app)

# Load data from CSV
weather_data = pd.read_csv('weather_data.csv')  # Replace 'weather.csv' with your file path

# Utility function
def get_weather(date, time):
    
    weather_data['date']= pd.to_datetime(weather_data['date']).dt.strftime('%m/%d/%Y')

    result = weather_data[(weather_data['date'] == date) & (weather_data['time'] == time)]
    result = result.drop(columns=['date', 'time'])
    return result.to_dict(orient='records') if not result.empty else None

# # REST API Resource
class WeatherREST(Resource):
    def get(self):
        date = request.args.get('date')
        time = request.args.get('time')

        #convert the date format to match the csv file
        date = date.replace('-', '/')
      
        date = date[5:] + '/'+ date[:4]

        if not date or not time:
            return {"error": "Please provide both 'date' and 'time'"}, 400
        weather = get_weather(date, time)
        print(weather)
        if weather:
            return {"weather": weather}, 200
        else:
            return {"error": "Data not found"}, 404

api.add_resource(WeatherREST, '/api/weather')



if __name__ == '__main__':
    app.run(debug=True)






# GraphQL Schema
# class WeatherQuery(ObjectType):
#     weather = Field(String, date=String(), time=String())

#     def resolve_weather(self, info, date, time):
#         weather = get_weather(date, time)
#         return str(weather) if weather else "Data not found"

# schema = Schema(query=WeatherQuery)

# app.add_url_rule(
#     '/graphql',
#     view_func=GraphQLView.as_view(
#         'graphql', schema=schema, graphiql=True  # Enable GraphiQL interface
#     )
# )