document.getElementById('checkTimeBtn').addEventListener('click', async () => {
    const city = document.getElementById('cityInput').value.trim();
    
    if (!city) {
        document.getElementById('result').innerText = "Please enter a city name.";
        return;
    }

    const url = "https://yahoo-weather5.p.rapidapi.com/weather";
    const headers = {
        "x-rapidapi-key": "4fd28628e8msh7e41297972a312bp11def4jsn538f38848012",  // Use environment variables in production
        "x-rapidapi-host": "yahoo-weather5.p.rapidapi.com"
    };

    document.getElementById('result').innerText = "Fetching data..."; // Loading message

    try {
        const response = await fetch(`${url}?location=${encodeURIComponent(city)}&format=json&u=f`, {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const weatherData = await response.json();
        
        if (weatherData.location && weatherData.current_observation) {
            const location = weatherData.location.city;
            const temperature = weatherData.current_observation.condition.temperature;
            const condition = weatherData.current_observation.condition.text;

            // Weather condition to image mapping
            const conditionToImage = {
                "Mostly Cloudy": "images/mostly-cloudy.jpg",
                "Partly Cloudy": "images/partly-cloudy.jpg",
                "Cloudy": "images/cloudy.jpg",
                "Fair": "images/fair.jpg",
                "Rainy": "images/rainy.jpg",
                "Snowy": "images/snowy.jpg"
            };

            // Set result text
            document.getElementById('result').innerText = `Weather in ${location}: ${temperature}°F, ${condition}`;

            // Show appropriate image
            const imageUrl = conditionToImage[condition] || "default-image.jpg"; // Fallback image
            const weatherImage = document.createElement('img');
            weatherImage.src = imageUrl;
            weatherImage.alt = condition;
            weatherImage.style.width = '300px'; // Adjust size as needed
            weatherImage.style.marginTop = '10px';

            // Clear previous images and append new image
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = ''; // Clear previous content
            resultDiv.appendChild(weatherImage);
            resultDiv.prepend(document.createTextNode(`Weather in ${location}: ${temperature}°F, ${condition}`));
        } else {
            document.getElementById('result').innerText = 'Weather data not available. Please try a different city.';
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('result').innerText = 'Error fetching weather data. Please check your connection and try again.';
    }
});
