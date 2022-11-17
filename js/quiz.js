export class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.numberOfQuestions = questions.length;
    document.getElementById("totalAmount").innerHTML = this.numberOfQuestions;
    this.currentQuestion = 0;
    this.score = 0;
    this.nextBtn = document.getElementById("next");
    this.nextBtn.addEventListener("click", this.checkAnswer.bind(this));
    this.showData();
  }
  checkAnswer() {
    let correctAnswer = this.questions[this.currentQuestion].correct_answer;
    let allAnswers = Array.from(document.getElementsByName("answers"));
    let userAnswer = allAnswers.filter((ele) => {
      return ele.checked == true;
    })[0].value;
    if (userAnswer == correctAnswer) {
      $("#inCorrect").fadeOut(10);
      $("#Correct").fadeIn(10);
      this.score++;
      let tryBtn = document.getElementById("tryBtn");
      tryBtn.addEventListener("click", function () {
        location.reload();
      });
    } else {
      $("#inCorrect").fadeIn(10);
      $("#Correct").fadeOut(10);
    }
    this.currentQuestion++;
    if (this.currentQuestion >= this.numberOfQuestions) {
      $("#quiz").fadeOut(100);
      $("#finish").fadeIn(100);
      $("#score").html(this.score);
    } else {
      this.showData();
    }
  }
  showData() {
    document.getElementById("question").innerHTML =
      this.questions[this.currentQuestion].question;
    document.getElementById("current").innerHTML = this.currentQuestion + 1;
    this.allAnswers = [
      this.questions[this.currentQuestion].correct_answer,
      ...this.questions[this.currentQuestion].incorrect_answers,
    ];
    this.shuffle(this.allAnswers);
    let box = "";
    for (let i = 0; i < this.allAnswers.length; i++) {
      box += `<div class='form-check'>
        <input type='radio' name='answers' value='${this.allAnswers[i]}' class='form-check-input'>
        <label for='' class='form-check-label'>${this.allAnswers[i]}</label>
        </div> `;
    }
    document.getElementById("rowAnswer").innerHTML = box;
  }
  shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }
}
