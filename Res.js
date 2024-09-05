const apiKey = "f538e790cb9ed3a08d171fdf80e2209b";
        const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
        
        const searchBox = document.querySelector(".search input");
        const searchBtn = document.querySelector(".search button");
        const weatherIcon = document.querySelector(".weather-icon");

        async function checkWeather(city) {
            const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);

            if (response.status === 404) {
                document.querySelector(".error").style.display = "block";
                document.querySelector(".weather").style.display = "none";
                return;
            }

            const data = await response.json();
            console.log(data);
            
            // Update the HTML elements with the weather data
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

            // Update weather icon based on weather condition
            if (data.weather[0].main === "Clouds") {
                weatherIcon.src = "clouds.png";
            } else if (data.weather[0].main === "Clear") {
                weatherIcon.src = "clear.png";
            } else if (data.weather[0].main === "Rain") {
                weatherIcon.src = "rain.png";
            } else if (data.weather[0].main === "Drizzle") {
                weatherIcon.src = "drizzle.png";
            } else if (data.weather[0].main === "Mist") {
                weatherIcon.src = "mist.png";
            } else  {
                weatherIcon.src = "mist.png";
            }

            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";
        }   

        searchBtn.addEventListener("click", () => {
            checkWeather(searchBox.value.trim()); // Trim to remove extra spaces
        }); 
function getSuggestions() {
    let input = document.getElementById('cityInput').value;
    if (input.length < 3) {
        document.getElementById('suggestions').innerHTML = '';
        return;
    }

    fetch(`https://nominatim.openstreetmap.org/search?q=${input}&format=json&addressdetails=1&limit=5`)
        .then(response => response.json())
        .then(data => {
            console.log(data); // Debugging
            // Use a Set to remove duplicate names
            const uniqueNames = new Set(
                data
                    .map(place => place.display_name.split(',')[0].trim()) // Get the first part of the address
                    .filter(name => name.split(' ').length === 1) // Filter out names with more than one word
            );

            // Limit to 3 suggestions and format for display
            let suggestions = Array.from(uniqueNames)
                .slice(0, 3) // Limit to 3 suggestions
                .map(name => `<div>${name}</div>`)
                .join('');
            
            document.getElementById('suggestions').innerHTML = suggestions;
        })
        .catch(error => console.error('Error fetching suggestions:', error));
}

// Add event listener to the suggestions div
document.getElementById('suggestions').addEventListener('click', function(e) {
    if (e.target.tagName === 'DIV') {
        document.getElementById('cityInput').value = e.target.textContent;
        document.getElementById('suggestions').innerHTML = '';
        // Optional: Trigger your temperature checking function here
    }
});
