const fs = require("fs-extra");

const readFileAsync = async (fileName) => {
  try {
    const data = await fs.readJson(`./data/${fileName}`);

    return data;
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = readFileAsync;
