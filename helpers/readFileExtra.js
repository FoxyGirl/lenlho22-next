const fs = require("fs-extra");
const path = require("path");

const DIR_PATH = "public/data/";

const readFileAsync = async (fileName) => {
  try {
    const filePath = path.resolve(DIR_PATH, fileName);
    const data = await fs.readJson(filePath);

    return data;
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = readFileAsync;
