const NAV = document.querySelector("#nav");
const OPEN_MENU = document.querySelector("#open");
const CLOSE_MENU = document.querySelector("#close");

OPEN_MENU.addEventListener("click", () => {
    NAV.classList.add("visible");
})

CLOSE_MENU.addEventListener("click", () => {
    NAV.classList.remove("visible");
})