# Basic details of the project

Cloud VM Provider - AWS EC2 - Amazon Linux AMI <br/>
Tools Used - Python Flask, JSON, AJAX, JQuery, HTML, Plotly.js<br/>

NBWeather.py:
----------
This file contains the backend server operations. This Python Flask file which also hosts the webpage datesWeather.htm in route('/'). <br/>
Input File: daily.csv. <br/>
This file contains the weather information provided to the flask server. Also used to forecast information.

datesWeather.htm:
-----------------
This file defines all the elements of the HTML Webpage. The JS and CSS file are included from the head of this file.

exstyle.css
-----------
This is an external CSS stylesheet used in the datesWeather.htm.

listDates.js
------------
This Javascript file contains the jQueries used to manipulate the HTML DOM in datesWeather.htm. <br/>
It also contains the AJAX calls to the various routes in the flask server. <br/>
All responses are in JSON format and handled using jQueries.
