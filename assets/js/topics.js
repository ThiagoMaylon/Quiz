let navTopics = document.querySelector(".nav-topics")
let textTitle = document.querySelector("#text-title")
let textContet = document.querySelector("#text-contet")
let h2 = document.querySelector("#quiz-h2")
let btnStart = document.querySelector(".start-btn-container")
let resultQuiz = document.querySelector(".quiz-result")

btnStart.style.display = "none"

async function fetchData() {
  try {
    const response = await fetch('https://quizapi-y7gb.onrender.com/');
    const data = await response.json();
    let topics = data.topics;
    return topics
  } catch (error) {
    console.error('Erro ao consumir a API:', error);
  }
}

async function start(topicId) {
  try {
    const response = await fetch(`https://quizapi-y7gb.onrender.com/topics/${topicId}`);
    const data = await response.json();
    textTitle.innerHTML = data.title;
    textContet.innerHTML = data.content;
  } catch (error) {
    console.error('Erro ao consumir a API:', error);
  }
}

async function renderTopics() {
  let topics = await fetchData();
  if (topics) {
    topics.forEach(topic => {
      let topicElement = document.createElement('div');
      topicElement.classList.add('topics');
      topicElement.setAttribute('id', topic.id);
      topicElement.textContent = topic.title;
      topicElement.addEventListener('click', () => {
        h2.classList.add("select")
        btnStart.style.display = "flex"
        resultQuiz.style.display = "none"
        start(topic.id);
      });
      navTopics.appendChild(topicElement);
    });
  }
}

renderTopics();
