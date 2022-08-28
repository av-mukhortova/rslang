import Header from "./header";
import Menu from "./menu";
import Authorization from "./authorization/authorization";
import StudiBlockDiv from "./studiBlockDiv";
import StatisticsText from "./statisticsText";

class Main {
  start() {
    const header = new Header();
    const menu = new Menu();
    const authorization = new Authorization();
    const studiBlockDiv = new StudiBlockDiv();
    const statisticsText = new StatisticsText();

    const body = document.querySelector("body") as HTMLElement;
    const herro = document.createElement("section") as HTMLElement;
    const studiBlock = document.createElement("section") as HTMLElement;
    const statisticsBlock = document.createElement("section") as HTMLElement;

    herro.setAttribute("class", "herro");
    studiBlock.setAttribute("class", "main__studi-block");
    statisticsBlock.setAttribute("class", "main__statistics-block");

    studiBlock.append(studiBlockDiv.create());
    statisticsBlock.append(statisticsText.create());

    body.prepend(header.start());
    body.append(herro);
    body.append(studiBlock);
    body.append(statisticsBlock);

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
