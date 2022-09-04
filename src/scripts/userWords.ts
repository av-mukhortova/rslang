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
        for (let i = 0; i < words.length; i++) {
          const isLearned = words[i].optional.isLearned;
          const isNew = words[i].optional.isNew;
          if (isLearned) obj[words[i].wordId] = "isLearned";
          else if (isNew) obj[words[i].wordId] = "isNew";
        }
        return obj;
      });
  }
  public async getDifficultWords(): Promise<justObject> {
    return await this.api
      .getUserWords(localStorage.getItem("userId"))
      .then((words: Array<iUserWord>) => {
        const obj: justObject = {};
        for (let i = 0; i < words.length; i++) {
          const isDifficult = words[i].difficulty === "hard";
          if (isDifficult) obj[words[i].wordId] = "isDifficult";
        }
        return obj;
      });
  }
  public async getUserWordsLikeArray(): Promise<iUserWord[]> {
    return await this.api
      .getUserWords(localStorage.getItem("userId"))
      .then((words: Array<iUserWord>) => {
        const userWords: Array<iUserWord> = [];
        for (let i = 0; i < words.length; i++) {
          words[i].isLearned = words[i].optional.isLearned;
          words[i].isNew = words[i].optional.isNew;
          words[i].date = words[i].optional.date;
          words[i].playName = words[i].optional.playName;
          userWords.push(words[i]);
        }
        return userWords;
      });
  }
  public async getUserWordsInProgress(): Promise<justObject> {
    return await this.api
      .getUserWords(localStorage.getItem("userId"))
      .then((words: Array<iUserWord>) => {
        const obj: justObject = {};
        for (let i = 0; i < words.length; i++) {
          const isNew = words[i].optional.isNew;
          if (isNew)
            obj[words[i].wordId] = words[i].optional.inProgress.toString();
        }
        return obj;
      });
  }
  public async addLearnedWord(wordId: string | null, playName = "book") {
    if (wordId)
      this.api
        .getUserWordById(localStorage.getItem("userId"), wordId)
        .then((res: iUserWord | null) => {
          if (res) {
            this.api.updateWord(
              localStorage.getItem("userId"),
              wordId,
              res.difficulty === "hard",
              "isLearned",
              playName
            );
          } else {
            this.api.createWord(
              localStorage.getItem("userId"),
              wordId,
              false,
              "isLearned",
              playName
            );
          }
        });
  }
  public async addNewWord(wordId: string | null, playName = "book") {
    if (wordId)
      this.api
        .getUserWordById(localStorage.getItem("userId"), wordId)
        .then((res: iUserWord | null) => {
          if (res) {
            this.api.updateWord(
              localStorage.getItem("userId"),
              wordId,
              res.difficulty === "hard",
              "isNew",
              playName
            );
          } else {
            this.api.createWord(
              localStorage.getItem("userId"),
              wordId,
              false,
              "isNew",
              playName
            );
          }
        });
  }
  public async addDifficultWord(wordId: string | null, playName = "book") {
    if (wordId)
      this.api
        .getUserWordById(localStorage.getItem("userId"), wordId)
        .then((res: iUserWord | null) => {
          if (res) {
            this.api.updateWord(
              localStorage.getItem("userId"),
              wordId,
              true,
              res.optional.isLearned === true
                ? "isLearned"
                : res.optional.isNew
                ? "isNew"
                : "",
              playName,
              res.optional.inProgress
            );
          } else {
            this.api.createWord(
              localStorage.getItem("userId"),
              wordId,
              true,
              "isNew",
              playName,
              0
            );
          }
        });
  }
  public addProgress(
    wordId: string,
    isCorrect: boolean,
    playName: string
  ): void {
    this.api
      .getUserWordById(localStorage.getItem("userId"), wordId)
      .then((res: iUserWord | null) => {
        if (res) {
          const isLearned = res.optional.isLearned;
          const progress = +res.optional.inProgress;
          if (isCorrect) {
            if (!isLearned) {
              if (progress === 2) {
                this.api.updateWord(
                  localStorage.getItem("userId"),
                  wordId,
                  res.difficulty === "hard",
                  "isLearned",
                  playName,
                  0
                );
              } else {
                this.api.updateWord(
                  localStorage.getItem("userId"),
                  wordId,
                  res.difficulty === "hard",
                  "isNew",
                  playName,
                  progress + 1
                );
              }
            }
          } else if (isLearned && !isCorrect) {
            this.api.updateWord(
              localStorage.getItem("userId"),
              wordId,
              res.difficulty === "hard",
              "isNew",
              playName,
              0
            );
          }
        } else if (isCorrect) {
          this.api.createWord(
            localStorage.getItem("userId"),
            wordId,
            false,
            "isNew",
            playName,
            1
          );
        }
      });
  }
}

export default UserWords;
