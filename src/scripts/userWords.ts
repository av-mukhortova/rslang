import Api from "./api";
import { iUserWord, justObject } from "../types/index";

class UserWords {
  api: Api;
  userWords: Array<iUserWord>;

  constructor() {
    this.api = new Api();
    this.userWords = [];
  }

  public async getUserWords(): Promise<justObject> {
    return await this.api
      .getUserWords(localStorage.getItem("userId"))
      .then((words: Array<iUserWord>) => {
        const obj: justObject = {};
        // const userWords: Array<iUserWord> = [];
        for (let i = 0; i < words.length; i++) {
          const isLearned = words[i].optional.isLearned;
          const isNew = words[i].optional.isNew;
          const isDifficult = words[i].difficulty === "hard";
          /* words[i].isLearned = isLearned;
          words[i].isNew = isNew;
          userWords.push(words[i]); */
          if (isLearned) obj[words[i].id] = "isLearned";
          else if (isNew) obj[words[i].id] = "isNew";
          else if (isDifficult) obj[words[i].id] = "isDifficult";
        }
        return obj;
      });
  }
  public async addLearnedWord(wordId: string | null, playName = "book") {
    if (wordId)
      this.api.createWord(
        localStorage.getItem("userId"),
        wordId,
        "isLearned",
        playName
      );
  }
  public async addNewWord(wordId: string | null, playName = "book") {
    if (wordId)
      this.api.createWord(
        localStorage.getItem("userId"),
        wordId,
        "isNew",
        playName
      );
  }
  public async addDifficultWord(wordId: string | null, playName = "book") {
    if (wordId)
      this.api.createWord(
        localStorage.getItem("userId"),
        wordId,
        "difficulty",
        playName
      );
  }
}

export default UserWords;
