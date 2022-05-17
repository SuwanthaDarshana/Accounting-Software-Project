const createBlank = document.getElementById("create-blank");
const createTemplate = document.getElementById("create-template");
const tableFooter = document.querySelector(".cost-table tfoot");

const template = [
  "Purchase price",
  "Less-Trade discounts",
  "Less-Subsidies",
  "Carriage inwards",
  "Direct taxes",
  "Non refundable taxes",
  "Installation charges",
  "Expense for test run",
  "Other direct cost",
];

let previousEditedElement = null;
let newRowElement = null;

Field.removeAll();
Field.create();

createBlank.addEventListener("click", () => {
  Field.removeAll();
  Field.create();
});

createTemplate.addEventListener("click", () => {
  Field.removeAll();
  Field.createFromTemplate(template);
});

tableBody.addEventListener("click", (e) => {
  const parentRowId = e.target.dataset.parentRowId;
  const element = document.querySelector(`[data-id="${parentRowId}"]`);
  Field.clearFormat(element);

  if (previousEditedElement?.dataset.id !== parentRowId) {
    Field.format(previousEditedElement);
  }
  previousEditedElement = element;
});

tableFooter.addEventListener("click", () => {
  Field.format(previousEditedElement);
});

tableBody.addEventListener("input", (e) => {
  const value = e.target.value?.trim();
 
  if (value === null) return;

  const parentRowElementId = e.target.dataset.parentRowId;
  const parentRowElement = document.querySelector(
    `[data-id="${parentRowElementId}"]`
  );

  const inputLabel = parentRowElement.querySelector(`input[name="label"]`);
  const inputAmount = parentRowElement.querySelector(`input[name="amount"]`);

  if (!(parentRowElement instanceof HTMLTableRowElement)) return;

  if (value.length) {
    if (!parentRowElement.nextElementSibling) {
      newRowElement = Field.create(parentRowElement);
    }
  } else if (!(inputLabel.value.length || inputAmount.value.length)) {
    if (parentRowElement.nextElementSibling) {
      Field.remove(parentRowElement);
    } else {
      Field.remove(newRowElement);
      newRowElement = null;
    }
  }

  if (e.target.name === "amount" && value !== "-") {
    Field.setAmount(parentRowElementId, value);
  }
});
