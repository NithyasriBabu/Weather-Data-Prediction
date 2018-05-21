from flask import Flask
from flask import request
from flask import render_template
from flask import jsonify
from flask import abort
import pandas as pd
import json

global data
data = pd.read_csv('daily.csv',dtype = {'DATE':str,'TMAX':float,'TMIN':float})

app = Flask(__name__)

@app.route('/')
def welcome():
    return render_template('datesWeather.htm')

@app.route('/historical',methods=['GET'])
def listDates():
    global data
    dates = list(data["DATE"])
    list1= []
    for date in dates:
        each = {"DATE": date}
        list1.append(each)
    return jsonify(list1)

@app.route('/historical/<dateYYYYMMDD>',methods=['GET'])
def particularDate(dateYYYYMMDD):
    global data
    given_date = dateYYYYMMDD
    all_dates = list(data["DATE"])
    if given_date in all_dates:
        index_date = all_dates.index(given_date)
        dic = {"DATE":data["DATE"][index_date],
               "TMAX":data["TMAX"][index_date],
               "TMIN":data["TMIN"][index_date]}
        return jsonify(dic)
    else:
        abort(404)
        
@app.route('/historical',methods=['POST'])
def addDate():
    global data
    json_input = json.loads(request.get_data())
    date = json_input.get("DATE")
    tmax = json_input.get("TMAX")
    tmin = json_input.get("TMIN")
    dic = {"DATE":date,"TMAX":tmax,"TMIN":tmin}
    postdate_new = pd.DataFrame(dic,index=[data.shape[0]])
    data = data.append(postdate_new)
    return jsonify({"DATE":dic["DATE"]}),201

@app.route('/historical/<dateYYYYMMDD>',methods=['DELETE'])
def deleteDate(dateYYYYMMDD):
    global data
    given_date = dateYYYYMMDD
    all_dates = list(data["DATE"])
    if given_date in all_dates:
        index_date = all_dates.index(given_date)
        data = data.drop(index_date)
        return jsonify({"DATE":given_date})
    else:
        abort(404)

@app.route('/forecast/<dateYYYYMMDD>',methods=['GET'])
def forcast7days(dateYYYYMMDD):
    global data
    given_date = dateYYYYMMDD
    all_dates = list(data["DATE"])
    list_year = [2013,2014,2015,2016,2017]
    y = given_date[:4]
    m = given_date[4:6]
    d = given_date[6:8]
    list1 = []
    for i in range(0,5):    
        tmax = 0
        tmin = 0
        for year in list_year:
            add_date = y+m+d
            new_date = str(year)+m+d
            index_date = all_dates.index(new_date) if new_date in all_dates else 0
            tmax = tmax + float(data["TMAX"][index_date])
            tmin = tmin + float(data["TMIN"][index_date])
        tmax = int(tmax/len(list_year))
        tmin = int(tmin/len(list_year))
        dic = {"DATE":add_date,"TMAX":tmax,"TMIN":tmin}
        list1.append(dic)
        if(int(d)<10):
            d = "0" + str(int(d)+1)
        else:
            d = str(int(d)+1)
        if(int(d)>30):
            d="01"
            if(int(m)<10):
                m = "0"+str(int(m)+1)
            else:
                m = str(int(m)+1)
    return jsonify(list1)
