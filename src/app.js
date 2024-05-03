const express = require('express')
const hbs = require('hbs')
const app = express()


//ststic PagasHtml
const path = require('path')
const dirname = path.join(__dirname,'../public')
app.use(express.static(dirname))

// dinamic html by engine [hbs]
app.set('view engine','hbs')
const viewsDirctory = path.join(__dirname,'../temp1/views')
app.set('views',viewsDirctory)


/// partials
const partialspath = path.join(__dirname,'../temp1/partials')
hbs.registerPartials(partialspath)


app.get('/home',(req,res)=>{
    res.render('home')
})
    




const geocode = require('./tools/geocode')
const forecast = require('./tools/forecastFile')

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide address'
        })
    }
    geocode(req.query.address,(error,data)=>{
        if(error){
            // shorthand property error:error
            return res.send({error})
        }
        forecast(data.latitude,data.longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location:req.query.address
            })
        })
    })
})











app.listen(3000,'127.0.0.1',()=>{
    console.log('server is runnimg')
})

