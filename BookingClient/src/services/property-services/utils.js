const toQueryString = (obj) => {
  if (obj != null) {
    const temp = { ...obj };
    Object.keys(temp).map((key) => {
      if (temp[key] === null || temp[key]?.length == 0 || temp[key] === 0) {
        delete temp[key];
      }
    });

    const keyValuePairs = [];

    for (const key in temp) {
      if (temp.hasOwnProperty(key)) {
        if (Array.isArray(temp[key])) {
          // If the property is an array, create multiple key-value pairs
          for (const value of temp[key]) {
            keyValuePairs.push(
              `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
            );
          }
        } else {
          // If it's not an array, create a single key-value pair
          keyValuePairs.push(
            `${encodeURIComponent(key)}=${encodeURIComponent(temp[key])}`
          );
        }
      }
    }
    return keyValuePairs.join("&");
  }
  else{
    return ''
  }
};
function validateNumberInput(inputText) {
  // Regular expression to match only numbers
  var numberPattern = /^[0-9]+$/;

  // Test the input text against the pattern
  var isValid = numberPattern.test(inputText);

  return isValid;
}
export { toQueryString ,validateNumberInput};
