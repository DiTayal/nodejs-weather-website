console.log("Client side javascript file is loaded!");

/*
//fetch is not jS function, but provided by browser...not run in nde js...but since suing browswer,s o work
fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data);
    })
})
*/

// fetch('http://localhost:3000/weather?address=boston').then((response)=>{//in place of put boston put ! and see console in inspect
//     response.json().then((data)=>{
//         if(data.error)
//         console.log(data.error);
//         else
//         {
//             console.log(data.location);
//             console.log(data.forecast);
//         }
//     } )   
// })

//select the element
const weatherForm=document.querySelector('form');//form se data take
const search=document.querySelector('input');//when data is entered....
const messageOne=document.querySelector('#message-1');//getting ids
const messageTwo=document.querySelector('#message-2');



// app.js:25 Uncaught TypeError: Cannot read property 'addEventListener' of null
//     at app.js:25
//bcoz js file loaded pehle before body in index.hbs..................form nhi hai par uske upar work done in js file, loaded pehle hi
weatherForm.addEventListener('submit',(e)=>{

    e.preventDefault();//preventing refreshing of the page when clicked seach or press enter
    const location=search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent=''

    // console.log('-----------------==============---------------')
    // console.log(location);
    // console.log('-----------------==============---------------')

fetch('http://localhost:3000/weather?address='+location).then((response)=>{//in place of put boston put ! and see console in inspect
response.json().then((data)=>{
    if(data.error)
    {
        console.log(data.error);
        messageOne.textContent=data.error;
    }
    else
    {
        // console.log(data.location);
        // console.log(data.forecast);
        messageOne.textContent=data.location;
        messageTwo.textContent=data.forecast;
    }
} )   
})


})
