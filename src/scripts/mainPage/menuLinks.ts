class MenuLinks {
  create(
    linkPage: string,
    linkimg: string,
    alt: string,
    text: string,
    key: string
  ): string {
    return `
      <div id="${key}">
        <a href="${linkPage}">
          <img src="${linkimg}" alt="${alt}"/>
          ${text}
        </a>
      </div>
    `;
  }
}

export default MenuLinks;
