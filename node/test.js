process.argv.forEach((v,i) => {
  console.log(`${v}: ${i}`);
})

// 命令行执行： node test.js name=alex gender=male age=29

/*
/Users/truexin/.nvm/versions/node/v10.19.0/bin/node: 0
/Users/truexin/truexin/frontend-daily-learning/node/test.js: 1
name=alex: 2
gender=male: 3
age=29: 4
*/