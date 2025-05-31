const chatWindow = document.getElementById('chat-window');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const resultSection = document.getElementById('result-section');
const resultDiv = document.getElementById('result');

const questions = [
  '오늘 집에 돌아온 이후, 무엇을 가장 먼저 하셨나요?',
  '그다음엔 어디로 이동했고 어떤 행동을 하셨나요?',
  '그 과정 중, 물건을 꺼내거나 내려놓은 순간이 있었나요?',
  '혹시 주머니나 가방에 넣었다가 꺼낸 적은요?',
  '마지막으로 그 물건을 본 순간은 언제였나요?',
  '집 안에서 주로 물건을 어디에 두는 습관이 있으신가요?'
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

chatForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const text = userInput.value.trim();
  if (!text) return;
  addMessage(text, 'user');
  userAnswers.push(text);
  userInput.value = '';
  currentQuestion++;
  setTimeout(askNextQuestion, 600);
});

// 초기 인사와 첫 질문
window.onload = function() {
  addMessage('안녕하세요! 잃어버린 물건을 함께 찾아드릴 AI 탐정입니다.\n아래 질문에 차례대로 답해 주세요.');
  setTimeout(askNextQuestion, 900);
};
