const chalk = require("chalk");
const app = require("./app");
const { startDb } = require("./dao");
require("dotenv").config();
async function startServer() {
  try {
    const port = process.env.PORT || 4001;
    await startDb();
    console.log("  Database connected successfully \n");
    app.listen(port, () => {
      console.log(`  Server running on port  ${port} \n`);
    });
  } catch (e) {
    console.error(chalk.red(`Couldn't start server, ${e.stack}`));
    // await startDb();
  }
}

startServer();
