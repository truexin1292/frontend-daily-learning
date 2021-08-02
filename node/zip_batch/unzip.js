import { compressing } from 'compressing'

compressing.zip.compressDir('demo', 'demo.zip')
  .then(() => {
    console.log('success');
  })
  .catch(err => {
    console.error(err);
  });
// or    如果支持 ES7
await compressing.zip.compressDir('demo', 'demo1.zip');

// 解压缩
compressing.zip.uncompress('demo.zip', 'demo1')
  .then(() => {
    console.log('success');
  })
  .catch(err => {
    console.error(err);
  })
// or    如果支持 ES7
await compressing.zip.uncompress('demo1.zip', 'demo2');


// compressing.tar.compressFile(source, dest);
// compressing.tar.compressDir(source, dest);
// compressing.tar.uncompress(source, dest);

// compressing.zip.compressFile(source, dest);
// compressing.zip.compressDir(source, dest);
// compressing.zip.uncompress(source, dest);

// compressing.tgz.compressFile(source, dest);
// compressing.tgz.compressDir(source, dest);
// compressing.tgz.uncompress(source, dest);

// compressing.gzip.compressFile(source, dest);
// compressing.gzip.uncompress(source, dest);

