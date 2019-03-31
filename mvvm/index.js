function MVVM(options) {
    var vm = this;

    // 提取参数配置；
    this.$options = options;

    // 提取视图绑定；
    var el = this.$options.el || document.body;

    // 提取数据模型；
    var data = this._data = this.$options.data;

    // 把data属性的值，代理到vm对象上；
    // 属性代理，实现vm.xxx -> vm._data.xxx；
    Object.keys(data).forEach(function (key) {
        vm._proxy(key);
    });

    // 添加属性劫持；
    observe(data, vm);

    // 执行视图模板遍历；
    this.$compile = new TemplateCompiler(el, vm);
}

MVVM.prototype = {
    _proxy: function (key) {
        var vm = this;
        Object.defineProperty(vm, key, {
            configurable: false,
            enumerable: true,
            get: function proxyGetter() {
                // 通过vm.xxx 实际上访问的是vm._data.xxx；
                return vm._data[key];
            },
            set: function proxySetter(newVal) {
                // 更新vm.xxx 实际上更新的是vm._data.xxx；
                vm._data[key] = newVal;
            }
        });
    },
}

// 实现Observe拦截属性操作（劫持对象）
// Object.defineProperty 方法会直接在一个对象上定义一个新的属性；
// 核心利用Object.defineProperty对相关属性进行监听；
function observe(data) {
    // 判断数据对象存在
    if (!data || typeof data != 'object') {
        return;
    }

    Object.keys(data).forEach(function (key) {
        // 为对象属性重新定义数据
        defineReactive(data, key, data[key]);
    })
}

// 针对对象属性重新定义；
function defineReactive(target, key, val) {
    // 创建订阅对象；
    var sub = new Sub();
    // 针对复杂数据源监听；
    observe(val);

    Object.defineProperty(target, key, {
        enumerable: true,
        configurable: false,
        get: function () {
            // 由于需要在闭包内添加watcher，所以通过Sub定义一个全局target属性，暂存watcher，添加完移除；
            Sub.target && sub.addSub(Sub.target); // **** 只在第一次创建watcher时生效；
            return val;
        },
        set: function (newVal) {
            // 去掉无效监听；
            if (newVal === val) {
                return;
            }
            // 用新值替换旧值；
            val = newVal;
            // 通过订阅者（因为页面引用值的地方不只一处，所以直接全部更新）；
            sub.notify();
        }
    })
}

// templateCompiler.js
// 模板编译对象
function TemplateCompiler(el, vm) {
    // 判断是否是html元素，不是就用选择器直接获取；
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);
    // 绑定vm对象
    this.$vm = vm;
    if (this.$el) {
        // 打包元素内容创建视图片段
        this.$fragment = this.node2Fragment(this.$el);
        // 初始化，把上面获取的内容片段，交给编译器处理为解析后的内容；
        this.init();
        // 把解析后的内容添加到页面；
        this.$el.appendChild(this.$fragment);
    }
}

TemplateCompiler.prototype = {
    constructor: TemplateCompiler,
    // 通用判断函数
    isElementNode: function (el) {
        return el.nodeType === 1;
    },
    isTextNode: function (el) {
        return el.nodeType === 3;
    },
    isDirective: function (attrName) {
        return attrName.indexOf('v-') >= 0;
    },
    // 创建内存模板（方便在内存中解析内容）
    node2Fragment: function (el) {
        // 创建一个空节点；
        var fragment = document.createDocumentFragment(),
            child;
        // 将原生节点拷贝到fragment；
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }
        return fragment;
    },
    // 初始化
    init: function () {
        this.compileElement(this.$fragment);
    },
    // 编译模板
    compileElement: function (fragBox) {
        // 获取所有模板内容；
        var childNodes = fragBox.childNodes; // 获取每一个节点内容，以便逐行解析；
        var me = this; // 保留当前模板对象；

        // 变子节点集合为数组，再遍历；
        [].slice.call(childNodes||[]).forEach(function (node) {
            // 定义文本验证规则；
            var exprReg = /\{(.*)\}/; // 匹配{{xxx}}
            // 获取节点
            // var nodeType = node.nodeType; // 1 ：元素节点 3：文本节点
            var exp = node.TextContent;
            // 判断节点类型
            if (me.isTextNode(node) && exprReg.test(exp)) { // 文本节点
                // node.textContent.replaceAll(exprReg,);
                exp = exp.replace(exprReg, "$1").trim();
                // exp = "message";
                // 解析文本节点；
                me.compileText(node, exp);
            } else if (me.isElementNode(node)) { // 元素节点
                me.compile(node);
            }
        });
    },
    // 处理文本节点
    compileText: function (node, text) {
        compileUtil.text(node, this.$vm, text);
    },
    // 处理指令属性
    compile: function (node) {
        // 获取所有的属性
        var nodeAttrs = node.attribute,
            me = this;
        // 遍历所有属性；
        [].slice.call(nodeAttrs||[]).forEach(function (attr) {
            // 获取属性名称；
            var attrName = attr.name; // v-text , v-model
            // 判断属性名称是否是指令定义；
            if (me.isDirective(attrName)) {
                // 获取指令属性值；
                var exp = attr.value;
                // 获取指令类型；
                // var dirType = attrName.split('-')[1];
                var dirType = attrName.substr(2); // v-text >> text
                // 普通指令
                compileUtil[dirType] &&
                compileUtil[dirType](node, me.$vm, exp);
                // 目前支持v-text,v-model;
            }
        })
    }
}

