const fs = require('fs').promises;
const fetch = require('node-fetch');

const cities = [
  { name: 'New York', lat: 40.7128, lng: -74.0060 },
  { name: 'London', lat: 51.5074, lng: -0.1278 },
  { name: 'Paris', lat: 48.8566, lng: 2.3522 },
  { name: 'Tokyo', lat: 35.6895, lng: 139.6917 },
  { name: 'Sydney', lat: -33.8651, lng: 151.2099 },
  { name: 'Rome', lat: 41.9028, lng: 12.4964 },
  { name: 'Cairo', lat: 30.0444, lng: 31.2357 },
  { name: 'Rio de Janeiro', lat: -22.9068, lng: -43.1729 },
  { name: 'Dubai', lat: 25.2048, lng: 55.2708 },
  { name: 'Rabat', lat: 34.0209, lng: -6.8416 }
];

function selectRandomCity(cities) {
  const randomIndex = Math.floor(Math.random() * cities.length);
  return cities[randomIndex];
}

async function fetchTemperature(city) {
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lng}&current_weather=true`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching temperature data:', error);
    throw error;
  }
}

async function main() {
  try {
    const inputCity = await fs.readFile('input.txt', 'utf-8');
    const city = cities.find(c => c.name === inputCity.trim());

    if (!city) {
      throw new Error(`City "${inputCity}" not found in the list.`);
    }

    try {
      await fs.unlink(`${city.name}.txt`);
    } catch (error) {
      console.log('An error occurred:', error);
    }

    const temperatureData = await fetchTemperature(city);
    const temperature = temperatureData.current_weather.temperature_2m;

    await fs.writeFile(`${city.name}.txt`, `Temperature in ${city.name}: ${temperature}°C`);

    console.log(`Temperature data written to ${city.name}.txt`);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

main();
