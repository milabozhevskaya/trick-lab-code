const CONSTANTS = {
  TEXT: "",
  TOTAL_TIME_SEC: 0,
  STYLE_FOR_CONTAINER: "",
  STYLE_FOR_TEXT: "",
  DIRECTION: "left",
};

const init = (settings = {}) => {
  Object.keys(CONSTANTS).forEach((key) => {
    if (key in settings) {
      CONSTANTS[key] = settings[key];
    }
  });
};

const build = (parent) => {
  const items = [];

  const ul = document.createElement("ul");
  ul.classList.add("text-list");
  ul.style.cssText = CONSTANTS.STYLE_FOR_CONTAINER;

  const style = document.createElement("style");

  const additionalTime = CONSTANTS.TOTAL_TIME_SEC
    ? CONSTANTS.TOTAL_TIME_SEC / CONSTANTS.TEXT.length
    : 0;

  for (let i = 0; i < CONSTANTS.TEXT.length; i++) {
    const li = document.createElement("li");
    li.textContent = CONSTANTS.TEXT[i];

    li.classList.add("text-item");
    li.style.cssText = CONSTANTS.STYLE_FOR_TEXT;

    let pos =
      CONSTANTS.DIRECTION === "left" ? CONSTANTS.TEXT.length - 1 - i : i;

    li.style.cssText = CONSTANTS.STYLE_FOR_TEXT;

    style.textContent = `
      ${style.textContent}
      
      .text-list:hover .text-item:nth-child(${i + 1}) {
        transition: ${CONSTANTS.TOTAL_TIME_SEC * 0.9}s;
        transition-delay: ${pos * additionalTime}s;
      }
    `;

    items.push(li);

    ul.append(li);
  }

  document.head.appendChild(style);

  if (parent) parent.append(ul);

  return ul;
};

init({
  TEXT: "TRICK_BY_MILA",
  TOTAL_TIME_SEC: 1,
  STYLE_FOR_TEXT: "color: #bbb; font-size: 5em;",
  DIRECTION: 'right',
});

const container = document.getElementById("container");

if (container) {
  build(container);
}
