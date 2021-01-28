const fs = require("fs").promises;

const readFileAsync = async () => {
  console.log("Async");
  try {
    const source = await fs.readFile("./data/users.json", "utf-8");
    const data = source ? JSON.parse(source) : []; // handle logic with empty files

    return data;
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = readFileAsync;
