// HTTP Requests handler
export const getJSON = async function (url) {
  try {
    const request = await fetch(url);
    const data = await request.json();
    // console.log(data);
    return data;
  } catch (error) {
    throw new Error('Something bad happended while fetching 🤕', error.status);
  }
};

// Random ID Generators
export const getFirstID = function () {
  const firstID = Math.floor(Math.random() * 826);
  return String(firstID);
};

export const getSecondID = function () {
  const secondID = Math.floor(Math.random() * 826);
  return String(secondID);
};
