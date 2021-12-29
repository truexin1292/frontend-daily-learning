function counter() {
  const div = document.createElement('div');
  div.setAttribute('id', 'counter');
  div.innerText = 1;
  app.appendChild(div);
  div.addEventListener('click', function () {
    div.innerText = parseInt(div.innerText, 10) + 1;
  });
}

export default counter;