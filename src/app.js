const express=require('express');
const hbs=require('hbs');
const path=require('path');

const weatherData=require('../utils/weatherData');

const app=express();
const port=process.env.PORT || 3000;

const publicStaticDirPath=path.join(__dirname,'../public');

const viewsPath=path.join(__dirname,'../templates/views');

const partialsPath=path.join(__dirname,'../templates/partials');

app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicStaticDirPath));


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App'
    });
})
//localhos:3000/weather?addresss=Delhi
app.get('/weather',(req,res)=>{
    const address=req.query.address;
    if(!address){
        res.send({
            error:"You must enter address in search text box"
        })
    }
    weatherData(address, (error,{temperature,description,cityName}={})=>{
        if(error){
            return res.send({
                error
            })
        }
        console.log(temperature,description,cityName);
        res.send({
            temperature,
            description,
            cityName
        })
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:"page not found"
    });
})

app.listen(port,()=>{
    console.log("Server is up on port",port);
} );