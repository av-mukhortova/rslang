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

  constructor(group: string, page: number) {
    this.learnedWords = {};
    this.difficultWords = {};
    this.userWords = new UserWords();
    this.group = group;
    this.page = page;
    this.studiKeysBtn = 0;
    this.dificaltKeysBtn = 0;
  }

  async getWordData(page: number): Promise<string> {
    const isAuth = localStorage.getItem("userId");
    if (isAuth) {
      this.learnedWords = await this.userWords.getUserWords();
      this.difficultWords = await this.userWords.getDifficultWords();
    }

    const getGroupPage = new GetGroupPage();
    getGroupPage.getData(this.group, page).then((words) => {
      words.forEach((el) => {
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
      });
      return this.create(page);
    });
    return "";
  }

  create(num: number): string {
    let studiDificaltKeys = "";

    studiDificaltKeys =
      this.studiKeysBtn === 20 && this.dificaltKeysBtn === 20 ? "yes" : "none";

    if (studiDificaltKeys === "yes") {
      this.studiKeysBtn = 0;
      this.dificaltKeysBtn = 0;
      return `
        <button class="pagination-btn pagination-btn-all "  id="paginnateBtn-${num}" >${num}</button>
      `;
    } else if (this.studiKeysBtn === 20) {
      this.studiKeysBtn = 0;
      this.dificaltKeysBtn = 0;
      return `
        <button class="pagination-btn pagination-btn-studi"  id="paginnateBtn-${num}">${num}</button>
      `;
    } else if (this.dificaltKeysBtn === 20) {
      this.studiKeysBtn = 0;
      this.dificaltKeysBtn = 0;
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
