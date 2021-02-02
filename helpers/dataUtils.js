import readFile from "@helpers/readFile";

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

  return data;
};
