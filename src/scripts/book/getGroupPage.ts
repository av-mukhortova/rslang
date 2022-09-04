import Api from "../api";

class GetGroupPage {
  async getData(group: string, page: number) {
    const api = new Api();
    const words = await api.getWords(group, `${page - 1}`);
    return words;
  }
}

export default GetGroupPage;
