const inquirer = require('inquirer');
require('colors');

const menuOpts = [
    {
        type: 'list',
        name: 'option',
        messages: '¿Qué desea hacer?',
        choices: [
            { value: 1, name: `${'1.'.green} Buscar ciudad` },
            { value: 2, name: `${'2.'.green} Historial` },
            { value: 0, name: `0. Salir \n`.yellow }
        ]
    }
];

/**
 * Print menu to choice
 * 
 * @returns option choice
 */
const inquirerMenu  = async() => {
    console.clear();
    console.log('==============================='.green);
    console.log('     Seleccione una opción    '.green);
    console.log('=============================== \n'.green);

    const { option } = await inquirer.prompt(menuOpts);
    return option;
}

/**
 * 
 */
const confirmDialog = async() => {
    const question = [ 
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'enter'.green} para continuar`
        }
    ];
    console.log('\n');
    await inquirer.prompt(question);
}

/**
 * Method to read the input value
 * 
 * @param {*} message with the content to use
 * @returns the description
 */
const readInput = async(message) => {
    const question = [ 
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0 ) {
                    return 'Por favor inserta un valor';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
}

/**
 * Method to list and obtain id to delete task
 * 
 * @param {*} tasks to list
 * @returns id choice to delete
 */
const showTaskToDelete = async(tasks = []) => {

    const choices = tasks.map((task, i) => {
        const index = `${i + 1}.green`;
        return {
            value: task.id,
            name: `${index} ${task.desc}`
        }
    });

    choices.unshift({
        value: 'o',
        name: '0'.green + ' Cancelar'
    })

    const question = [ 
        {
            type: 'list',
            name: 'id',
            message: 'Borrar Tarea',
            choices
        }
    ];


    const { id } = await inquirer.prompt(question);
    return id;
}


/**
 * Method to list and obtain id to delete task
 * 
 * @param {*} tasks to list
 * @returns id choice to delete
 */
 const showTaskCheckList = async(tasks = []) => {

    const choices = tasks.map((task, i) => {
        const index = `${i + 1}.`.green;
        return {
            value: task.id,
            name: `${index} ${task.desc}`,
            checked: (task.completedIn) ? true : false
        }
    });

    choices.unshift({
        value: 'o',
        name: '0'.green + ' Cancelar'
    })

    const question = [ 
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciona una o varias',
            choices
        }
    ];

    const { ids } = await inquirer.prompt(question);
    return ids;
}

/**
 * Method to show confirm
 * 
 * @param {*} message with the question to confirm
 * @returns is confirm or not
 */
const confirm = async (message) => {
    const question = [{
        type: 'confirm',
        name: 'ok',
        message
    }];

    const {ok} = await inquirer.prompt(question);
    return ok;
}

/**
 * Method to show stop and confirm 
 */
const stop = async() => {
    
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${ 'enter'.green } para continuar`
        }
    ];

    console.log('\n');
    await inquirer.prompt(question);
}

module.exports = {
    inquirerMenu,
    confirmDialog,
    readInput,
    showTaskToDelete,
    showTaskCheckList,
    stop,
    confirm
}