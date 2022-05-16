const axios = require('axios');

class Searches {

    history = [];

    get paramsMapBox() {
        return {
            'proximity': 'ip',
            'language': 'es',
            'access_token': process.env.MAPBOX_KEY
        }
    }

    constructor() {}

    async city(place = '') {
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: this.paramsMapBox
            });
            const response = await instance.get();
            return response.data;
        } catch (err) {
            console.error('*** ', err);
            return [];
        }
    }
}

module.exports = Searches;