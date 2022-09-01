class PaginationItem {
  studiKeys: string | null;
  dificaltKeys: string | null;
  group: string;
  page: number;
  studiKeysBtn: string;
  dificaltKeysBtn: string;

  constructor(group: string, page: number) {
    this.studiKeys = localStorage.getItem("studi");
    this.dificaltKeys = localStorage.getItem("cardDifficults");
    this.group = group;
    this.page = page;
    this.studiKeysBtn = "none";
    this.dificaltKeysBtn = "none";
  }
  create(num: number): string {
    const numPage = num - 1;
    let studiDificaltKeys = "";

    if (this.studiKeys) {
      const studiKeys = JSON.parse(this.studiKeys);
      if (studiKeys[this.group]) {
        if (studiKeys[this.group][numPage]) {
          if (studiKeys[this.group][numPage].key.length === 20) {
            this.studiKeysBtn = "yes";
          } else {
            this.studiKeysBtn = "none";
          }
        } else {
          this.studiKeysBtn = "none";
        }
      }
    }

    if (this.dificaltKeys) {
      const dificaltKeys = JSON.parse(this.dificaltKeys);
      if (dificaltKeys[this.group]) {
        if (dificaltKeys[this.group][numPage]) {
          if (dificaltKeys[this.group][numPage].key.length === 20) {
            this.dificaltKeysBtn = "yes";
          } else {
            this.dificaltKeysBtn = "none";
          }
        } else {
          this.dificaltKeysBtn = "none";
        }
      }
    }

    studiDificaltKeys =
      this.studiKeysBtn === "yes" && this.dificaltKeysBtn === "yes"
        ? "yes"
        : "none";

    if (studiDificaltKeys === "yes") {
      return `
        <button class="pagination-btn pagination-btn-all "  id="paginnateBtn-${num}" >${num}</button>
      `;
    } else if (this.studiKeysBtn === "yes") {
      return `
        <button class="pagination-btn pagination-btn-studi"  id="paginnateBtn-${num}">${num}</button>
      `;
    } else if (this.dificaltKeysBtn === "yes") {
      return `
        <button class="pagination-btn pagination-btn-dif"  id="paginnateBtn-${num}" style="border = ""; background-color = "" ">${num}</button>
      `;
    } else {
      return `
        <button class="pagination-btn" id="paginnateBtn-${num}" style="border = ""; background-color = "" ">${num}</button>
      `;
    }
  }
}

export default PaginationItem;
