import readFile from "@helpers/readFileExtra";

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
  dateOfReceiving: new Date().getTime(),
});

export const getDataFromFile = (fileName) => async () => {
  let data = (await readFile(fileName)) || [];
  data = [...data].map(updateDate);

  return data;
};

export const getCars = getDataFromFile("cars.json");
export const getDiscounts = getDataFromFile("discounts.json");
export const getNews = getDataFromFile("news.json");
