// 面向过程 => 面向对象
import Header from './header.js';
// import Content from './content.js'; // 顺序不影响
import Footer from './footer.js';
import Content from './content.js';
import headImg from './img/head1.png';

const app = document.getElementById('app');

const img = new Image();
img.src = headImg;
app.appendChild(img);

new Header();
new Content();
new Footer();