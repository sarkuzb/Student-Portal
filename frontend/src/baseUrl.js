export const baseApiURL = () => {
  console.log("API Base URL:", process.env.REACT_APP_APILINK); // Log the value
  return process.env.REACT_APP_APILINK;
};
