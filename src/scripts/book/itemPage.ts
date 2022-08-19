import { iWord } from "../../types/index";

class ItemPage {
  create(words: Promise<iWord[]>) {
    console.log(words);
  }
}

export default ItemPage;
