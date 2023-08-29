//grab api key and url seperately
const apiKey = "31bca9d1bfe1e6984fc9aa1a4d7e0b0b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";

//have a const for our buttons and icons
const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');

//async and promise requesting from the API
async function checkWeather(city){
    //combining the apiurl, city name, and api key to give us the full url
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    
    //if we can't get a response from async will display weather if you give a city name or error if you didn't
    if(response.status == 404){
        document.querySelector('.error').style.display = 'block';
        document.querySelector('.weather').style.display = 'none';
    }

    else{
    //data is the response we get back from the async
    var data = await response.json();

    //using our selectors to select for where to put the info
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp)  + ' °F';
    document.querySelector(".humidity").innerHTML = data.main.humidity + '%';
    document.querySelector(".wind").innerHTML = data.wind.speed + ' MPH';

    //picture changes depending on what the main shows
    if(data.weather[0].main == 'Clouds'){
        weatherIcon.src = "images/clouds.png";
    }
    else if(data.weather[0].main === 'Clear'){
        weatherIcon.src = 'images/clear.png';
    }
    else if(data.weather[0].main === 'Rain'){
        weatherIcon.src = 'img/rain.png';
    }
    else if(data.weather[0].main ==='Drizzle'){
        weatherIcon.src = 'images/drizzle.png'
    }
    else if(data.weather[0].main === 'Mist'){
        weatherIcon.src = 'images/mist.png'
    }  

    //if we get a response from async, still show weather and display no error
    document.querySelector('.weather').style.display = "block";
    document.querySelector('.error').style.display = 'none';
}
}
//looking at the search button, when we click it, run the checkWeather function
searchBtn.addEventListener('click', ()=>{
    checkWeather(searchBox.value);
})


