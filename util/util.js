/*
* 替换url的某个参数的值
* */
function changeUrlArg(arg, val, url) {
    url = url ? url : location.href;
    let pattern = arg + '=([^&]*)';
    let replaceText = arg + '=' + val;
    return url.match(pattern) ?
        url.replace(eval('/(' + arg + '=)([^&]*)/gi'), replaceText) :
        (url.match('[\?]') ? url + '&' + replaceText : url + '?' + replaceText);
}

export default {
    changeUrlArg
}
