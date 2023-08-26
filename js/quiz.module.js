export class Quiz {
    constructor(quizResponse){
        this.results = quizResponse
        console.log(quizResponse);
        this.currentIndex = 0
        document.getElementById('totalNumberOfQuestions').innerText = this.results.length
        this.currentQuestion = document.getElementById('currentQuestion') 
        this.question = document.getElementById('question')
        this.showQuestion()
        document.getElementById('next').addEventListener('click',()=>{
            console.log(this.nextQuestion());
        })
        this.correctAnswer
        this.score=0
        document.getElementById('tryBtn').addEventListener('click',()=>{
            location.reload()
        })
    }
    showQuestion(){
        this.currentQuestion.innerText = this.currentIndex + 1
        const questionCurrent = this.results[this.currentIndex]
        this.question.innerText = questionCurrent.question
        const answers = [...questionCurrent.incorrect_answers] // Deep Copy // [0,1,2]  // [0,1,2,3]
        // console.log(answers);
        this.correctAnswer = questionCurrent.correct_answer
        const randomNumber = Math.floor(Math.random()* answers.length) 
        answers.splice(randomNumber,0,this.correctAnswer)
        let container = ''
        answers.forEach((answer)=>{
            container+= `
            <li class="my-3 animate__animated">
            <div class="d-flex align-items-center">
               <input type="radio" name="answer" value="${answer}" />
               <div class="state p-success-o">
                  <label class="m-0 p-2"> ${answer} </label>
               </div>
            </div>
         </li>
            `
        })
        $('#rowAnswer').html(container);
    }
    nextQuestion(){
        const currentQuestionAnswer = document.querySelector('[name="answer"]:checked')?.value
        if (currentQuestionAnswer != undefined){
            $('#alert').fadeOut(300);
            this.currentIndex++
            if (this.currentIndex > this.results.length-1){
                $('#quiz').removeClass('show');
                $('#finish').addClass('show');
                document.getElementById('score').innerHTML = this.score
            }else {
                if(this.correctAnswer === currentQuestionAnswer) {
                    $('#Correct').fadeIn(300);
                    setTimeout(()=>{
                    $('#Correct').fadeOut(300);
                    },500)
                    this.score++
                } else {
                    $('#inCorrect').fadeIn(300);
                    setTimeout(()=>{
                    $('#inCorrect').fadeOut(300);
                    },500)
                }
                this.showQuestion()
            }
        }else {
            $('#alert').fadeIn(300);
        }
    }   
}



// Shallow Copy
// x = [0,1,2] ------> Reference  #1        Reference  #1 === [0,1,2,3]
// y = x 
// x ------> Reference #1
// x.push(3) -----> Reference #1

