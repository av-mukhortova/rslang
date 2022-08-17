import constants from "../constants";

export default class Api {
  public async getWords(group: string, page: string): Promise<Response> {
    const res = await fetch(
      `${constants.URL}/words?group=${group}&page=${page}`,
      {
        method: "GET",
      }
    );
    const words = await res.json();
    return words;
  }
}
