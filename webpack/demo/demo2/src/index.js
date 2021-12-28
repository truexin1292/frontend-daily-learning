// 面向过程 => 面向对象
import Header from './header.js';
// import Content from './content.js'; // 顺序不影响
import Footer from './footer.js';
import Content from './content.js';
import headImg from './img/head1.png';
import headImg2 from './img/head2.jpg';
// import indexCss from './index.css';
import indexCss from './index.scss';

const app = document.getElementById('app');

const img = new Image();
img.src = headImg;
img.className += 'head1';
app.appendChild(img);

const img2 = new Image();
img2.src = headImg2;
img2.className += 'head2';
app.appendChild(img2);

new Header();
new Content();
new Footer();