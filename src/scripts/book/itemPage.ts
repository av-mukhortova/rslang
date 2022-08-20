import { iWord } from "../../types/index";
import "../../assets/styles/bookStyle/ItemPage.css";

class ItemPage {
  create(data: iWord) {
    return `
      <div class="item-page" id="${data.id}">
        <div class="item-page__images">
          <img src="https://react-learnwords-example.herokuapp.com/${data.image}" alt="foto">
        </div>
        <div class="item-page__texts">
          <div class="item-page__en">
            <h4>"${data.word}"</h4>
            <p>Transcription: <b>"${data.transcription}"</b></p>
            <p>${data.textMeaning}</p>
            <p>${data.textExample}</p>
          </div>
          <div class="item-page__ru">
            <p>Перевод: <b>${data.wordTranslate}</b></p>
            <p>${data.textMeaningTranslate}</p>
            <p>${data.textExampleTranslate}</p>
          </div>
          <button class="item-page__voce">Озвучить</button>
        </div>
        <div class="item-page__authorized">
          <button class="item-page__studi">Изученно</button>
          <button class="item-page__difficult">Сложные слова +</button>
          <button class="item-page__difficult-delete">Сложные слова -</button>        
        </div>
      </div>
    `;
  }
}

export default ItemPage;
