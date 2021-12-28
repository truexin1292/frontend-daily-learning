// 面向过程 => 面向对象
import Header from './header.js'; 
// import Content from './content.js'; // 顺序不影响
import Footer from './footer.js';
import Content from './content.js';


const app = document.getElementById('app');

new Header();
new Content();
new Footer();
