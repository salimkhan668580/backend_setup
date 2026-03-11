import chalk from "chalk";

export const logger = {
  info: (msg) => {
    console.log(chalk.blue(`----------------------------------`));
    console.log(chalk.blue(`ℹ INFO: ${msg}`));
    console.log(chalk.blue(`----------------------------------`));
  },

  success: (msg) => {
    console.log(chalk.green(`----------------------------------`));
    console.log(chalk.green(`✔ SUCCESS: ${msg}`));
    console.log(chalk.green(`----------------------------------`));
  },

  warn: (msg) => {
      console.log(chalk.yellow(`----------------------------------`));
    console.log(chalk.yellow(`⚠ WARNING: ${msg}`));
     console.log(chalk.yellow(`----------------------------------`));
  },

  error: (msg) => {
      console.log(chalk.red(`----------------------------------`));
    console.log(chalk.red(`✖ ERROR: ${msg}`));
     console.log(chalk.red(`----------------------------------`));
  }
};

// Example usage
// logger.info("Server started on port 3000");
// logger.success("Database connected successfully");
// logger.warn("Memory usage is high");
// logger.error("Unable to connect to database");