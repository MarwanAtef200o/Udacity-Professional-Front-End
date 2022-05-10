/* Global Variables */
// js date instance
let date = new Date();
let dateNow = (date.getMonth()+1)+'.'+ date.getDate()+'.'+ date.getFullYear();

//My API key
const key= "4a05631572607ed297264631bec14ed1";
/*******************/



//adding an event listener on the "Generate" button 
const generateButton= document.getElementById("generate");

//The event listener function is asynchronous
generateButton.addEventListener("click", async ()=>{
    let openWeatherURL= inputs()[0];
    let feelings= inputs()[1];
    let output= await main(openWeatherURL, feelings);
    display(output);
});





//function that contains the user inputs and the openweathermap site API URL call 
function inputs (){
    const zip= document.getElementById("zip").value;
    const feelings= document.getElementById("feelings").value;

    //"units= metric" for temperature in Celsius
    const openWeatherURL= `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${key}&units=metric`;
    let inputsArray= [openWeatherURL, feelings];
    return inputsArray;                                 //returning multiple values from the function
}




//function that contains the main logic of the project
async function main(openWeatherURL, feelings){
     //fetch() is asynchronous (and we wait till it comes back with the response "res") and makes a GET request by default
     const res= await fetch(openWeatherURL);

     //json() is asynchronous, wait till response 
     const dataResponse= await res.json();              //convert the received stream response "res" into a readable js object response "dataResponse"
     const temperature= `${dataResponse.main.temp}°C`;  //accessing the temp attribute in that js object
 
     //POST request to save the data that the user entered (feelings), temperature, and today's date 
     await fetch("/savingData", {                       //we must specify that this fetch is making a POST request
         method: "POST",
         headers: {
             "Content-Type": "application/json"
         },
         body: JSON.stringify({
             dateNow,
             temperature,
             feelings
         })
     });
 
     //GET request to get the weather data and later display it to the user
     const getResponse= await fetch("/gettingData");
     const output= await getResponse.json();
     return output;
}




//function that updates the UI so the user can see the weather data final output "output"
function display (output){
    document.getElementById("date").innerHTML= output.dateNow;
    document.getElementById("temp").innerHTML= output.temperature;
    document.getElementById("feeling").innerHTML= output.feelings;
}