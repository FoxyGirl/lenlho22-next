const fs = require("fs").promises;

const writeFileAsync = async (fileName, data) => {
  console.log("Async");
  try {
    await fs.writeFile(`./data/${fileName}`, JSON.stringify(data));
    console.log("File written Async successfully\n");
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = writeFileAsync;
