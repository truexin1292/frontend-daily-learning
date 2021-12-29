import headImg2 from './img/head2.jpg';

function createImg() {
  const img2 = new Image();
  img2.src = headImg2;
  img2.className += 'head2';
  app.appendChild(img2);
} 

export default createImg;