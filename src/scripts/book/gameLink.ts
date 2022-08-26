class GameLink {
  creat(link: string, name: string) {
    return `
      <div class="game">
        <a href="${link}" target="_blank" rel="noopener noreferrer">${name}</a>
      </div>
    `;
  }
}

export default GameLink;
