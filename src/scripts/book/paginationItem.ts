import { justObject } from "../../types/index";
import UserWords from "../userWords";
import GetGroupPage from "./getGroupPage";
// import { iWord } from "../../types/index";

class PaginationItem {
  learnedWords: justObject;
  difficultWords: justObject;
  userWords: UserWords;
  group: string;
  page: number;
  studiKeysBtn: number;
  dificaltKeysBtn: number;
  paginationArr: number[];
  getGroupPage: GetGroupPage;

  constructor(group: string, page: number) {
    this.learnedWords = {};
    this.difficultWords = {};
    this.userWords = new UserWords();
    this.group = group;
    this.page = page;
    this.studiKeysBtn = 0;
    this.dificaltKeysBtn = 0;
    this.paginationArr = [];
    this.getGroupPage = new GetGroupPage();
  }

  async getWordData() {
    const isAuth = localStorage.getItem("userId");
    if (isAuth) {
      this.learnedWords = await this.userWords.getUserWords();
      this.difficultWords = await this.userWords.getDifficultWords();
    }

    for (let i = 0; i <= 29; i++) {
      this.coutnPage(i);
    }
  }

  coutnPage(page: number) {
    this.getGroupPage.getData(this.group, page).then((words) => {
      words.forEach((el, id) => {
        for (const key in this.learnedWords) {
          if (el.id === key) {
            if (this.learnedWords[key] === "isLearned") {
              this.studiKeysBtn += 1;
            }
          }
        }
        for (const key in this.difficultWords) {
          if (el.id === key) {
            this.dificaltKeysBtn += 1;
          }
        }
        if (id === 19) {
          if (this.dificaltKeysBtn == 20 && this.studiKeysBtn == 20) {
            this.studiKeysBtn = 0;
            this.dificaltKeysBtn = 0;
            this.paginationArr.push(12);
          } else if (this.dificaltKeysBtn == 20) {
            this.studiKeysBtn = 0;
            this.dificaltKeysBtn = 0;
            this.paginationArr.push(2);
          } else if (this.studiKeysBtn == 20) {
            this.studiKeysBtn = 0;
            this.dificaltKeysBtn = 0;
            this.paginationArr.push(1);
          } else {
            this.studiKeysBtn = 0;
            this.dificaltKeysBtn = 0;
            this.paginationArr.push(0);
          }
        }
        if (this.paginationArr.length === 30) {
          this.create();
        }
      });
    });
  }

  create(): HTMLElement {
    const pagination = document.querySelector(".pagination") as HTMLDivElement;
    pagination.innerHTML = "";

    for (let num = 0; num <= 29; num++) {
      if (this.paginationArr[num] === 1) {
        pagination.innerHTML += `
          <button class="pagination-btn pagination-btn-studi"  id="paginnateBtn-${num}">${
          num + 1
        }</button>
        `;
      } else if (this.paginationArr[num] === 2) {
        pagination.innerHTML += `
          <button class="pagination-btn pagination-btn-dif"  id="paginnateBtn-${num}" style="border = ""; background-color = "" ">${
          num + 1
        }</button>
        `;
      } else if (this.paginationArr[num] === 12) {
        pagination.innerHTML += `
        <button class="pagination-btn pagination-btn-all "  id="paginnateBtn-${num}" >${
          num + 1
        }</button>
        `;
      } else {
        pagination.innerHTML += `
          <button class="pagination-btn" id="paginnateBtn-${num}" style="border = ""; background-color = "" ">${
          num + 1
        }</button>
        `;
      }
    }
    return pagination;
  }
}

export default PaginationItem;
