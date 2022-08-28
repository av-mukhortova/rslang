class MenuLinks {
  create(linkPage: string, linkimg: string, alt: string, text: string): string {
    return `
      <div>
        <a href="${linkPage}">
          <img src="${linkimg}" alt="${alt}"/>
          ${text}
        </a>
      </div>
    `;
  }
}

export default MenuLinks;
