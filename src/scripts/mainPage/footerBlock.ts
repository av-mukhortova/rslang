import { dataTeam } from "./team";
import "../../assets/styles/mainPage/footer.scss";

class FooterBlock {
  create(): HTMLElement {
    const container = document.createElement("div") as HTMLElement;
    const teamNames = document.createElement("div") as HTMLElement;

    container.setAttribute("class", "container footer");
    teamNames.setAttribute("class", "footer-team");

    container.innerHTML = `
    <a href="https://github.com/rolling-scopes-school/tasks/blob/master/tasks/stage-2/rs-lang/rslang.md">RS LANG 2022</a>
      <a href="https://rs.school/">
        <img src="https://www.imagehousing.com/images/2022/08/28/rs-school-android.png" alt="rs-school-android.png" border="0" />
      </a>
      `;
    dataTeam.forEach((el) => {
      teamNames.innerHTML += `
        <a href="${el.linkGitHub}">${el.name}</a>
      `;
    });

    container.append(teamNames);
    return container;
  }
}

export default FooterBlock;
