import "../../assets/styles/mainPage/team.scss";
export const dataTeam = [
  {
    img: "./assets/img/alina.jpg",
    linkGitHub: "https://github.com/rrroeva",
    name: "Alina",
    secondname: "Mukhortova",
    spatial: `Team lead, Frontent developer`,
    work1: "Авторизация",
    work2: "Спринт",
    work3: "Прогресс изучения, изученные слова",
    id: "alina",
  },
  {
    img: "https://www.imagehousing.com/images/2022/08/28/photo_2022-02-22_12-38-14.jpg",
    linkGitHub: "https://github.com/AlexGradus",
    name: "Aliaksandr",
    secondname: "Sakalouski",
    spatial: `Frontent developer`,
    work1: "Аудиовызов",
    work2: "Статистика",
    work3: "",
    id: "aliaksandr",
  },
  {
    img: "https://www.imagehousing.com/images/2022/08/28/photo_2022-02-22_12-38-14.jpg",
    linkGitHub: "https://github.com/alimbaeva",
    name: "Asel",
    secondname: "Alymbaeva",
    spatial: `Frontent developer, Designer`,
    work1: "Электронный учебник",
    work2: "Список слов",
    work3: "Главная страница",
    id: "asel",
  },
];

class Team {
  create(): HTMLElement {
    const team = document.createElement("div") as HTMLElement;
    const teamBlock = document.createElement("div") as HTMLElement;
    const title = document.createElement("h2") as HTMLElement;

    title.textContent = "Наша команда №133";
    team.setAttribute("class", "container main__team");
    teamBlock.setAttribute("class", "main__team-block");

    dataTeam.forEach((el) => {
      teamBlock.innerHTML += `
        <div class="main__team-item">
          <div class="img" style="background-image: url(${el.img});"></div>
          <div class="main__team-info">
            <h3>${el.name} ${el.secondname}</h3>
            <p>${el.spatial}</p>
            <p>${el.work1}</p>
            <p>${el.work2}</p>
            <p>${el.work3}</p>
            <a href="${el.linkGitHub}"><img src="https://www.imagehousing.com/images/2022/08/28/github_git_icon_145985.png" alt="github_git"></a>
          </div>
        </div>
      `;
    });

    team.append(title);
    team.append(teamBlock);
    return team;
  }
}

export default Team;
