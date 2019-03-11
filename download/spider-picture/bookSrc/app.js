const fs = require('fs'),
    config = require('./config'),
    method = require('./method');

const start = () => {
    method.mkdirSaveFolder();
    main();
}

const main = async () => {
    let pageUrl = `${ config.originPath }`;
    const page = await method.getPage(pageUrl);
    let imageSrc = await method.getImageSrcList(page);
    imageSrc.map((v, i) => {
        method.downloadImage(v[0].src, `${ config.savePath }/${ i }.jpg`);
    });
}

module.exports = {
    start
}
