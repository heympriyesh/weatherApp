const request=require('request');
const constants=require('../utils/config');

const weatherData=(address,callback)=>{
    const url=constants.openWeatherMap.BASE_URL+ encodeURIComponent(address)+'&appid='+constants.openWeatherMap.SECRET_KEY;
    //console.log(url);
    request({url,json:true},(error, {body})=>{
        //console.log(body);
        if(error){
            callback("Can't reach data from open weather api ",undefined)
        }else if(!body.main || !body.main.temp|| !body.name || !body.weather){
                callback('Unable to find required data, try another location',undefined);
        }
        else{
            callback(undefined,{
                temperature:body.main.temp,
                description:body.weather[0].description,
                cityName:body.name
            })
        }
    })
}

module.exports=weatherData;
