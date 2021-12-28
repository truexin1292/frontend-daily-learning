// 面向过程
const app = document.getElementById('app');

const header = document.createElement('div');
header.innerHTML = 'I am header!';
app.appendChild(header);

const content = document.createElement('div');
content.innerHTML = 'I am content!';
app.appendChild(content);

const footer = document.createElement('div');
footer.innerHTML = 'I am footer!';
app.appendChild(footer);