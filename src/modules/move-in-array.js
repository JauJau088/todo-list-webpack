const moveInArray = (arr, from, to) => {
  // Delete the item from it's current position
  const item = arr.splice(from, 1);

  // Move the item to its new position
  arr.splice(to, 0, item[0]);
};

export default moveInArray;
