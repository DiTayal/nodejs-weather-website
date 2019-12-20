const request=require('request');
//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)


const forecast=(latitude,longitude,callback)=>{
    const url='https://api.darksky.net/forecast/82b9106a16d60c1381021594e672ccb0/'+latitude+','+longitude+'?units=si';
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to web services.May be connectivity issues!',undefined);
        }
        else if(body.error){
            callback("Unable to find weather at the location.Kindly re-check the location ");
        }
        else{
            callback(undefined,body.daily.data[0].summary+ " It is presently "+ body.currently.temperature+ " degrees out . There is a "+body.currently.precipProbability+ " % chances of raining . The range of temperature throughout the day (min,max) will be  ("+body.daily.data[0].temperatureMin+" , "+body.daily.data[0].temperatureMax+' )' );
           // callback(undefined,response.body.timezone);
        }
    })

}

/*
const forecast=(latitude,longitude,callback)=>{
    const url='https://api.darksky.net/forecast/82b9106a16d60c1381021594e672ccb0/'+latitude+','+longitude+'?units=si';
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to web services.May be connectivity issues!',undefined);
        }
        else if(response.body.error){
            callback("Unable to find weather at the location.Kindly re-check the location ");
        }
        else{
            callback(undefined,response.body.daily.data[0].summary+ " It is presently "+ response.body.currently.temperature+ " degrees out . There is a "+response.body.currently.precipProbability+ " % chances of raining ");
           // callback(undefined,response.body.timezone);
        }
    })

}*/

module.exports=forecast;