class GameLink {
  studiKeys: string | null;
  studiKeysLength: number;

  constructor() {
    this.studiKeys = localStorage.getItem("studi");
    this.studiKeysLength = 0;
  }
  creat(
    link: string,
    name: string,
    group: number,
    page: number,
    img: string,
    id: string
  ) {
    if (this.studiKeys) {
      const studiKeys = JSON.parse(this.studiKeys);
      if (studiKeys[group]) {
        if (studiKeys[group][page]) {
          this.studiKeysLength = studiKeys[group][page]["key"].length;
        }
      }
    }
    if (this.studiKeysLength === 20) {
      return `
        <div class="game" style="background-image: url(${img});">
          <div class="game-none"></div>
          <p>${name}</p>
        </div>
      `;
    } else {
      return `
        <div id="${id}" class="game" style="background-image: url(${img});">
          <p>${name}</p>
        </div>
      `;
    }
  }
}

export default GameLink;
