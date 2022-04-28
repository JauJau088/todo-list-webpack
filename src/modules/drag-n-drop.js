const mainCtr = document.querySelector('.todo-list-container');

const aboveThisElem = (y) => {
  const draggableElemens = [...mainCtr.querySelectorAll('.draggable:not(.dragging)')];

  return draggableElemens.reduce((prev, curr) => {
    const box = curr.getBoundingClientRect();
    // Offset is the distance between the y position and the center of the box
    // Remember all positions are measured from the top of the page
    const offset = y - box.top - box.height / 2;

    // If offset is less than 0, meaning .dragging is above the curr elem
    // and if the curr offset is bigger, meaning it's closer to the curr elem than the prev elem
    if (offset < 0 && offset > prev.offset) {
      // curr is closer
      return { offset, element: curr };
    }
    // else prev is closer
    return prev;
  },
  // initial value of offset (1st prev) is neg infinity
  // return only the element not including the offset
  { offset: Number.NEGATIVE_INFINITY }).element;
};

export default aboveThisElem;
