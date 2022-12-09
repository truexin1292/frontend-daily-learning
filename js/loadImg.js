function loadImages(n) {
  const imgs = [
    'https://sponsors.vuejs.org/images/chrome_frameworks_fund.png',
    'https://sponsors.vuejs.org/images/chrome_frameworks_fund.png',
    'https://sponsors.vuejs.org/images/chrome_frameworks_fund.png',
    'https://sponsors.vuejs.org/images/chrome_frameworks_fund.png',
    'https://sponsors.vuejs.org/images/chrome_frameworks_fund.png',
    'https://sponsors.vuejs.org/images/chrome_frameworks_fund.png',
    'https://sponsors.vuejs.org/images/chrome_frameworks_fund.png',
    'https://sponsors.vuejs.org/images/chrome_frameworks_fund.png',
  ];
  const images = new Array(8);
  imgs.forEach(v => {
    images[i] = new Image();
    images[i].src = v
    images[i].onload = function () {
      console.log('log:', '111');
    }
    images[i].onerror = function () {

    }
  });
}