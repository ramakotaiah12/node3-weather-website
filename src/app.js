const path = require('path')
const express = require('express');;
const hbs = require('hbs');
const request = require('request');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode')


const app = express();
const port = process.env.PORT || 3000;
//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials')
// set up handlebars engine, views location
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)
//setup static directory to serve
app.use(express.static(publicDirectoryPath));
app.get('',(req, res)=>{
    res.render('index', {
        title: 'Weather',
        text : 'koti'
        
    })
})
app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About',
        text : 'koti'
        
    });
})
app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help',
        text : 'koti'
        
    });
});
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must enter address'
        })
    }
geocode(req.query.address, (error,{latitude, longitude, location}={})=>{
    if(error){
        return res.send({error})
    }
    forecast(latitude, longitude,(error, forecastData)=>{
        if(error){
            return res.send({error})
        }
        res.send({
            forecast: forecastData,
            location,
            address: req.query.address
        })
    })
})

})
app.get('/products',(req,res)=>{
    if(!req.query.search){
       return res.send({
            error: 'You must provide a search term',
           
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})
app.get('/help/*',(req,res)=>{
res.render('404',{title: 'help article not found',
text : 'koti'
})
})
app.get('*',(req, res)=>{
    res.render('404',{
        title: 'page not found',
        text : 'koti'

    })
})
app.listen(port, ()=>{console.log('server started')});
