import { Quiz } from "./quiz.module.js"
export class Setting {
    constructor(){
       document.getElementById('startBtn').addEventListener('click',()=>{
        this.getUserData()
       })
    }
   async getUserData(){
        const category = document.getElementById('category').value
        const difficulty = document.querySelector('[name="difficulty"]:checked').value
        // Array.from(document.getElementsByName('difficulty')).find((item)=>{
        //     return item.checked
        // }).value
        const numberOfQuestion = document.getElementById('numberOfQuestions').value
        const result = await this.getQuestionData(category,difficulty,numberOfQuestion)
        if (numberOfQuestion > 0 && numberOfQuestion <= 50){
            $('#setting').removeClass('show');
            $('#quiz').addClass('show');
            // console.log(result);
            const quiz = new Quiz(result)
        }else {
            $('#alert1').fadeIn();
        }
    }
   async getQuestionData(category,difficulty,numberOfQuestion){
        const apiResponse = await fetch(`https://opentdb.com/api.php?amount=${numberOfQuestion}&category=${category}&difficulty=${difficulty}`)
        const response = await apiResponse.json()
        return response.results
    }
}

