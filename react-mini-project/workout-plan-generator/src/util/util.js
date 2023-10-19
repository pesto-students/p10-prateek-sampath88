export const checkHasEmptyValues = (values) => {
  if (values.includes("")) {
    return true;
  }
  if (values.includes(null)) {
    return true;
  }
  if (values.includes(undefined)) {
    return true;
  }
  return false;
};

export const camelCaseToTitleCase = (input) => {
  // Split the input string into words based on capital letters
  const words = input.replace(/([a-z])([A-Z])/g, "$1 $2").split(/\s+/);

  // Capitalize the first letter of each word
  const titleCaseWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );

  // Join the words back together with spaces
  const titleCaseString = titleCaseWords.join(" ");

  return titleCaseString;
};
