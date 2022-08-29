import Header from "./header";
import StudiBlockDiv from "./studiBlockDiv";
import StatisticsText from "./statisticsText";
import VideoReport from "./videoReport";
import Team from "./team";
import FooterBlock from "./footerBlock";

class Main {
  header: Header;
  constructor() {
    this.header = new Header();
  }
  start() {
    const header = new Header();
    const studiBlockDiv = new StudiBlockDiv();
    const statisticsText = new StatisticsText();
    const videoReportBlock = new VideoReport();
    const team = new Team();
    const footerBlock = new FooterBlock();

    const main = document.querySelector(".mainPage") as HTMLElement;
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

    header.start();
    main.append(herro);
    main.append(studiBlock);
    main.append(statisticsBlock);
    main.append(videoReport);
    main.append(teamSection);
    main.append(footer);
  }
}

export default Main;
