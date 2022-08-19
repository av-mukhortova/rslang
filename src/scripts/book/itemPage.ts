import { iWord } from "../../types/index";

class ItemPage {
  create(data: iWord) {
    return `
      <div class="item-page">
        <div class="item-page__images">
          <img src="${data.image}" alt="foto">
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
        </div>
        <button class="item-page__voce">V</button>
      </div>
    `;
  }
}

export default ItemPage;
