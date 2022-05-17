const tableBody = document.querySelector(".cost-table tbody");
const contextmenu = document.getElementById("contextmenu");

let fieldElement = null;
let parentRowElement = null;
let isMouseOver = false;
let isContextmenuListenerActive = false;

//* add contextmenu event listener for the window object, if mouse is in the table body.
tableBody.addEventListener("mouseover", () => {
  if (isMouseOver) return;
  isMouseOver = true;
  if (!isContextmenuListenerActive)
    window.addEventListener("contextmenu", showContextMenu);
});

tableBody.addEventListener("mouseleave", () => (isMouseOver = false));

document.addEventListener("click", hideContextMenu);

contextmenu.addEventListener("click", (e) => {
  switch (e.target.id) {
    case "add-field":
      Field.create(parentRowElement);
      break;
    case "remove-field":
      if (!parentRowElement) return;
      Field.remove(parentRowElement);
      break;
    case "copy-field":
      copyField(fieldElement);
      break;
    case "paste-field":
      pasteField(fieldElement);
      break;
  }
});

function showContextMenu(e) {
  if (!isMouseOver) {
    window.removeEventListener("contextmenu", showContextMenu);
    contextmenu.style.display = "none";
    isContextmenuListenerActive = false;
    return;
  }
  isContextmenuListenerActive = true;
  e.preventDefault();

  fieldElement = document.elementFromPoint(e.x, e.y);
  parentRowElement = document.querySelector(`[data-id="${fieldElement.dataset.parentRowId}"]`);

  contextmenu.style.display = "block";
  contextmenu.style.top = e.y + "px";
  contextmenu.style.left = e.x + "px";
}

function hideContextMenu() {
  contextmenu.style.display = "none";
}

function copyField(element) {
  if (!(element instanceof HTMLInputElement)) return;
  element.select();
  element.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(element.value);
}

async function pasteField(element) {
  if (!(element instanceof HTMLInputElement)) return;
  element.value = await navigator.clipboard.readText();
}
