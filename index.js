const { inquirerMenu, stop, readInput } = require("./helpers/inquirer");
const Searches = require("./models/searches");

const main = async() => {
    
    const searches = new Searches();
    let option;

    do {

        option = await inquirerMenu();

        switch(option) {
            case 1:
                // Show message
                const place = await readInput('Ciudad: ');

                // Show results
                console.log('\n Información de la ciudad\n'.green);
                console.log('Ciudad: ');
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