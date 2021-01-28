const fs = require("fs").promises;

const readFileAsync = async (fileName) => {
  console.log("Async");
  try {
    const source = await fs.readFile(`./data/${fileName}`, "utf-8");
    const data = source ? JSON.parse(source) : []; // handle logic with empty files

    return data;
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = readFileAsync;
