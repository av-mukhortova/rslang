import Header from "./header";
import Menu from "./menu";
import Authorization from "./authorization/authorization";
import StudiBlockDiv from "./studiBlockDiv";

class Main {
  start() {
    const header = new Header();
    const menu = new Menu();
    const authorization = new Authorization();
    const studiBlockDiv = new StudiBlockDiv();

    const body = document.querySelector("body") as HTMLElement;
    const herro = document.createElement("section") as HTMLElement;
    const studiBlock = document.createElement("section") as HTMLElement;

    herro.setAttribute("class", "herro");
    studiBlock.setAttribute("class", "main__studi-block");

    studiBlock.append(studiBlockDiv.create());

    body.prepend(header.start());
    body.append(herro);
    body.append(studiBlock);

    const menuBurger = document.querySelector(".header__burger");
    menuBurger?.addEventListener("click", () => {
      const menuSection = document.querySelector(".menu") as HTMLElement;
      if (menuSection) {
        menuSection.style.display = "block";
      } else {
        menu.create();
      }
    });

    const headerauthorization = document.querySelector(
      ".header__authorization"
    ) as HTMLElement;
    headerauthorization?.addEventListener("click", () => {
      authorization.create();
      const signupButton = document.querySelector(
        ".signup_button"
      ) as HTMLButtonElement;
      if (signupButton) {
        signupButton.style.display = "block";
      } else {
        authorization.create();
      }
    });
  }
}

export default Main;
