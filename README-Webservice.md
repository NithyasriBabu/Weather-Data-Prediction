# Weather Webservice

This web application Predicts weather based on a 'daily.csv' file provided. <br/>
It contains TMAX and TMIN data for dates from 01-01-2013 to 02-15-2018. 

The webpage takes an input date from the user. 
It displays the weather information from the 'daily.csv' file for the input date. (using route /historical/\<ddmmyyyy\>) <br/>
It predicts the weather for the next 5 days and displays that in the form of a table and a plotted graph. (using route /forecast/\<ddmmyyyy\>) <br/>

More information about the  full service of the API can be found in the REST.md file.

It also takes an 'Zipcode' Input to access the weather information real time using a thiry-party website. <br/>
It uses OpenWeatherMap API to get weather information for the current date and following 5 days and displays it in table and a graph.<br/>
