const questions = [
    {
        image: "pauto.jpg",
        correct_option: "Pauto",
    },
    {
        image: "pdon.jpg",
        correct_option: "Pdon",
    },
    {
        image: "pfilt.jpg",
        correct_option: "Pfilt",
    },
    {
        image: "pice.jpg",
        correct_option: "Pice",
    },
    {
        image: "pjo.jpg",
        correct_option: "Pjo",
    },
    {
        image: "pjung.jpg",
        correct_option: "Pjung",
    },
    {
        image: "pkaka.jpg",
        correct_option: "Pkaka",
    },
    {
        image: "pm.jpg",
        correct_option: "Pm",
    },
    {
        image: "pmong.jpg",
        correct_option: "Pmong",
    },
    {
        image: "pohm.jpg",
        correct_option: "Pohm",
    },
    {
        image: "ppat.jpg",
        correct_option: "Ppat",
    },
    {
        image: "ppatpat.jpg",
        correct_option: "Ppatpat",
    },
    {
        image: "ppin.jpg",
        correct_option: "Ppin",
    },
    {
        image: "ppleng.jpg",
        correct_option: "Ppleng",
    },
    {
        image: "ppukao.jpg",
        correct_option: "Ppukao",
    },
    {
        image: "psara.jpg",
        correct_option: "Psara",
    },
    {
        image: "pseen.jpg",
        correct_option: "Pseen",
    },
    {
        image: "ptoey.jpg",
        correct_option: "Ptoey",
    },
    {
        image: "ptong.jpg",
        correct_option: "Ptong",
    },
];

const optionsArray = [
    "Pauto",
    "Ptong",
    "Ptoey",
    "Pseen",
    "Psara",
    "Ppukao",
    "Ppleng",
    "Ppin",
    "Ppatpat",
    "Ppat",
    "Pohm",
    "Pmong",
    "Pm",
    "Pkaka",
    "Pjung",
    "Pjo",
    "Pice",
    "Pfilt",
    "Pdon",
    "Pkarn",
    "Pforth",
    "Pbew",
    "Ptae",
    "Pnuea",
    "Ppun",
    "Pkaofang",
    "Pfah",
    "Pnine",
    "Pbee",
    "Pmooui",
    "Pmai",
    "Pmusic",
    "Paidan",
    "Pwarm",
];
const container = document.querySelector(".container");
const gameContainer = document.querySelector(".game-container");
const startButton = document.getElementById("start");
const scoreContainer = document.querySelector(".score-container");
const userScore = document.getElementById("user-score");
let timer = document.getElementsByClassName("timer")[0];
let nextBtn;
let score, currentQuestion, finalQuestions;
let countdown,
 count = 11;


const randomValueGenerator = (array) => array[Math.floor(Math.random() * array.length)];

const randomShuffle = (array) => array.sort(() => 0.5 - Math.random());

const startGame = () => {
    scoreContainer.classList.add("hide");
    gameContainer.classList.remove("hide");
    finalQuestions = populateQuestions();
    score = 0;
    currentQuestion = 0;

    cardGenerator(finalQuestions[currentQuestion]);

};

const timeDisplay = () => {
    countdown = setInterval(()=> {
        count -= 1;
        timer.innerHTML = `<span>Time Left: </span>${count}s`;
        if(count == 0) {
          clearInterval(countdown);
          nextQuestion();
        }
    }, 1000);
};

const populateOptions = (correct_option) => {
    let arr = [];
    arr.push(correct_option);
    let optionsCount = 1;
    while (optionsCount < 4) {
        let randomvalue = randomValueGenerator(optionsArray);
        if (!arr.includes(randomvalue)) {
          arr.push(randomvalue);
          optionsCount += 1;   
        }
    }
    return arr;
};

const populateQuestions = () => {
    let questionsCount = 0;
    let chosenObjects = [];
    let questionsBatch = [];

    while (questionsCount < 5) {
        let randomvalue = randomValueGenerator(questions);
        let index = questions.indexOf(randomvalue);
        if(!chosenObjects.includes(index)) {
            questionsBatch.push(randomvalue);
            chosenObjects.push(index);
            questionsCount += 1;
        }
    }
    return questionsBatch;
};


const checker = (e) => {
    let userSolution = e.target.innerText;
    let options = document.querySelectorAll(".option");
    if(userSolution === finalQuestions[currentQuestion].correct_option){
        e.target.classList.add("correct");
        score++;
    }
    else{
        e.target.classList.add("incorrect");
        options.forEach((element) =>{
            if(element.innerText == finalQuestions[currentQuestion].correct_option){
                element.classList.add("correct");
            }
        });
    }

    clearInterval(countdown);
    options.forEach((element) => {
        element.disabled = true;
    });
};

const nextQuestion = (e) => {
    currentQuestion += 1;
    if(currentQuestion == finalQuestions.length) {
        gameContainer.classList.add("hide");
        scoreContainer.classList.remove("hide");
        startButton.innerText = `Restart`;
        userScore.innerHTML = " Your score is "+ score + " out of " + currentQuestion;
        clearInterval(countdown);
    }
    else{
        cardGenerator(finalQuestions[currentQuestion]);
    }
};

const cardGenerator = (cardObject) => {
    const { image, correct_option } = cardObject;
    let options = randomShuffle(populateOptions(correct_option));
    container.innerHTML = `<div class="quiz">
    <p class="num">
    ${currentQuestion + 1}/5
    </p>
    <div class="questions">
      <img class="pokemon-image" src="${image}"/>
    </div>
     <div class="options">
    <button class="option" onclick="checker(event)">
    ${options[0]}
    </button>
    <button class="option" onclick="checker(event)">
    ${options[1]}
    </button>
    <button class="option" onclick="checker(event)">
    ${options[2]}
    </button>
    <button class="option" onclick="checker(event)">
    ${options[3]}
    </button>
    </div>

    <div class="nxt-btn-div">
        <button class="next-btn" onclick="nextQuestion(event)">Next</button>
    </div>

    </div>`;

    count = 11;
    clearInterval(countdown);

    timeDisplay();
};


startButton.addEventListener("click", startGame);