import Header from "./header";
import Menu from "./menu";
import Authorization from "./authorization/authorization";
import StudiBlockDiv from "./studiBlockDiv";
import StatisticsText from "./statisticsText";
import VideoReport from "./videoReport";
import Team from "./team";
import FooterBlock from "./footerBlock";

class Main {
  start() {
    const header = new Header();
    const menu = new Menu();
    const authorization = new Authorization();
    const studiBlockDiv = new StudiBlockDiv();
    const statisticsText = new StatisticsText();
    const videoReportBlock = new VideoReport();
    const team = new Team();
    const footerBlock = new FooterBlock();

    const body = document.querySelector("body") as HTMLElement;
    const herro = document.createElement("section") as HTMLElement;
    const studiBlock = document.createElement("section") as HTMLElement;
    const statisticsBlock = document.createElement("section") as HTMLElement;
    const videoReport = document.createElement("section") as HTMLElement;
    const teamSection = document.createElement("section") as HTMLElement;
    const footer = document.createElement("footer") as HTMLElement;

    herro.setAttribute("class", "herro");
    studiBlock.setAttribute("class", "main__studi-block");
    statisticsBlock.setAttribute("class", "main__statistics-block");
    videoReport.setAttribute("class", "main__video");

    studiBlock.append(studiBlockDiv.create());
    statisticsBlock.append(statisticsText.create());
    videoReport.append(videoReportBlock.create());
    teamSection.append(team.create());
    footer.append(footerBlock.create());

    body.prepend(header.start());
    body.append(herro);
    body.append(studiBlock);
    body.append(statisticsBlock);
    body.append(videoReport);
    body.append(teamSection);
    body.append(footer);

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
