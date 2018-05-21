$(document).ready(function(){
    $('#sub').click(function(){
        var input_date = $('#date_picker').val();
        input_date_mod = input_date.slice(0,4)+input_date.slice(5,7)+input_date.slice(8)
        $.ajax({
            url: '/historical/'+input_date_mod,
            type: 'GET',
            dataType: 'json',
            success: function(data){
                $('#showinfo').show();
                $('#date_label').html('<strong> DATE: </strong>'+data.DATE);
                $('#TMAX_label').html('<strong> TMAX: </strong>'+data.TMAX);
                $('#TMIN_label').html('<strong> TMIN: </strong>'+data.TMIN);
                $.ajax({
                    url: '/forecast/'+input_date_mod,
                    type: 'GET',
                    dataType: 'json',
                    success: function(data){
                        var forecast_data = "<tr>+<th>DATE</th><th>TMAX</th><th>TMIN</th></tr>";
                        var TMAX= [];
                        var TMIN = [];
                        $.each(data, function(i, date){
                            forecast_data += "<tr>";
                            forecast_data += "<td>"+ date.DATE +"</td>";
                            forecast_data += "<td>"+ date.TMAX +"</td>";
                            forecast_data += "<td>"+ date.TMIN +"</td>";
                            forecast_data += "</tr>";
                            TMAX.push(date.TMAX);
                            TMIN.push(date.TMIN);
                        })
                        $('#forecast').html(forecast_data);
                        $('#forecast').show();
                        var trace1 = {
                            x: [1, 2, 3, 4, 5],
                            y: TMAX,
                            type: 'scatter',
                            name: 'TMAX'
                        };
                        var trace2 = {
                            x: [1, 2, 3, 4, 5],
                            y: TMIN,
                            type: 'scatter',
                            name: 'TMIN'
                        };
                        var plotdata = [trace1,trace2];
                        var layout = {
                            title: 'Weather Data for the Next 5 days ',
                            xaxis: {
                                title: 'Days(1 to 5)'
                            },
                            yaxis: {
                                title: 'Temperature'
                            }
                        }
                        Plotly.newPlot('plot-table',plotdata,layout);
                        $('#OpenAPI').show();
                    },
                    error: function(){
                        alert("Error in ajax call for Forecast");
                    }
                });
            },
            error: function(){
                alert("Error in ajax call for date weather info");
            }
        });
    });
    $('#zipsub').click(function(){
        var input_zip = $('#zipcode').val();
        var url = 'http://api.openweathermap.org/data/2.5/forecast?zip='+input_zip+',us&units=imperial&APPID=89870ba34261de7f962b6073e2f83bc7';
        $.ajax({
            url: url,
            dataType: 'json',
            success: function(getdata){
                console.log(getdata);
                var OpenMapFC = "<tr>+<th>DATE</th><th>TMAX</th><th>TMIN</th></tr>";
                var TMAX = [];
                var TMIN = [];
                var date_s = "";
                $.each(getdata.list, function(i,listInfo){
                    console.log(listInfo);
                    if(date_s != listInfo.dt_txt.slice(0,10))
                    {
                        date_s = listInfo.dt_txt.slice(0,10);
                        OpenMapFC += "<tr>";
                        OpenMapFC += "<td>"+ listInfo.dt_txt.slice(0,10) +"</td>";
                        OpenMapFC += "<td>"+ listInfo.main.temp_max +"</td>";
                        OpenMapFC += "<td>"+ listInfo.main.temp_min +"</td>";
                        OpenMapFC += "</tr>";
                        TMAX.push(listInfo.main.temp_max);
                        TMIN.push(listInfo.main.temp_min);
                    }
                });
                $('#opentable').html(OpenMapFC);
                $('#infor').show();
                var trace1 = {
                    x: [1, 2, 3, 4, 5],
                    y: TMAX,
                    type: 'scatter',
                    name: 'TMAX'
                };
                var trace2 = {
                    x: [1, 2, 3, 4, 5],
                    y: TMIN,
                    type: 'scatter',
                    name: 'TMIN'
                };
                var plotdata = [trace1,trace2];
                var layout = {
                    title: 'Weather Data for the Next 5 days ',
                    xaxis: {
                        title: 'Days(1 to 5)'
                    },
                    yaxis: {
                        title: 'Temperature'
                    }
                }
                Plotly.newPlot('plot-open',plotdata,layout);
            },
            error: function(){
                alert('Error in ajax call to Open Weather page. Check validity of Zipcode');
            }
        });
    });
});