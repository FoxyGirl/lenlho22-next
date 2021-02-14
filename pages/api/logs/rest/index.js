const path = require("path");
const fs = require("fs").promises;
const key = require("../../../../helpers/getRandomKey");

const DIR_PATH = "logs/rest";

const rest = async (req, res) => {
  if (req.method === "POST") {
    const { userId } = req.cookies;
    const log = {
      created: new Date(),
      userId,
      userAgent: req.headers["user-agent"],
    };

    const logId = key.getShortRandomKey();

    const { body } = req;

    const logPath = path.resolve(DIR_PATH, `${logId}.json`);
    const logData = { ...log, payload: body };
    try {
      await fs.writeFile(logPath, JSON.stringify(logData), "utf-8");

      res.status(201).json({
        name: "POST response",
        message: `created at ${new Date().toISOString()}`,
      });
    } catch (err) {
      res.status(500).json({ status: "API Error" });
    }
  } else if (req.method === "GET") {
    const { userId } = req.query;

    try {
      const filenames = await fs.readdir(DIR_PATH);

      const response = [];

      for (let filename of filenames) {
        const fileContent = await fs.readFile(
          `${DIR_PATH}/${filename}`,
          "utf-8"
        );
        response.push(JSON.parse(fileContent));
      }

      res.status(200).json({
        logs: userId
          ? response.filter((item) => item.userId === userId)
          : response,
      });
    } catch (err) {
      res.status(500).json({ status: "API Error" });
    }
  }
};

module.exports = rest;
