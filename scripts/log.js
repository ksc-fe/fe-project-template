const chalk = require('chalk');

let log = {
    info(message) {
        console.log(chalk.green(`${message}`));
    },
    success(message) {
        console.log(chalk.blue(`${message}`));
    },
    error(error) {
        console.log(chalk.red(`${error}`));
    }
}
module.exports = log;