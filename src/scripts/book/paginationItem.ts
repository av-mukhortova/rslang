class PaginationItem {
  create(num: number): string {
    return `
      <button id="paginnateBtn-${num}">${num}</button>
    `;
  }
}

export default PaginationItem;
