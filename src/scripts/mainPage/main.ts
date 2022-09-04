import Header from "./header";
import StudiBlockDiv from "./studiBlockDiv";
import StatisticsText from "./statisticsText";
// import VideoReport from "./videoReport";
import Team from "./team";
import FooterBlock from "./footerBlock";
import Menu from "./menu";

class Main {
  header: Header;
  constructor() {
    this.header = new Header();
  }
  start() {
    const header = new Header();
    const studiBlockDiv = new StudiBlockDiv();
    const statisticsText = new StatisticsText();
    // const videoReportBlock = new VideoReport();
    const team = new Team();
    const footerBlock = new FooterBlock();

    const body = document.querySelector("body") as HTMLElement;
    const main = document.querySelector(".mainPage") as HTMLElement;
    const herro = document.createElement("section") as HTMLElement;
    const studiBlock = document.createElement("section") as HTMLElement;
    const statisticsBlock = document.createElement("section") as HTMLElement;
    // const videoReport = document.createElement("section") as HTMLElement;
    const teamSection = document.createElement("section") as HTMLElement;
    const footer = document.querySelector("footer") as HTMLElement;

    herro.setAttribute("class", "herro");
    studiBlock.setAttribute("class", "main__studi-block");
    statisticsBlock.setAttribute("class", "main__statistics-block");
    // videoReport.setAttribute("class", "main__video");

    studiBlock.append(studiBlockDiv.create());
    statisticsBlock.append(statisticsText.create());
    // videoReport.append(videoReportBlock.create());
    teamSection.append(team.create());
    footer.append(footerBlock.create());

    header.start();
    main.append(herro);
    main.append(studiBlock);
    main.append(statisticsBlock);
    // main.append(videoReport);
    main.append(teamSection);
    body.append(footer);

    studiBlock.addEventListener("click", (e: MouseEvent) => {
      const menu = new Menu();
      const target: HTMLElement = e.target as HTMLElement;
      const parent: HTMLElement = target.parentNode as HTMLElement;
      const id = target.id ? target.id : parent.id;
      console.log(id);
      menu.toLink(id);
    });

    body.addEventListener("click", () => {
      const menuClass = document.querySelector(".menu") as HTMLElement;

      if (menuClass && menuClass.classList.contains("active")) {
        menuClass.style.display = "none";
        menuClass.classList.remove("active");
      } else if (menuClass) {
        menuClass.classList.add("active");
      }
    });
  }
}

export default Main;
