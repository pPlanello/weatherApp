const fs = require('fs')
const axios = require('axios');

class Searches {

    history = [];
    dbPath = './db/database.json';

    constructor() {
        this.readDB();
    }

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
    
    get historyTitleCase() {
        return this.history.map(place => {
            let words = place.split(' ');
            words = words.map(p => p[0].toUpperCase() + p.substring(1));
            return words.join(' ');
        });
    }

    /**
     * Method to call mapbox to get info about the place
     * 
     * @param {string} place to find
     * @returns info about place
     */
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

    /**
     * Method to call open weather to get info about the weather with this fields
     * 
     * @param {number} lng longitude 
     * @param {number} lat latitude
     * @returns info about weather
     */
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

    /**
     * Add place in the history
     * 
     * @param {string} place
     */
    addHistory(place = '') {
        if (place !== undefined && this.history.includes(place.toLocaleLowerCase())) {
            return;
        }
        // last 10 results
        this.history = this.history.slice(0, 10);
        this.history.unshift(place.toLocaleLowerCase());
    }

    /**
     * Save history in DataBase
     */
    saveDB() {
        const payload = { history: this.history };
        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    /**
     * Read DataBase to load history 
     */
    readDB() {
        if (!fs.existsSync(this.dbPath)) {
            return;
        }

        const info = fs.readFileSync(this.dbPath, {encoding: 'utf-8'});
        this.history = JSON.parse(info).history;
    }
}

module.exports = Searches;