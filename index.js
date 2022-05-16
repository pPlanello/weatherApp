const { inquirerMenu, stop, readInput, showPlacesResults } = require("./helpers/inquirer");
const Searches = require("./models/searches");
require('dotenv').config();

const main = async() => {
    
    const searches = new Searches();
    let option;

    do {

        option = await inquirerMenu();

        switch(option) {
            case 1:
                // Show message
                const place = await readInput('Ciudad: ');
                // Search results
                const results = await searches.city(place);
                // Select place
                const id = await showPlacesResults(results);
                const placeSelected = results.find(res => res.id === id);
                // Show result
                console.log('\n Información de la ciudad\n'.green);
                console.log('Ciudad: '.green + placeSelected.name);
                console.log('Latitud: '.green + placeSelected.lat);
                console.log('Longitud: '.green + placeSelected.lng);
                break;
            case 2:
                break;
        }
        
        if (option !== 0) {
            await stop();
        }

    } while (option !== 0)
} 


main();