export const findFromArrayByProperty = (array, property, query) => {
  const result = array.find(obj => {
    return obj[property] === query;
  });
  return result;
};
export const calculateTotalFromArray = array => {
  let totalQuantity = 0;
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    totalQuantity = totalQuantity + element?.quantity;
  }
  return totalQuantity;
};
