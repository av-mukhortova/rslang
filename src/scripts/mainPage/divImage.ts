class DivImage {
  create(link: string, classes: string, texts: string): string {
    return `
    <div class="${classes}">
      <img src="${link}" alt="${texts}"/>
    </div>
    `;
  }
}

export default DivImage;
