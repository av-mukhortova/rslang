import Header from "./header";
import Menu from "./menu";
import Authorization from "./authorization/authorization";
import StudiBlockDiv from "./studiBlockDiv";
import StatisticsText from "./statisticsText";
import VideoReport from "./videoReport";
import Team from "./team";
import FooterBlock from "./footerBlock";

class Main {
  header: Header;
  menu: Menu;
  authorization: Authorization;
  constructor() {
    this.header = new Header();
    this.menu = new Menu();
    this.authorization = new Authorization();
  }
  start() {
    const body = document.querySelector("body") as HTMLElement;
    body.prepend(this.header.start());

    const header = new Header();
    const studiBlockDiv = new StudiBlockDiv();
    const statisticsText = new StatisticsText();
    const videoReportBlock = new VideoReport();
    const team = new Team();
    const footerBlock = new FooterBlock();

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
        this.menu.create();
      }
    });

    const headerauthorization = document.querySelector(
      ".header__authorization"
    ) as HTMLElement;
    headerauthorization?.addEventListener("click", () => {
      if (!headerauthorization.classList.contains("isAuth")) {
        this.authorization.create(this);
        const signupButton = document.querySelector(
          ".signup_button"
        ) as HTMLButtonElement;
        if (signupButton) {
          signupButton.style.display = "block";
        } else {
          this.authorization.create(this);
        }
      } else {
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        const auth: HTMLDivElement | null = document.querySelector(
          ".header__authorization"
        );
        if (auth) {
          const img: HTMLImageElement | null = document.querySelector(
            ".header__authorization img"
          );
          auth.classList.remove("isAuth");
          if (img) {
            img.src =
              "https://www.imagehousing.com/images/2022/08/27/avatar.png";
          }
        }
      }
    });
  }
  public auth(userName: string) {
    const auth: HTMLDivElement | null = document.querySelector(
      ".header__authorization"
    );
    if (auth) {
      const img: HTMLImageElement | null = document.querySelector(
        ".header__authorization img"
      );
      auth.classList.add("isAuth");
      if (img) {
        img.src = "./assets/img/logout.png";
      }
      console.log(userName);
    }
  }
}

export default Main;
