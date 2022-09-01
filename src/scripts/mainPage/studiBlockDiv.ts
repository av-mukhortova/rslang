import "../../assets/styles/mainPage/studiBlockDiv.css";

const studiBlock_data = [
  {
    img: "https://images.unsplash.com/photo-1558021211-6d1403321394?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1926&q=80",
    text: `Коллекция "4000 essential english words".
            Коллекция содержит 3600 часто употребляемых английских слов,
            Все книги пре­крас­но сгруп­пи­ро­ва­ны – от лег­ких до более сложных.
            Слова в коллекции отсортированы
            от более простых и известных к более сложным.`,
    place: true,
    id: "studi_book",
  },
  {
    img: "https://images.unsplash.com/photo-1476490445914-cc8ed84a4277?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80",
    text: ` В каждом книге 30 страниц,  на каждой странице 20 слов
            для изучения. Слова можно отметить как сложное и
            данное слово добавляется в раздел "Сложные слова",
            и можно отметить как изученное.`,
    place: false,
    id: "studi_book",
  },
  {
    img: "https://images.unsplash.com/photo-1534643960519-11ad79bc19df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    text: `Мини-игра  "Аудиовызов" качаем навык перевода на слух
            Понять иностранную речь бывает очень трудно:
            половину слов ты не успеваешь расслышать и понять.
            Из-за этого теряется смысл высказывания в целом.
            Особенно, если это телефонный разговор,
            или у тебя нет контекста события.`,
    place: true,
    id: "studi_game-audio",
  },
  {
    img: "https://images.unsplash.com/photo-1611532736568-a8754398aa30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    text: `Мини-игра  "Спринт"
            Кликаете по кнопкам и выбирая между предложенными
            словами закрепляете изученные
            слова на английском и набираете очки.`,
    place: false,
    id: "studi_game-sprint",
  },
];

class StudiBlockDiv {
  create(): HTMLElement {
    const studiBlockDiv = document.createElement("div") as HTMLElement;
    const title = document.createElement("h2") as HTMLElement;
    studiBlockDiv.setAttribute("class", "container");
    title.innerHTML = "Учите английский, весело и бесплатно";
    studiBlockDiv.append(title);

    studiBlock_data.forEach((el) => {
      const item = document.createElement("div") as HTMLElement;
      item.setAttribute("class", "main__studi-item");
      item.setAttribute("id", `${el.id}`);
      if (el.place) {
        item.innerHTML = `
            <div class="img" style="background-image: url(${el.img})">
            </div>
            <div class="text">
              <p>${el.text}</p>
            </div>
        `;
      } else {
        item.innerHTML = `
          <div class="text">
            <p>${el.text}</p>
          </div>
          <div class="img" style="background-image: url(${el.img})">
          </div>
        `;
      }
      studiBlockDiv.append(item);
    });
    return studiBlockDiv;
  }
}

export default StudiBlockDiv;
