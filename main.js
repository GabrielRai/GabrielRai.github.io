document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded event fired');
    fetch('https://api.weatherapi.com/v1/current.json?key=b863852a452744a895f202721241702&q=Skövde&aqi=no')
      .then(response => response.json())
      .then(data => {
        console.log('Data received:', data);  // Add this line
        const apiElement = document.getElementById('Temperatur');

        // Check if the necessary data is available
        if (data && data.current && data.current.temp_c) {
          apiElement.innerHTML = `Temperature in Skövde: ${data.current.temp_c}°C`;
        } else {
          apiElement.innerHTML = 'Failed to fetch temperature data.';
        }
      })
      .catch(error => console.error('Error fetching weather data:', error));
});


