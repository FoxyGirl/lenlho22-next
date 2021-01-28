const fs = require("fs").promises;

const writeFileAsync = async (data) => {
  console.log("Async");
  try {
    await fs.writeFile("./data/users.json", JSON.stringify(data));
    console.log("File written Async successfully\n");
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = writeFileAsync;
