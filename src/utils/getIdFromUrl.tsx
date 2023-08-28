const getIdFromUrl = (url: string) => {
  return url.split("/")[6];
};

export default getIdFromUrl;
