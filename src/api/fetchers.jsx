const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchData = async (path, method, data) => {
  const url = `${BASE_URL}${path}`;
  return fetch(url, {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error(response.statusText);
    })
    .then((data) => data)
    .catch((err) => err.message);
};
