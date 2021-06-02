// dynamically generates HTML elements + attributes based on inputs or arguments passed in
// this is a dependency of events.js, tickets.js, schedule.js
function createEl(htmlString, attrs, ...children) {
  if (typeof htmlString !== "string") {
    throw Error("Argument 'htmlString' is required and must be a string");
  }

  const el = document.createElement(htmlString);

  if (typeof attrs === "object") {
    for (let key in attrs) {
      if (key.substring(0, 2) === "on") {
        el.addEventListener(key.substring(2).toLowerCase(), attrs[key]);
      } else {
        el.setAttribute(key, attrs[key]);
      }
    }
  }

  children.forEach(function (child) {
    let node;

    if (child.constructor.name.includes("Element")) {
      node = child;
    } else {
      node = document.createTextNode(child);
    }

    el.appendChild(node);
  });

  return el;
}

//   can use require() and module.exports in front-end bc
// we created Node.js app to handle front-end asset management
module.exports = createEl;
