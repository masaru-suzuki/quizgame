'use strict';
{

  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p');

  const quizSet = [
    //choiceの配列の１番目が正解
    {q: '世界で一番大きな湖は？', c: ['カスピ海', 'カリブ海', '琵琶湖']},
    {q: '2の8乗は？', c: ['256', '64', '1024']},
    {q: '次のうち、最初にリリースされた言語は？', c: ['Python', 'JavaScript', 'HTML']},
  ];

  let currentNum = 0;
  //一度回答したら回答できないようにする
  let isAnswered;
  let score = 0;


  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      //下の式の ; を抜かしたら、動かなくなった。
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    //return arr でシャッフルした配列を返す
    return arr;
  }

  function checkAnswer(li) {
    if(isAnswered){
      return;
    }
    //liごとにisAnsweredが設置されているわけではないので、一度クリックしたら、全てtrueになる
    isAnswered = true;
    if (li.textContent === quizSet[currentNum].c[0]) {
      li.classList.add('correct');
      score++;
    } else {
      li.classList.add('wrong');
    }
    btn.classList.remove('disabled');
  }

  function setQuiz() {
    isAnswered = false;
    //ボタンがdisabled担っていなかったため、追加
    btn.classList.add('disabled')

    question.textContent = quizSet[currentNum].q;
    //次の問題に行ったときに前の選択肢を消す
    while (choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }
    //配列が変わらないように[...]でかこう
    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    shuffledChoices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () => {
        checkAnswer(li);
      });
      choices.appendChild(li);
    });
    //quizSet.length - 1にするのがなれない
    //quizSetが３番目の配列だったら、ボタンのテキストを変更するから、−１しなくてもいいのでは？って思ってしまう
    if (currentNum === quizSet.length -1){
      btn.textContent = 'Show Score'
    }


  }
  setQuiz();

  btn.addEventListener('click', () => {
    if (btn.classList.contains('disabled')) return;
    if (currentNum === quizSet.length -1) {
      result.classList.remove('hidden');
      scoreLabel.textContent = (`score: ${score} / ${quizSet.length}`)
    } else {
      currentNum++;
      setQuiz();
    }
  });
}