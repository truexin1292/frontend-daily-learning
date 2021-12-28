// es module ， 不导出会报错r（）
function Header() {
  // const app = document.getElementById('app');
  const header = document.createElement('div');
  header.innerHTML = 'I am header!';
  app.appendChild(header);
}

export default Header; 