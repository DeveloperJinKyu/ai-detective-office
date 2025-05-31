const chatWindow = document.getElementById('chat-window');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const resultSection = document.getElementById('result-section');
const resultDiv = document.getElementById('result');

const questions = [
  '뭘 잃어버렸는지나 말해봐.',
  '오늘 집에 들어온 다음에 제일 먼저 뭘 했냐?',
  '그 다음엔 어디로 갔고 뭘 했는지 기억나냐?',
  '중간에 물건 꺼내거나 내려놓은 적 있었냐?',
  '주머니나 가방에서 꺼낸 적은 있냐?',
  '마지막으로 그 물건 본 게 언제냐?',
  '평소에 집에서 물건 어디다 두는 버릇 있냐?'
];

let chatHistory = [];
let currentQuestion = 0;
let userAnswers = [];

function addMessage(text, sender = 'bot') {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender}`;
  const bubble = document.createElement('div');
  bubble.className = `bubble ${sender}`;
  bubble.innerText = text;
  messageDiv.appendChild(bubble);
  chatWindow.appendChild(messageDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function askNextQuestion() {
  if (currentQuestion < questions.length) {
    addMessage(questions[currentQuestion], 'bot');
  } else {
    showResult();
  }
}

function showResult() {
  // 간단한 추론 예시 (실제 AI 추론 로직은 서버/AI 연동 필요)
  let guess = '아직 충분한 정보가 없습니다.';
  if (userAnswers.length >= 3) {
    guess = `최근에 ${userAnswers[2]} 했던 장소 근처를 먼저 찾아보세요.`;
  }
  resultDiv.innerText = guess;
  resultSection.style.display = 'block';
}

function isNonsenseAnswer(text) {
  // 초성만 입력(ㄱㄴㄷ, ㅇㅇㅇ 등) 또는 2글자 이하, 또는 의미없는 반복
  const nonsenseRegex = /^[ㄱ-ㅎㅏ-ㅣ]{2,}$|^([a-zA-Z])\1{2,}$|^.{1,2}$/;
  return nonsenseRegex.test(text);
}

chatForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const text = userInput.value.trim();
  if (!text) return;
  if (isNonsenseAnswer(text)) {
    addMessage('이봐, 지금 장난하나? 알아듣게 말해.', 'bot');
    userInput.value = '';
    return;
  }
  addMessage(text, 'user');
  userAnswers.push(text);
  userInput.value = '';
  currentQuestion++;
  setTimeout(askNextQuestion, 600);
});

// 초기 인사와 첫 질문
window.onload = function() {
  addMessage('잃어버렸다고? 시간 없으니까 빨리 대답해.');
  setTimeout(askNextQuestion, 900);
};
