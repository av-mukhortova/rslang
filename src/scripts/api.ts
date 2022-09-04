import constants from "../constants";
import {
  iAuthResp,
  iUser,
  iWord,
  iStatistics,
  iUserWord,
} from "../types/index";

export default class Api {
  public async getWords(group: string, page: string): Promise<iWord[]> {
    const res = await fetch(
      `${constants.URL}/words?group=${group}&page=${page}`,
      {
        method: "GET",
      }
    );
    const words = await res.json();
    const arr: Array<iWord> = [];
    for (const key in words) {
      arr.push(words[key]);
    }
    return arr;
  }
  public async getWordId(id: string): Promise<iWord> {
    const res = await fetch(`${constants.URL}/words/${id}`, {
      method: "GET",
    });
    const words = await res.json();
    return words;
  }
  public async takeStatistic(
    userUid: string | null
  ): Promise<iStatistics | null> {
    const res = await fetch(`${constants.URL}/users/${userUid}/statistics`, {
      method: "GET",

      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const words = await res.json();
      return words;
    } else if (res.status === 401) {
      this.refreshToken(userUid).then(() => this.takeStatistic(userUid));
    }
    return null;
  }
  public async transferData(userUid: string | null, datas: iStatistics) {
    const info = await fetch(`${constants.URL}/users/${userUid}/statistics`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datas),
    });
    if (info.ok) {
      const result = await info.json();
      return result;
    } else if (info.status === 401) {
      this.refreshToken(userUid).then(() => this.transferData(userUid, datas));
    }
  }
  public async createUser(user: iUser): Promise<string> {
    const res = await fetch(`${constants.URL}/users`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    let msg = "";
    if (res.ok) {
      msg = "Успешно!";
    } else if (res.status === 422) {
      msg = "Неверный e-mail или пароль!";
    } else if (res.status === 417) {
      msg = "Такой пользователь уже зарегестрирован!";
    }
    return msg;
  }
  public async signIn(user: iUser): Promise<iAuthResp> {
    const res = await fetch(`${constants.URL}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    let msg = "";
    if (res.ok) {
      const content = await res.json();
      return content;
    } else if (res.status === 403) {
      msg = "Неверный e-mail или пароль!";
    }
    const resp: iAuthResp = {
      message: msg,
      token: "",
      refreshToken: "",
      userId: "",
      name: "",
    };
    return resp;
  }
  public async refreshToken(userId: string | null): Promise<iAuthResp | null> {
    const res = await fetch(`${constants.URL}/users/${userId}/tokens`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const content = await res.json();
      localStorage.setItem("token", content.token);
      localStorage.setItem("refreshToken", content.refreshToken);
      return content;
    }
    return null;
  }
  public async createWord(
    userId: string | null,
    wordId: string | null,
    difficulty: boolean,
    type: string | null,
    playName: string | null,
    inProgress = 0,
    errors = 0
  ): Promise<boolean> {
    const now = new Date();
    const date = now.getDate() + "." + now.getMonth();
    const body = {
      difficulty: difficulty ? "hard" : "easy",
      optional: {
        isLearned: type === "isLearned",
        isNew: type === "isNew",
        playName: playName,
        date: date,
        inProgress: inProgress,
        errors: errors,
      },
    };
    const res = await fetch(
      `${constants.URL}/users/${userId}/words/${wordId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    if (res.ok) {
      return true;
    } else if (res.status === 401) {
      this.refreshToken(userId).then(() =>
        this.createWord(
          userId,
          wordId,
          difficulty,
          type,
          playName,
          inProgress,
          errors
        )
      );
    } else if (res.status == 417) {
      this.updateWord(
        userId,
        wordId,
        difficulty,
        type,
        playName,
        inProgress,
        errors
      );
    }
    return false;
  }
  public async updateWord(
    userId: string | null,
    wordId: string | null,
    difficulty: boolean,
    type: string | null,
    playName: string | null,
    inProgress = 0,
    errors = 0
  ): Promise<boolean> {
    const now = new Date();
    const date = now.getDate() + "." + now.getMonth();
    const body = {
      difficulty: difficulty ? "hard" : "easy",
      optional: {
        isLearned: type === "isLearned",
        isNew: type === "isNew",
        playName: playName,
        date: date,
        inProgress: inProgress,
        errors: errors,
      },
    };
    const res = await fetch(
      `${constants.URL}/users/${userId}/words/${wordId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    if (res.ok) {
      return true;
    } else if (res.status === 401) {
      this.refreshToken(userId).then(() =>
        this.updateWord(
          userId,
          wordId,
          difficulty,
          type,
          playName,
          inProgress,
          errors
        )
      );
    }
    return false;
  }
  public async getUserWords(userId: string | null): Promise<iUserWord[]> {
    const arr: Array<iUserWord> = [];
    const res = await fetch(`${constants.URL}/users/${userId}/words`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const words = await res.json();
      for (const key in words) {
        arr.push(words[key]);
      }
    } else if (res.status === 401) {
      this.refreshToken(userId).then(() => this.getUserWords(userId));
    }
    return arr;
  }
  public async getUserWordsDifSt(userId: string | null): Promise<string[]> {
    const res = await fetch(`${constants.URL}/users/${userId}/words`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const words = await res.json();
      return words;
    } else if (res.status === 401) {
      this.refreshToken(userId).then(() => this.getUserWordsDifSt(userId));
    }
    return [];
  }
  public async getUserWordById(
    userId: string | null,
    wordId: string | null
  ): Promise<iUserWord | null> {
    const res = await fetch(
      `${constants.URL}/users/${userId}/words/${wordId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    if (res.ok) {
      const word = await res.json();
      return word;
    } else if (res.status === 401) {
      this.refreshToken(userId).then(() =>
        this.getUserWordById(userId, wordId)
      );
    }
    return null;
  }
  public async removeUserWordById(
    userId: string | null,
    wordId: string | null
  ) {
    await fetch(`${constants.URL}/users/${userId}/words/${wordId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }
}
