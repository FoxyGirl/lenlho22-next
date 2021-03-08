const fs = require("fs-extra");
const path = require("path");

const DIR_PATH = "public/data/";

const writeFileAsync = async (fileName, data) => {
  const filePath = path.resolve(DIR_PATH, fileName);

  try {
    await fs.ensureFile(filePath);
    await fs.writeJson(filePath, data);
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = writeFileAsync;
