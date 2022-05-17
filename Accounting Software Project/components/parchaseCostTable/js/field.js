// Field singleton
const Field = (() => {
  let amounts = {};
  const fields = [];

  const totalCost = document.getElementById("total-cost");
  const tableBody = document.querySelector(".cost-table tbody");
  const rowTemplate = document.querySelector(".cost-table .row-template");

  let i = 0;

  const nf = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "LKR",
    maximumFractionDigits: 2,
    roundingIncrement: 5,
    currencySign: "accounting",
  });

  function numberFormat(number) {
    return nf.format(number);
  }

  function calculateTotal() {
    totalCost.textContent = numberFormat(
      Object.values(amounts).reduce((a, b) => a + b, 0)
    );
  }

  function create(elementBefore = null) {
    const rowClone = rowTemplate.cloneNode(true);
    const id = `tr-${i}`;

    rowClone.removeAttribute("class");
    rowClone.dataset.id = id;
    rowClone.dataset.formatted = "false";

    rowClone.querySelectorAll("input").forEach((element) => {
      element.dataset.parentRowId = id;
    });

    rowClone.querySelectorAll("tr td").forEach((element) => {
      element.dataset.parentRowId = id;
    });

    if (elementBefore instanceof HTMLTableRowElement) {
      elementBefore.insertAdjacentElement("afterend", rowClone);
    } else tableBody.append(rowClone);

    fields.push(rowClone);
    i++;

    return rowClone;
  }

  function createFromTemplate(template) {
    for (let item of template) {
      const rowClone = create();
      const inputLabel = rowClone.querySelector('input[name="label"]');
      inputLabel.value = item;
    }
  }

  function remove(element) {
    if (!(element instanceof HTMLTableRowElement)) return;
    const id = element.dataset.id;
    element.remove();
    delete amounts[id];
    calculateTotal();
  }

  function removeAll() {
    for (let field of fields) {
      field.remove();
    }
    amounts = {};
    calculateTotal();
  }

  function format(element) {
    if (!(element instanceof HTMLTableRowElement)) return;
    if (element.dataset.formatted === "true") return;

    const id = element.dataset.id;
    const inputLabel = element.querySelector('input[name="label"]');
    const inputAmount = element.querySelector('input[name="amount"]');

    const label = inputLabel.value.trim();
    let amount = inputAmount.value.trim();

    if (!(label?.length && amount?.length)) return;

    const regexLabel = /(^-\w|Less-[a-z])/gi;
    const regexAmount = /^-\w/g;

    let newLabel = label;
    let currencyValueFloat = parseFloat(amount);

    const regexTestLabel = regexLabel.test(newLabel);
    const regexTestLabelForLess = /Less-[a-z]/gi.test(newLabel);
    const regexTestAmount = regexAmount.test(amount);

    //? formatting the fields

    if (regexTestLabelForLess) {
      newLabel = newLabel[0].toUpperCase() + newLabel.slice(1);
    }

    if (regexTestLabel && !regexTestLabelForLess) {
      newLabel = "Less" + newLabel;
    }

    if (regexTestLabel && !regexTestAmount) {
      currencyValueFloat *= -1;
      amount = "-" + amount;
    }

    if (regexTestAmount && !regexTestLabel) newLabel = "Less-" + newLabel;

    //?

    amounts[id] = currencyValueFloat;
    calculateTotal();

    inputLabel.dataset.oldValue = label;
    inputLabel.value = newLabel;

    inputAmount.type = "text";
    inputAmount.dataset.realValue = amount;
    inputAmount.value = numberFormat(currencyValueFloat);

    element.dataset.formatted = "true";
  }

  function clearFormat(element) {
    if (!(element instanceof HTMLTableRowElement)) return;
    if (element.dataset.formatted === "false") return;

    const inputLabel = element.querySelector('input[name="label"]');
    const inputAmount = element.querySelector('input[name="amount"]');

    const labelOld = inputLabel.dataset.oldValue;
    const amountOld = inputAmount.dataset.realValue;

    if (!(labelOld?.length && amountOld?.length)) return;

    inputLabel.value = labelOld;
    inputAmount.value = amountOld;
    inputAmount.type = "number";

    element.dataset.formatted = "false";
  }

  function setAmount(id, value) {
    if (!id && value === null) return;
    if (!value.length) value = 0;
    amounts[id] = parseFloat(value);
    calculateTotal();
  }

  return {
    create,
    createFromTemplate,
    remove,
    removeAll,
    format,
    clearFormat,
    setAmount,
  };
})();
