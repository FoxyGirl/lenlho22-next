const getRandomKey = () => {
  const keyRand1 = [...Array(8)]
    .map((i) => (~~(Math.random() * 36)).toString(36))
    .join("");

  const keyRand2 = [...Array(4)]
    .map((i) => (~~(Math.random() * 36)).toString(36))
    .join("");

  const keyRand3 = [...Array(11)]
    .map((i) => (~~(Math.random() * 36)).toString(36))
    .join("");

  return `${keyRand1}-${keyRand2}-${keyRand3}`;
};

const getShortRandomKey = () =>
  [...Array(11)].map((i) => (~~(Math.random() * 36)).toString(36)).join("");

export { getRandomKey, getShortRandomKey };
