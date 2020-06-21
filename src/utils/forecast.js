const request = require('request');


const forecast =(latitude, longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=36773a5df6aa28bf99a342ba2e712761&query='+latitude +',' + longitude + '&units=m';
request({url, json : true}, (error, {body})=>{
    if(error){
        callback('Unable to connect to wether services', undefined)
    }else if(body.error){
        callback('Unable locate the location', undefined)
    }else{
        
        callback(null,'the temperature is ' + body.current.temperature + '. Today is ' + body.current.weather_descriptions[0])
    }
})

}





module.exports = forecast;