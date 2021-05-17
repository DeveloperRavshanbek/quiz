const start = document.getElementById('start');
const nextButton = document.getElementById('next');
const back = document.querySelector('.back');
const form = document.questions;
const finishedquiz = document.getElementById('finish')
var counter = 60;
var counter2 = 0;
var userAnswers = [];

const list = [
  {
    title: "Javascript qanday til?",
    answers: [
      'Dasturlash tili',
      'Fast food',
      'Yangi brend'
    ],
    correct: "Dasturlash tili"
  },
  {
    title: "CSS nima uchun ishlatiladi?",
    answers: [
      'Sahifaga style berish uchun',
      "Bazaga bog'lash uchun",
      'Css ishlatilmaydi'
    ],
    correct: "Sahifaga style berish uchun"
  },
  {
    title: "HTML nima?",
    answers: [
      'Web dasturlashuchun ishlatiladi',
      "Fast food",
      'Bilmadim'
    ],
    correct: "Web dasturlashuchun ishlatiladi"
  }
];
var counter;
start.addEventListener('click', function () {
  calculate = setInterval(function () {
    time();
  }, 1000);
  document.querySelector('.block1').style.display = 'none';
  document.querySelector('.block2').style.display = 'block';
  document.querySelector('.block2').classList.add('opened');
  showQuestion(list[counter2]);
});

next.addEventListener('click', function () {
  const answer = document.querySelector('input[type=radio][name=answer]:checked');

  if (!answer) {
    alert('Siz berilgan variantlardan birini tanlashingiz lozim!!!');
    return false;
  }
  counter2++;
  userAnswers.push(answer.value);

  if (counter2 < list.length) {
    showQuestion(list[counter2], true);
  } else {
    finishQuiz();
  }
})

back.addEventListener('click', function () {
  counter = 60;
  counter2 = 0;
  userAnswers = [];
  document.querySelector('.block3').style.display = 'none';
  document.querySelector('.block1').style.display = 'block';

})





function time() {

  if (counter === 0) {
    clearInterval(calculate);
    alert('Berilgan vaqt tugadi');
    document.querySelector('.block2').style.display = 'none';
    finishQuiz();
  }

  document.querySelector('.time span').innerHTML = counter;
  counter--;
}



function showQuestion(data, isClass = false) {

  form.innerHTML = '';

  const wrapper = document.createElement('div');
  wrapper.classList.add('question-wrapper', 'opened');

  const title = document.createElement('div');
  title.classList.add('h3', 'mb-4', 'ok');
  title.innerHTML = data.title;

  wrapper.appendChild(title);

  data.answers.forEach(function (question, index) {
    const formGroup = document.createElement('div');
    formGroup.classList.add('form-group', 'border-bottom', 'mb-0');

    const input = document.createElement('input');
    input.setAttribute('type', 'radio');
    input.setAttribute('id', 'answer' + index);
    input.setAttribute('name', 'answer');
    input.value = question;

    const label = document.createElement('label');
    label.setAttribute('for', 'answer' + index);
    label.style.marginLeft = '10px';
    label.innerHTML = question;

    formGroup.appendChild(input);
    formGroup.appendChild(label);

    wrapper.appendChild(formGroup);

  });

  form.appendChild(wrapper);
}

function finishQuiz() {

  clearInterval(calculate);

  document.querySelector('.score').innerHTML = `Sizning javobingiz: ${calculateScore()}/${list.length}`;
  document.querySelector('.finalTime').innerHTML = `Sarflangan vaqt: ${60 - counter}s`;
  document.querySelector('.block3').classList.add('opened');
  document.querySelector('.block3').style.display = 'block';
  document.querySelector('.block2').style.display = 'none';
  document.querySelector('.back').style.display = 'block';
}

function calculateScore() {
  var correctAnswer = 0;

  userAnswers.forEach(function (answer, index) {
    if (answer.toLowerCase() == list[index].correct.toLowerCase()) {
      correctAnswer++;
    }
  });

  return correctAnswer;
}
finishedquiz.addEventListener('click', function () {
  finishQuiz();
})