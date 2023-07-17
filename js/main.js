const questions = [
	{
		question: "Яка мова програмування працює в браузері?",
		answers: ["Java", "C", "Python", "JavaScript"],
		correct: 4,
	},
	{
		question: "Що означає CSS?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
		],
		correct: 2,
	},
	{
		question: "Що означає  HTML?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborginis",
		],
		correct: 1,
	},
	{
		question: "В якому році був створений JavaScript?",
		answers: ["1996", "1995", "1994", "жодна з перерахованих відповідей"],
		correct: 2,
	},
];

// Знаходимо елементи
const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit')

// Перемінні гри
let score = 0; // к-сть правильних відповідей
let questionIndex = 0; // поточне запитання

// Очищуємо початковий HTML

celarPage();
showQuestion();
submitBtn.onclick = checkAnswer;

function checkAnswer() {

  const checkedRadio = listContainer.querySelector("input[type = 'radio']:checked"); //вибрана радіокнопка

  //Якщо відповідь не вибрана, завершуємо роботу ф-ції
  if(!checkedRadio) {
    submitBtn.blur();
    return
  }

  //Дізнаємось номер відповіді користувача
  const userAnswer = parseInt(checkedRadio.value);

  //Якщо відповідь вірна - збільшуємо кількість балів
  if (questions[questionIndex]['correct'] === userAnswer) {
    score++;
  }

  if(questionIndex !== questions.length - 1) {
    // console.log('Це НЕ останнє питання');

    questionIndex++;
    celarPage();
    showQuestion();
    return;

  } else {
    // console.log('Це останнє питання');
    celarPage();
    showResults();
  }
}

function showResults() {
  console.log('showResults started');
  console.log(score);
  const resultsTemplate = `
    <h2 class="title">%title%</h2>
		<h3 class="summary">%message%</h3>
		<p class="result">%result%</p>
  `;

  let title, message;

  //Варіанти заголовків і повідомлень
  if(score == questions.length) {
    title = 'Вітаю!';
    message = 'Ти відповів вірно на всі запитання!';
  }
  else if ((score * 100) / questions.length >= 50) {
    title = 'Непоганий результат!';
    message = 'Ви дали вірні відповіді більш ніж на 50% запитань!';
  }
  else {
    title = 'Упс! Потрібно постаратися!';
    message = 'Поки що відповідей менше ніж 50%!';
  }

  //Результат

  let result = `${score} із ${questions.length}`;

  //Фінальна відповідь, підставляємо дані в шаблон
  const finalMessage = resultsTemplate
                            .replace('%title%', title)
                            .replace('%message%', message)
                            .replace('%result%', result);

  headerContainer.innerHTML = finalMessage;

  //Змінюємо кнопку на "Грати знову"
  submitBtn.blur();
  submitBtn.innerText = 'Грати знову';
  submitBtn.onclick = () => history.go();
}


function celarPage() {
  headerContainer.innerHTML = '';
  listContainer.innerHTML = '';
}

// Відображаємо поточне запитання
function showQuestion() {

  // Створюємо шаблон для заголовку
  const headerTemplate = `<h2 class="title">%title%</h2>`;

  // Виконуємо заміну стокового значення на необхідне запитання з []
  const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);

  // Відображаємо title на сторінці
  headerContainer.innerHTML = title;

  // Варіанти відповідей
  let answerNumber = 1;
  for(answerText of questions[questionIndex]['answers']) {
    // Добавляємо розмітку з варіантами відповідей
    const questionTemplate =
      `<li>
        <label>
          <input value="%number%" type="radio" class="answer" name="answer" />
          <span>%answer%</span>
        </label>
      </li>`

      // Виконуємо заміну стокового тексту на необхідні варіанти відповідей
      const answerHTML = questionTemplate
                                    .replace('%answer%', answerText)
                                    .replace('%number%', answerNumber);
      listContainer.innerHTML += answerHTML;

      answerNumber++
  }
}

