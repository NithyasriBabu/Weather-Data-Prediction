# REST API Markdown File

**1.URL /historical/**
------
* **Request Methods Accepted:**
  'GET' | 'POST'

*  **Parameters:**
   No Parameters

*  **GET Method:**
   Lists all dates which is has weather information available.<br/>

   * **Success Response:**<br/>
    **Code:** 200 <br/>
    **Sample Output:** <br/>
    '[{ "DATE" : "20130101"},<br/>
      { "DATE" : "20130102"}......<br/>
      { "DATE" : "20180215"}]'
 
   * **Error Response:**
    NONE
 
*  **POST Method:**
   Sent with an JSON format input for new weather information for a date <br/>

   * **Success Response:**<br/>
     **Code:** 201 <br/>
     **Sample Input:**<br/>
       '{"DATE" : "20160216", "TMAX": 34.0 , "TMIN": 9.0}' <br/>
       
     **Sample Output:**<br/>
       '{ "DATE" : "20180216"}' <br/>
       
   * **Error Response:**
     NONE

**2.URL /historical/dateYYYYMMDD**
------
* **Request Methods Accepted:**
  'GET' | 'DELETE'

*  **Parameters:**<br/>
   **dateYYYYMMDD**: Contains the date in YYYYMMDD format.

*  **GET Method:**
   Lists weather information available for the date requested as the parameter.<br/>

   * **Success Response:**<br/>
     **Code:** 200 <br />
     **Sample URL:** <br/>
     ../historical/20130101<br/>
     **Sample Output:** <br/>
      '{ "DATE" : "20130101", "TMAX": 34.0, "TMIN": 26.0}'
 
   * **Error Response:** <br/>
     **Code:** 404 <br />
     This code is sent as response if the requested date's weather information is not avaialble.
 
*  **DELETE Method:**
   Deletes available weather information for a given date.

   * **Success Response:**
     **Code:** 200 <br />
     **Sample URL:**<br/>
       ../historical/20130101
     **Sample Output:**<br/>
     '{ "DATE" : "20130101"}'<br/>
     (This date information is deleted and is not available anymore.) <br/>
       
   * **Error Response:**
     **Code:** 404 <br/>
     This error code is the response if the delete request sent for the given is not available.<br/>

**3.URL /forecast/dateYYYYMMDD**
------
* **Request Methods Accepted:**
  'GET'

*  **Parameters:**<br/>
   **dateYYYYMMDD**: Contains the date in YYYYMMDD format.

*  **GET Method:**
   Forecast weather information for current date and the next 6 days.<br/>
   Calculates Temperatures by taking average temperatures of the same date's weather information available for the previous years.

   * **Success Response:**<br/>
     **Code:** 200 <br />
     **Sample URL:** <br/>
     ../forecast/20130101<br/>
     **Sample Output:** <br/>
     '[{ "DATE": "20130101", "TMAX": 40.7, "TMIN": 24.3 }, <br/>
     { "DATE": "20130102", "TMAX": 40.4, "TMIN": 23.6 }, <br/>
     { "DATE": "20130103", "TMAX": 41.5, "TMIN": 23.2 }, <br/>
     { "DATE": "20130104", "TMAX": 42.5, "TMIN": 19.0 }, <br/>
     { "DATE": "20130105", "TMAX": 32.7, "TMIN": 17.0 }, <br/>
     { "DATE": "20130106", "TMAX": 29.8, "TMIN": 11.7 }, <br/>
     { "DATE": "20130107", "TMAX": 26.4,  "TMIN": 7.1 }]'<br/>
 
   * **Error Response:** <br/>
     NONE
