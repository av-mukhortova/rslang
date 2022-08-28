import Header from "./header";
import Menu from "./menu";

class Main {
  start() {
    const header = new Header();
    const menu = new Menu();

    const body = document.querySelector("body") as HTMLElement;
    body.prepend(header.start());

    const menuBurger = document.querySelector(".header__burger");
    menuBurger?.addEventListener("click", () => {
      const menuSection = document.querySelector(".menu") as HTMLElement;
      if (menuSection) {
        menuSection.style.display = "block";
      } else {
        menu.create();
      }
    });
  }
}

export default Main;
