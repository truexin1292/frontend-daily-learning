import axios from 'axios';

function apis() {
  // axios.get('/Yixiantong/getHomeDatas').then(({
  //   data
  // }) => {
  //   console.log('log:', data);
  // })

  axios.get('/api/Yixiantong/getHomeDatas').then(({
    data
  }) => {
    console.log('api:', data);
  });

  axios.get('/thirdApi/home/j/advertise/getFooterSetting').then(({
    data
  }) => {
    console.log('thirdApi:', data);
  });

  axios.post('/kaikebaApi/plat/plat-community-service/service/vote/newest-content', {
    maxListCount: 10
  }).then(({
    data
  }) => {
    console.log('kaikebaApi:', data);
  });

}

export default apis;