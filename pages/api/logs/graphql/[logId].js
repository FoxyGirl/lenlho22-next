const fs = require("fs").promises;
const DIR_PATH = "logs/graphql";

const graphql = async (req, res) => {
  try {
    if (req.method === "GET") {
      const { logId } = req.query;
      const file = await fs.readFile(`${DIR_PATH}/${logId}.json`, "utf-8");

      res.status(200).json({ log: JSON.parse(file) });
    } else {
      res.status(500).json({ status: "API Error" });
    }
  } catch (err) {
    res.status(500).json({ status: "API Error" });
  }
};

module.exports = graphql;
