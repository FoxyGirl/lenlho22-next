const restApiUrl = "/api/logs/rest";
const graphqlApiUrl = "/api/logs/graphql";

const handlePostRequest = (url) => (payload) => {
  fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};

export const handleRestPostRequest = handlePostRequest(restApiUrl);
export const handleGraphqlPostRequest = handlePostRequest(graphqlApiUrl);
