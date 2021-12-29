function createBtn() {
  const btn = document.createElement('button');
  btn.innerText = '新增';
  app.appendChild(btn);

  btn.addEventListener('click', function () {
    const div = document.createElement('div');
    div.className += 'btn-div';
    div.innerHTML = '我是新的div';
    app.appendChild(div);
  })
}

export default createBtn;