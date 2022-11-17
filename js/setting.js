import { Quiz } from "./quiz.js";

export class Settings {
  constructor() {
    this.categoryElement = document.getElementById("category");
    this.difficulty = document.getElementsByName("difficulty");
    this.numberOfQues = document.getElementById("numOfQuestions");
    this.startBtn = document.getElementById("startBtn");
    this.startBtn.addEventListener("click", this.getData.bind(this));
  }
  async getData() {
    if (this.numberOfQues.value >= 0 && this.numberOfQues.value != "") {
      let categoryValue = this.categoryElement.value;
      let quesNumberValue = this.numberOfQues.value;
      let difficultyValue = [...this.difficulty].filter((ele) => {
        return ele.checked == true;
      })[0].value;
      let myUrl = `https://opentdb.com/api.php?amount=${quesNumberValue}&category=${categoryValue}&difficulty=${difficultyValue}
      `;
      let myResponse = await this.getApi(myUrl);
      $("#setting").fadeOut(100, function () {
        $("#quiz").fadeIn(100);
        let myQuiz = new Quiz(myResponse);
      });
    } else {
      $("#formAlert").fadeIn(1000);
    }
  }
  async getApi(newUrl) {
    let getData = await fetch(newUrl);
    let myResponse = await getData.json();
    return myResponse.results;
  }
}
