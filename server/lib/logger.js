import chalk from 'chalk';
const logger = {
    debug: (...arg) => {
      console.log(chalk.rgb(183,93,224)(new Date().toISOString(), ':DEBUG:', ...arg));
    },
    info: (...arg) => {
      console.log(chalk.green((new Date()).toISOString(), ':INFO:', ...arg));
    },
    warn: (...arg) => {
      console.log(chalk.red((new Date()).toISOString(), ':WARN:', ...arg));
    },
    tip: (...arg) => {
        console.log(chalk.blue((new Date()).toISOString(), "Tip: ", ...arg))
    }
  };
  
  export default logger;