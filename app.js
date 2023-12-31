const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
const exp = require("constants");
const apiModule = require("./api.js")

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))
app.set('view engine','ejs')

app.get("/", function(req, res){   
    res.render('index')
})
app.post("/weather", function(req,res){

    const cityName = req.body.city;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName +"&appid="+apiModule.api+"&units=metric"
    https.get(url , function(request){
        request.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temperature = weatherData.main.temp ;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgURL = "https://openweathermap.org/img/wn/"+icon +"@2x.png"
            res.render('index',{city: cityName, temp: temperature, desc: description, url: imgURL})
        })
    })
    
})


app.listen(3000, function(){
    console.log("Server started. Enjoy...")
})


