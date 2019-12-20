const path=require('path');//core module-need not download/install
const express=require('express');//npm package
const hbs=require('hbs');
//install hbs to handle bars..
//npm init -y
//npm i hbs
//npm i express
//handlebars is low level libraray--works with JS
//to use with express, we will ushbs
//2 uses-render dynamic pages as opposed to static ones and help to create reusable code

//after installing, make app.set function call and then make folder...copy html files, which r static, so that we can have 
//dynamic pages created......and the  delete the html pages

const app=express();



//app.set('view engine','hbs')


//no root route as we have html page to handle that
const publicDiectoryPath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views');//by defaul name OF FOLDER CONATINING  .HBS FILES SHOULD BE VIEWS, BUt to customise it,we can change it and set path
const partialsPath=path.join(__dirname,'../templates/partials');


const forecast=require('./utils/forecast');
const geocode=require('./utils/geocode');

//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views',viewPath);
hbs.registerPartials(partialsPath);////////*******************       take care of s in function name          ///////////////
//nodemon restartes server only when we save or change .js file......to make server restart when make cahnges in partials file, we run nodemon with e flag, ie extensions flag


//nodemon src/app.js -e js,hbs //******************************************************************* */



//set up static directoryto serve
app.use(express.static(publicDiectoryPath))

app.get('',(req,resp)=>{
    //resp.render('index');
    //in place of send, use render and first argument is file name, and no need to specify extension.
    //...second argument is what object to be sent dynamically to the html page
    resp.render('index',{
        title:'WEATHER APP' ,
        name:'Dishika Tayal'
    })

    //resp.render('index')
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About us',
        name:'Dishika Tayal' 
    });
})

app.get('/help',(req,resp)=>{
    resp.render('help',{
        title:'We will help u! Share your problem!',
        msg:'Hey we r there to help u!!!!SO jdskdjksfnjrflnjkfnmvnwkadkfmldkl;fkldfmkfk;ladmfnknfvnmc,v ,xc',
        name:'Dishika Tayal',
    });
})

//if we enter wrong key then also error message
//when we assign value to keys, do it without placing in quotations.....
//multi word key values also without quotes

//while integrating, first install requests module as use in functions used before
app.get('/weather',(req,resp)=>{
   // resp.send('On weather App');
   if(!req.query.address){
       return resp.send({
           error:'You must provide address to use weather app'
       })
   }
  // console.log(req.query.address);

  geocode(req.query.address,(error,{latitude,longitude,location}={})=>{//response ko desctructure
    if(error){
        return resp.send({
            error,
        })//using object destructuring-----property and value name same
    }

    forecast(latitude,longitude,(error,forecastData)=>{
        if(error){
            return resp.send({
                error,
            })
        }

        resp.send({
            location,
            forecast:forecastData,
            address:req.query.address,
        })

    })



  })

   


//    resp.send({
//        address:req.query.address,
//        location:'Bathinda,Punjab,India',
//        forecast:'14 degrees',
//    })




})

//query strings work on  requests
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search parameter'
        })
    }
    console.log(req.query.search);
    res.send({
        products:[],
    })

})


app.get('/help/*',(req,res)=>{//take care to put //before tha page anme
    //res.send('This help article not found')
    res.render('My404Page',({
        title:'Error',
        errorMessage:'This help article not found',
        name:'Dishika Tayal'
    }))
})

app.get('/about/*',(req,res)=>{//take care to put //before tha page anme
    //res.send('This help article not found')
    res.render('My404Page',({
        title:'Error',
        errorMessage:'The asked information about us not available',
        name:'Dishika Tayal'
    }))
})


app.get('*',(req,res)=>{
    //res.send('My 404 page');
    res.render('My404Page',{
        title:'Error',
        errorMessage:'Page not found',
        name:'Dishika Tayal'
    })
})

app.listen(3000,()=>{//starting server asynchronous process, taht will start it immediately
console.log('server is up!');
});