// update if, init with true
var san = require('../../../dist/san.ssr');
var MyComponent = san.defineComponent({
    template: '<u>'
        + '<span san-if="cond" title="{{name}}">{{name}}</span>'
        + '</u>'
});

exports = module.exports = MyComponent;