var compileUtil = {
    text: function (node, vm, exp) {
        // 模型数据和视图绑定；
        this.bind(node, vm, exp, 'text'); // 文本处理，操作textContent；
    },
    model: function (node, vm, exp) {
        // 模型数据和视图绑定；
        this.bind(node, vm, exp, 'model'); // 模型指令处理，操作input.val

        // 获取自己和表达式对应模型的值；
        var me = this;
        var val = this.getVMVal(vm, exp);

        // 对输入框添加事件；
        node.addEndEventListener('input', function (e) {
            // 获取新输入的值；
            var newVal = e.target.value;
            // 判断重复；
            if (val === newVal) {
                // 更新到模型；
                me.setVMVal(vm, exp, newVal);
            }
        })
    },
    getVMVal: function (vm, expr) {
        // 目前只取一级；
        return vm[expr];
    },
    setVMVal: function (vm, expr, value) {
        vm[expr] = value;
    },
    // 根据不同指令，提供对应规则视图；
    bind: function (node, vm, exp, type) {
        // 1.找到更新函数；
        var updateFn = updater[type + 'Updater'];
        // 2.调用更新函数；
        updateFn && updateFn(node, vm[exp]);

        // 3.创建观察者，以备第二次；
        // 实例化订阅者，此操作会在对应属性消息订阅器中添加该订阅者watcher；
        new Watcher(vm, exp, function (value, oldValue) {
            // 一旦属性值有变化，会收到通知执行此更新函数，更新视图；
            updateFn && updateFn(node, value, oldValue);
        })
    }
}

// 更新函数；
var updater = {
    textUpdater: function (node, value) { // 针对文本节点更新；
        node.textContent = (typeof value === 'undefined' ? '' : value);
    },
    modelUpdater: function (node, value) { // 针对input输入框节点更新；
        node.value = (typeof value === 'undefined' ? '' : value);
    }
}

function Watcher(vm, exp, cb) {
    this.value = '';
    this.vm = vm;
    this.cb = cb && cb();
}

// 在原型上拓展观察者的获取和更新方法；
Watcher.prototype = {
    // 还原构造器；
    constructor: Watcher,
    // 属性值发生变化，通过订阅程序，触发监听事件函数；
    update: function () {
        // 获取最新值；
        var value = this.get();
        // 获取之前值；
        var oldValue = this.value;
        // 新老值进行比较；
        if (value !== oldValue) {
            this.value = value; // 更新值；
            // 执行更新视图回调；
            this.cb.call(this.vm, value, oldValue);
        }
    },
    // 取值
    get: function () {
        // 全局Sub订阅对象；
        Sub.target = this; // 将当前订阅者指向自己（当前观察者）；
        // Sub.target = watcherInstance;
        // 根据观察的表达式（属性名），从VM对象上，取得当前值；
        var value = this.vm[this.exp];
        // 清除全局订阅指向；
        Sub.target = null;
        // 返回值
        return value;
    }
}

function Sub() {
    this.subs = [];
}

Sub.prototype = {
    addSub: function (sub) {
        this.subs.push(sub);
    },
    // 通知方法；
    notify: function () {
        this.subs.forEach(function (sub) {
            sub.update(); // 触发观察者的更新；
        })
    }
}
