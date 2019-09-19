// select, null and undefined should select empty option, init valued
var san = require('../../../dist/san.ssr');

var MyComponent = san.defineComponent({
    template: '<div>'
        + '<b title="{{online}}">{{online}}</b>'
        + '<select value="{=online=}">'
        +   '<option s-for="p in persons">{{p}}</option>'
        +   '<option value="">empty</option>'
        + '</select>'
        + '</div>'
});

exports = module.exports = MyComponent;
