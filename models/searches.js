const axios = require('axios');

class Searches {

    history = [];

    get paramsMapBox() {
        return {
            'proximity': 'ip',
            'language': 'es',
            'types': 'region',
            'access_token': process.env.MAPBOX_KEY
        }
    }

    get paramsOpenWeather() {
        return {
            'appid': process.env.OPEN_WEATHER_KEY,
            'lang': 'es',
            'units': 'metric'
        }
    }

    constructor() {}

    async place(place = '') {
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: this.paramsMapBox
            });
            const response = await instance.get();
            return response.data.features
                .map(place => ({
                    id: place.id,
                    name: place.place_name,
                    lng: place.center[0],
                    lat: place.center[1]
                }));
        } catch (err) {
            console.error('*** ', err);
            return [];
        }
    }

    async weather(lng, lat) {
        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.paramsOpenWeather, lat, lon: lng}
            });
            const response = await instance.get();
            const {weather, main} = response.data;
            return {
                description: weather[0].description,
                max_temp: main.temp_max,
                min_temp: main.temp_min,
                humidity: main.humidity,
                temp: main.temp
            };
        } catch (err) {
            console.error('*** ', err);
            return {};
        }
    }
}

module.exports = Searches;