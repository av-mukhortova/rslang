class GameLink {
  studiKeys: string | null;
  studiKeysLength: number;

  constructor() {
    this.studiKeys = localStorage.getItem("studi");
    this.studiKeysLength = 0;
  }
  creat(game: boolean, name: string, img: string, id: string) {
    if (!game) {
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
