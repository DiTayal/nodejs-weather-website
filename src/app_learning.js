const path=require('path');//core module-need not download/install
const express=require('express');//npm pakage
//by default, get core modules before npm ones
//path module is apply functions on paths


//install hbs to handle bars..
//npm init -y
//npm i hbs
//npm i express
//handlebars is low level libraray--works with JS
//to use with express, we will ushbs
//2 uses-render dynamic pages as opposed to static ones and help to create reusable code


const app=express();

//lecture 6-module 7
//dirname and filename get from wrapper function that we get , when we debug nodejs code


console.log(__dirname);
console.log(__filename);
console.log(path.join(__dirname));//join works on 2 strings
console.log(path.join(__dirname,'..'));//or '../'        .. takes to upper folder
console.log(path.join(__dirname,'../..'));
console.log(path.join(__dirname,'../public'));


const publicDiectoryPath=path.join(__dirname,'../public')
app.use(express.static(publicDiectoryPath))


//will not run once we make index.html---- as it is default page

/*
app.get('',(req,resp)=>{
   // resp.send('Hello express');//sending string
    resp.send('<h1>Welcome to weather app</h1>');//can send html aslo
})
*/


app.get('/help',(req,resp)=>{
    //resp.send('On help page!');

    //can send json data also...express automatically stringifies a json object, ie,
    // if express finds an object, them it stringifies it and converts to json string to show to requester
   
    // resp.send({
    //     name:'Dishika',
    //     age:20,
    // })

    //sending array/*
     resp.send([
    {
        name:'Dishika',
        age:20,
    },
    {
        name:'Mukul',
        age:18,
    }
    ])

})

app.get('/about',(req,resp)=>{
    //resp.send('Know about us!');
    resp.send('<h1>Know about us!</h1>')

})

app.get('/weather',(req,resp)=>{
   // resp.send('On weather App');
   resp.send({
       location:'Bathinda,Punjab,India',
       forecast:'14 degrees',
   })

})


//app.com
//app.com/about
//app.com/help

app.listen(3000,()=>{//starting server asynchronous process, taht will start it immediately
console.log('server is up!');
});