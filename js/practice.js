const question = document.getElementById('question');
const choices = document.getElementById('choices');
const btn = document.getElementById('btn');
const result = document.getElementById('result');
const scoreLabel = document.getElementById('scoreLabel')

const quizSet = [
  {q: '世界で一番大きな湖は？', c: ['カスピ海', 'カリブ海', '琵琶湖']},
  {q: '2の8乗は？', c: ['256', '64', '1024']},
  {q: '次のうち、最初にリリースされた言語は？', c: ['Python', 'JavaScript', 'HTML']}
];

let currentNum = 0;
let isAnswered;
let score = 0;
console.log(currentNum)


function shuffle (array) {
  for (let i = array.length - 1; i > 0 ; i--){
    const j = Math.floor(Math.random() * array.length);
    [array[i], array[j]] = [array[j], array[i]];
  }
  //arrayを返す
  return array;
}
//liを渡さないと参照できない
function checkAnswer (li) {
  //checkAnswerを無効化するからここをreturn
  if (isAnswered) return;
  isAnswered = true;
  if (quizSet[currentNum].c[0] === li.textContent) {
    //('choices > li.correct')だとダメ
    li.classList.add('correct');
    score++;
console.log(score)

  } else {
    li.classList.add('wrong');
  }
}

function quiz() {
  //quiz()の初期値はfalse
  isAnswered = false;
  //btnの初期値はdisabled
  btn.classList.add('disabled')
  //次の問題に行ったときに前の選択肢を消す
  //まだ理解していない感じがする
  while (choices.firstChild) {
    //choicesに対してremoveChild
    choices.removeChild(choices.firstChild);
  }
  question.textContent = quizSet[currentNum].q;
  const shuffledChoices = shuffle([...quizSet[currentNum].c]);
  shuffledChoices.forEach(choice => {
    const li = document.createElement('li');
    li.textContent = choice;

    li.addEventListener('click', () => {
      checkAnswer(li);
      btn.classList.remove('disabled')
    });
    //appendChildができていなかった
    choices.appendChild(li);
  });
  //ここにshow scoreの設定をする
  if (currentNum === quizSet.length -1){
    btn.textContent = 'Show Score'
  }
}

quiz();
btn.addEventListener('click', () => {
  //classListつけ忘れると動かない
  if (btn.classList.contains('disabled'))return;
  //show scoreの設定をここに持ってきても、Quiz() されるから、意味ない
  if (currentNum === quizSet.length - 1) {
    result.classList.remove('hidden');
    scoreLabel.textContent = `score:${score} / ${quizSet.length}`
    return
  }
  currentNum++;
  quiz();
});