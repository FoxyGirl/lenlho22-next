import readFile from "../helpers/readFile";
import writeFile from "../helpers/writeFile";

const getDateOfReceiving = () => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const dateOfReceiving = new Date().toLocaleDateString("en-US", options);

  return String(dateOfReceiving);
};

const updateDate = (item) => ({
  ...item,
  dateOfReceiving: getDateOfReceiving(),
});

export const getDataFromFile = (fileName) => async () => {
  let data = (await readFile(fileName)) || [];
  data = [...data].map(updateDate);

  writeFile(fileName, data);

  return data;
};
