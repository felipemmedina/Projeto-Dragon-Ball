const $startGameButton = document.querySelector(".start-quiz")
const $questionsContainer = document.querySelector(".questions-container")
const $answersContainer = document.querySelector(".answers-container")
const $questionText = document.querySelector(".question")
const $nextQuestionButton = document.querySelector(".next-question")
const $answers = document.querySelectorAll(".answer")

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

let currentQuestionIndex = 0
let totalCorrect = 0
let level = ""

function startGame() {
    $startGameButton.classList.add("hide")
    $questionsContainer.classList.remove("hide")
    displayNextQuestion()
}

function displayNextQuestion() {
    resetState()

    if (questions.length === currentQuestionIndex) {
        return finishGame()
    }

    $questionText.textContent = questions[currentQuestionIndex].question
    questions[currentQuestionIndex].answers.forEach(answer => {
        const newAnswer = document.createElement("button")
        newAnswer.classList.add("button", "answer")
        newAnswer.textContent = answer.text
        if (answer.correct) {
            newAnswer.dataset.correct = answer.correct
        }
        $answersContainer.appendChild(newAnswer)

        newAnswer.addEventListener("click", selectAnswer)
    })
}

function resetState() {
    while ($answersContainer.firstChild) {
        $answersContainer.removeChild($answersContainer.firstChild)
    }

    document.body.removeAttribute("class")
    $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
    const answerClicked = event.target

    if (answerClicked.dataset.correct) {
        document.body.classList.add("correct")
        totalCorrect++
    } else {
        document.body.classList.add("incorrect")
    }

    document.querySelectorAll(".answer").forEach(button => {
        if (button.dataset.correct) {
            button.classList.add("correct")
        } else {
            button.classList.add("incorrect")
        }

        button.disabled = true
    })

    $nextQuestionButton.classList.remove("hide")
    currentQuestionIndex++;
}

function finishGame() {
    try {
        saveUserScore();

        renderQuizResult();
    } catch (error) {
        alert("Houve um erro ao finalizar o quiz!");
        console.log(`#ERRO: ${error}`);
    }
}

function saveUserScore() {
    fetch("/pontuacoes/inserir", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idUsuario: sessionStorage.ID_USUARIO,
            pontuacao: totalCorrect,
            nivel: level
        }),
    }).then(function (resposta) {
        console.log("resposta: ", resposta);

        if (!resposta.ok) {
            throw resposta;
        }
    })
}

function renderQuizResult() {
    const totalQuestion = questions.length
    const performance = Math.floor(totalCorrect * 100 / totalQuestion)

    let message = ""

    switch (true) {
        case (performance === 100):
            message = "Parabéns! Você atingiu o Instinto Superior!"
            level = "INSTINTO SUPERIOR"
            break
        case (performance === 90):
            message = "Você atingiu o Instinto Superior Incompleto!"
            level = "INSTINTO SUPERIOR IMCOMPLETO"
            break
        case (performance === 80):
            message = "Você atingiu o Super Saiyajin Blue com Kaioken!"
            level = "SUPER SAIYAJIN BLUE COM KAIOKEN"
            break
        case (performance === 70):
            message = "Você atingiu o Super Saiyajin Blue!"
            level = "SUPER SAIYAJIN BLUE"
            break
        case (performance === 60):
            message = "Você atingiu o Super Saiyajin God!"
            level = "SUPER SAIYAJIN GOD"
            break
        case (performance === 50):
            message = "Você atingiu o Super Saiyajin 3!"
            level = "SUPER SAIYAJIN 3"
            break
        case (performance === 40):
            message = "Você atingiu o Super Saiyajin 2!"
            level = "SUPER SAIYAJIN 2"
            break
        case (performance === 30):
            message = "Você atingiu o Super Saiyajin!"
            level = "SUPER SAIYAJIN"
            break
        case (performance === 20):
            message = "Você atingiu o Kaioken!"
            level = "KAIOKEN"
            break
        case (performance === 10):
            message = "Você atingiu a forma base!"
            level = "FORMA BASE"
            break
        default:
            message = "Há muito que melhorar :(!"
    }

    $questionsContainer.innerHTML = `
        <p class="final-message">
            Você acertou ${totalCorrect} de ${totalQuestion} questões!
            <span>
                Resultado: ${message}
            </span>
        </p>
    `
}

const questions = [
    {
        question: "Existem quantas Esferas do Dragão?",
        answers: [
            { text: "4", correct: false },
            { text: "5", correct: false },
            { text: "7", correct: true },
            { text: "10", correct: false }
        ]
    },
    {
        question: "Quem venceu o 22º Torneio de Artes Marciais?",
        answers: [
            { text: "Tenshinhan", correct: true },
            { text: "Goku", correct: false },
            { text: "Kuririn", correct: false },
            { text: "Mestre Kame", correct: false }
        ]
    },
    {
        question: "Contra quem Goku atingiu a transformação de Super Saiyajin?",
        answers: [
            { text: "Vegeta", correct: false },
            { text: "Cell", correct: false },
            { text: "Majin Buu", correct: false },
            { text: "Frezza", correct: true }
        ]
    },
    {
        question: "Quem foi responsável por derrotar Cell na  linha do tempo original?",
        answers: [
            { text: "Trunks", correct: false },
            { text: "Gohan", correct: true },
            { text: "Goku", correct: false },
            { text: "Vegeta", correct: false }
        ]
    },
    {
        question: "Qual o nome da Fusão com os brincos Potara entre Goku e Vegeta?",
        answers: [
            { text: "Gotenks", correct: false },
            { text: "Gokuhan", correct: false },
            { text: "Gogeta", correct: false },
            { text: "Vegetto", correct: true }
        ]
    },
    {
        question: "Qual o nome da transformação inédita que o Goku atinge em Dragon Ball GT?",
        answers: [
            { text: "Super Saiyajin 4", correct: true },
            { text: "Super Saiyajin God", correct: false },
            { text: "Super Saiyajin Blue", correct: false },
            { text: "Super Saiyajin 3", correct: false }
        ]
    },
    {
        question: "Em Dragon Ball GT, qual vilão é derrotado com uma super Genki Dama?",
        answers: [
            { text: "Dragão de Quatro Estrela", correct: false },
            { text: "Baby", correct: false },
            { text: "Dragão de Uma Estrela", correct: true },
            { text: "Super 17", correct: false }
        ]
    },
    {
        question: "Quem é Goku Black?",
        answers: [
            { text: "Goten", correct: false },
            { text: "Zamasu", correct: true },
            { text: "Bardock", correct: false },
            { text: "Turles", correct: false }
        ]
    },
    {
        question: "Quem retorna do outro mundo para participar do Torneio do Poder?",
        answers: [
            { text: "Frezza", correct: true },
            { text: "Cell", correct: false },
            { text: "Kid Buu", correct: false },
            { text: "Android Número 16", correct: false }
        ]
    },
    {
        question: "Quem venceu o torneio do Poder?",
        answers: [
            { text: "Goku", correct: false },
            { text: "Frezza", correct: false },
            { text: "Android Número 17", correct: true },
            { text: "Vegeta", correct: false }
        ]
    },
]