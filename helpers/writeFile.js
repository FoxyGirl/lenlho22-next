const fs = require("fs").promises;

const writeFileAsync = async (fileName, data) => {
  try {
    await fs.writeFile(`./data/${fileName}`, JSON.stringify(data));
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = writeFileAsync;
