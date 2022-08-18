import constants from "../constants";
import { iWord } from "../types/index";

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
}
