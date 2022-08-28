class StatisticsText {
  create(): HTMLElement {
    const statisticsContainet = document.createElement("div") as HTMLElement;
    const statisticsTextDiv = document.createElement("div") as HTMLElement;
    const statisticsText = document.createElement("p") as HTMLElement;
    const statisticsTitle = document.createElement("h2") as HTMLElement;
    statisticsContainet.setAttribute("class", "container");
    statisticsTextDiv.setAttribute("class", "main__statistics-text");
    statisticsTitle.textContent = `Статистика`;
    statisticsText.textContent = `Статистике отображается 
    краткосрочная статистика по мини-играм
     и по словам за каждый день изучения.
    Статистики отражают в числовых показателях, 
    насколько вы прогрецируете
     каждый день  или 
    за определенный период в 
    целом по сравнению с данными до и после. 
    Статистика возрастает, 
    когда Вы  показываете хорошие результаты. 
    И это вас мотивирует на следующие шагу.`;

    statisticsTextDiv.append(statisticsTitle);
    statisticsTextDiv.append(statisticsText);
    statisticsContainet.append(statisticsTextDiv);
    return statisticsContainet;
  }
}

export default StatisticsText;
