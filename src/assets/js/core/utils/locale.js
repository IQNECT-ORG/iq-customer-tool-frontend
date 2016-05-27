
export const getLang = () => {
  return navigator.language || navigator.userLanguage || navigator.browserLanguage;
};