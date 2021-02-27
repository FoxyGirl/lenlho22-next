const fs = require("fs-extra");
const DIR_PATH = "logs/rest";

const rest = async (req, res) => {
  try {
    if (req.method === "GET") {
      const { logId } = req.query;
      const file = await fs.readJson(`${DIR_PATH}/${logId}.json`);

      res.status(200).json({ log: file });
    } else {
      res.status(500).json({ status: "API Error" });
    }
  } catch (err) {
    res.status(500).json({ status: "API Error" });
  }
};

module.exports = rest;
