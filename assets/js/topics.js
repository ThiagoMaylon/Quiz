let navTopics = document.querySelector(".nav-topics")
let textTitle = document.querySelector("#text-title")
let textContet = document.querySelector("#text-contet")

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
        start(topic.id);
      });
      navTopics.appendChild(topicElement);
    });
  }
}

renderTopics();
