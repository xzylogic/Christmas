export const sortNumber = (a, b, nonKey, nonName, key) => {
  if (a[nonKey] !== nonName && b[nonKey] !== nonName) {
    return parseFloat(a[key]) - parseFloat(b[key]);
  }
  return false;
};

export const sortString = (a, b, nonKey, nonName, key) => {
  if (a[nonKey] !== nonName && b[nonKey] !== nonName) {
    return a[key].toString().localeCompare(b[key].toString());
  }
  return false;
};

export const sortDate = (a, b, nonKey, nonName, key) => {
  if (a[nonKey] !== nonName && b[nonKey] !== nonName) {
    return parseInt(new Date(a[key]).valueOf(), 10) - parseInt(new Date(b[key]).valueOf(), 10);
  }
  return false;
};
