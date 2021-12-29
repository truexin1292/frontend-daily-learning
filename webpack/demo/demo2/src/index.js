// 面向过程 => 面向对象
import Http from './http.js';
import Header from './header.js';
// import Content from './content.js'; // 顺序不影响
import Footer from './footer.js';
import Content from './content.js';
import CreateImg from './createImg.js';
import CreateBtn from './createBtn.js';
import counter from './counter.js';
import number from './number.js';
import es6 from './js/es6.js';
import headImg from './img/head1.png';


// import './index.css';
// import './index.scss';
import './font.scss';
import './css/btn.scss';
// import styles from './index.scss'; // 改成css modules的引入规范
// console.log('styles:', styles);

const app = document.getElementById('app');

const img = new Image();
img.src = headImg;
// img.className += `${styles.head1}`;
app.appendChild(img);

const span = document.createElement('div');
span.className = "iconfont icon-edit";
span.style.color = 'yellow';
// span.innerHTML = "<span class='iconfont icon-edit'></span>";
app.appendChild(span);

console.log('log:', '3333-8');
// console.log4('log:','44'5); // sourceMap使用

new Http();
new Header();
new Content();
new Footer();
new CreateImg();
new CreateBtn();
counter();
number();
es6();

// 注意：vue-loader 和 style-loader自带这个部分的处理，不需要单独写。
if (module.hot) {
  module.hot.accept('./number.js', () => {
    const div = document.getElementById('number');
    document.getElementById('app').removeChild(div);
    number();
  })
}