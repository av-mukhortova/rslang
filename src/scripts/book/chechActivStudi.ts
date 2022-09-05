import UserWords from "../userWords";
import CheckUserWord from "../checkUserWord/checkUserWord";
class ChechActivStudi {
  userWords: UserWords;
  constructor() {
    this.userWords = new UserWords();
  }
  check(card: HTMLElement, cardStudiBtn: HTMLElement) {
    cardStudiBtn.classList.toggle("activ");
    if (cardStudiBtn.classList.contains("activ")) {
      card.style.border = "6px solid #43DE1C";
      this.userWords.addLearnedWord(card.id);
    } else {
      const checkUserWord = new CheckUserWord();
      checkUserWord.checkStudi(card.id);
      card.style.border = "";
      this.userWords.addNewWord(card.id);
    }
  }
}

export default ChechActivStudi;
