const btnTip = document.getElementById("btn-tip");
const tipContainer = document.getElementById("tip-container");

const colorPalette = ["#C2E7D9", "#CDC7E5", "#E0E0E2", "#FFCAB1", "#EA638C"];
const tips = tipContainer.querySelectorAll(".tip");

let isClicked = false;
let tipElement = null;
let currentTip = 0;

btnTip.addEventListener("mouseenter", () => {
  tipElement = tips[currentTip];

  tipElement.style.background =
    colorPalette[Math.round(Math.random() * 10) % colorPalette.length];
  tipElement.style.right = -30 + "px";
});

btnTip.addEventListener("mouseleave", () => {
  if (!tipElement) return;
  tipElement.style.right = 0 + "px";
});

btnTip.addEventListener("click", () => {
  if (isClicked) return;
  const tipElmCpy = tipElement;
  tipElmCpy.style.right = -330 + "px";

  tipElement = null;
  isClicked = true;
  isTimeOutOver = false;

  currentTip = +!currentTip; //? only temporarily, because currently has only two tips

  setTimeout(() => {
    isClicked = false;
    tipElmCpy.style.right = 0 + "px";
  }, 6000);
});
