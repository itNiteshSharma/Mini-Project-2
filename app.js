const express=require('express');
const https=require('https');
const bodyParse=require('body-parser');
const bodyParser = require('body-parser');
const path = require("path")


const app=express();
app.use(bodyParser.urlencoded({extended:true}));

const templatePath = path.join(__dirname, './templates')
app.set("view engine", "hbs")
app.set("views", templatePath)

app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/index.html");
    
})
app.post('/',(req,res)=>{
    

    const city=req.body.CityName;
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7ba724c696bd29be06d8445c4ef1e90c&units=metric`;
    
    https.get(url,(response)=>{
        // console.log(response.statusCode);
        response.on('data',(data)=>{
            // console.log(data);
            
            const weatherData=JSON.parse(data);
            const temp=weatherData.main.temp;
            const desc=weatherData.weather[0].description;
            const country=weatherData.sys.country;
            // console.log(desc)
            // res.send("<h1>The temperature in "+city+" is "+temp+" degree celsius<h1>");
            res.render("home",{city , temp , desc,country});
        
        })

    })
})

app.listen(1000,()=>{console.log("our server i running at port 1000")})


