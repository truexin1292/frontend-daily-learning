/**
 * Copyright (c) Baidu Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license.
 * See LICENSE file in the project root for license information.
 *
 * @file 获取声明式事件的监听函数
 */


var evalArgs = require('../runtime/eval-args');
var findMethod = require('../runtime/find-method');
var Data = require('../runtime/data');

/**
 * 获取声明式事件的监听函数
 *
 * @param {Object} eventBind 绑定信息对象
 * @param {Component} owner 所属组件环境
 * @param {Data} data 数据环境
 * @param {boolean} isComponentEvent 是否组件自定义事件
 * @return {Function}
 */
function getEventListener(eventBind, owner, data, isComponentEvent) {
    var args = eventBind.expr.args;

    return function (e) {
        e = isComponentEvent ? e : e || window.event;

        var method = findMethod(owner, eventBind.expr.name, data);
        if (typeof method === 'function') {
            method.apply(
                owner,
                args.length ? evalArgs(args, new Data({ $event: e }, data), owner) : []
            );
        }

        if (eventBind.modifier.prevent) {
            e.preventDefault && e.preventDefault();
            return false;
        }

        if (eventBind.modifier.stop) {
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            else {
                e.cancelBubble = true;
            }
        }
    };
}

exports = module.exports = getEventListener;
