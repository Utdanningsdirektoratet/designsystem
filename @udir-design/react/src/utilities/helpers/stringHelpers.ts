/** Captitilize first character of a string */
const capitalizeString = (string: string) => {
  const trimmedString: string = string.trim();
  return trimmedString[0].toUpperCase() + trimmedString.slice(1).toLowerCase();
};

export { capitalizeString };
