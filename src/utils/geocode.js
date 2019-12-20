const request=require('request');

//object destructuring
const geocode=(address,callback)=>{//encodeURIComponent handles the speacial characters in address
    const geocodeURL='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYmFyYmllZG9sbCIsImEiOiJjazQ3MXhoemgwbzhwM29xdTBrbndtNzA4In0.JqKkhnaKA0y5zVvWuzVVcg&limit=1';

    request({url:geocodeURL,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to location services. Kindly check internet connectivity');
            //callback('Unable to connect to location services.Kindly check internet connectivity',undefined);
            //can explicitly pass undefined as argument or it will implicitly be considered so
        }
        else if(body.features.length===0){//when wrong address??Why not work????
            callback('Undefined location. Kindly recheck location',undefined);
        }
        else{
            callback(undefined,{//or data={}
                longitude:body.features[0].center[0],
                latitude:body.features[0].center[1],
                location:body.features[0].place_name,
            })
        }
    })
    
}
/*
const geocode=(address,callback)=>{//encodeURIComponent handles the speacial characters in address
    const geocodeURL='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYmFyYmllZG9sbCIsImEiOiJjazQ3MXhoemgwbzhwM29xdTBrbndtNzA4In0.JqKkhnaKA0y5zVvWuzVVcg&limit=1';

    request({url:geocodeURL,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to location services. Kindly check internet connectivity');
            //callback('Unable to connect to location services.Kindly check internet connectivity',undefined);
            //can explicitly pass undefined as argument or it will implicitly be considered so
        }
        else if(response.body.features.length===0){
            callback('Undefined location. Kindly recheck location',undefined);
        }
        else{
            callback(undefined,{//or data={}
                longitude:response.body.features[0].center[0],
                latitude:response.body.features[0].center[1],
                location:response.body.features[0].place_name,
            })
        }
    })    
}
*/
module.exports=geocode;
