function trim(source) {
    if (typeof source != 'string')
        return undefined;
    var ltrim = /^\s+/;
    var rtrim = /\s+$/;
    source = source.toString().replace(ltrim, '');
    source = source.toString().replace(rtrim, '');
    return source;
}

(function(window, document) {
    var _$ = window.$;
    var _jQuery = window.jQuery;
    var jQuery = $ = window.$ = window.jQuery = function(selector) {
        return new jQuery.prototype.init(selector);
    }

    jQuery.fn = jQuery.prototype = {
        init : function(selector) {
            if (typeof selector == 'string')
                this.target = document.querySelectorAll(selector);
            else if ((typeof selector == 'object') && (typeof selector.length != 'undefined'))
                this.target = selector;
            else {
                this.target = Array();
                this.target[0] = selector;
            }
            this[Symbol.iterator] = function * () {
                for (var i = 0; i < this.target.length; ++i)
                    yield this.target[i];
            };
            return this;
        },
        get : function() {
            var index = arguments[0];
            if (typeof index == 'undefined')
                return this.target;
            else
            {
                return this.target[index];
            }
        },
        prop : function() {
            var property = arguments[0];
            if ((this.target != null) && (typeof this.target != 'undefined'))
            {
                if (this.target.length <= 0)
                    return undefined;
                for (var i = 0; i < this.target[0].attributes.length; ++i)
                    if (this.target[0].attributes[i].name == property)
                        return true;
                return false;
            }
            else
                return undefined;
        },
        attr : function() {
            var property = arguments[0];
            var value = arguments[1];
            if (typeof this.prop(property) == 'undefined')
                return undefined;
            if (typeof value == 'undefined') {
                for (var i = 0; i < this.target[0].attributes.length; ++i)
                    if (this.target[0].attributes[i].name == property)
                        return this.target[0].attributes[i].value;
                return undefined;
            }
            else {
                for (var i = 0; i < this.target.length; ++i) {
                    var isexisted = false;
                    for (var j = 0; j < this.target[i].attributes.length; ++j)
                        if (this.target[i].attributes[j].name == property) {
                            this.target[i].attributes[j].value = value;
                            isexisted = true;
                        }
                    if (!isexisted)
                        this.target[i].setAttribute(property, value);
                }
                return this.target;
            }
        },
        addClass : function() {
            var value = arguments[0];
            if (typeof value == 'undefined')
                return undefined;
            if (typeof value == 'string') {
                var classNames = value.split(' ');
                for (i = 0; i < this.target.length; ++i) {
                    if (this.target[i].nodeType == 1) {
                        if (!this.target[i].className && (classNames.length == 1))
                            this.target[i].className = value;
                        else {
                            var setClass = ' ' + this.target[i].className + ' ';
                            for (var j = 0; j < classNames.length; ++j) {
                                if (!~setClass.indexOf(' ' + classNames[j] + ' '))
                                    setClass += classNames[j] + ' ';
                            }
                            this.target[i].className = trim(setClass);
                        }
                    }
                }
            }
            else if (typeof value == 'function')
                return this.each(function(i, e) {return $(e).addClass(value(i, $(e).attr('class')))});
            return this;
        },
        rmAllClass : function () {
            if (this.target.length < 1)
                return undefined;
            for (var i = 0; i < this.target.length; ++i)
                if (this.target[i].nodeType == 1)
                    this.target[i].className = '';
            return this;
        },
        modClass : function() {
            var origin = arguments[0];
            var targetx = arguments[1];
            if ((typeof origin != 'string') || (typeof targetx != 'string'))
                return undefined;
            for (var i = 0; i < this.target.length; ++i) {
                if (this.target[i].nodeType == 1) {
                    if (!this.target[i].className)
                        this.target[i].className = targetx;
                    else {
                        var setClass = ' ' + this.target[i].className + ' ';
                        if (setClass.indexOf(' ' + origin + ' ') != -1)
                            setClass = setClass.toString().replace(' ' + origin + ' ', ' ' + targetx + ' ');
                        else
                            setClass += targetx + ' ';
                        this.target[i].className = trim(setClass);
                    }
                }
            }
            return this;
        },
        hasClass :function() {
            var target = arguments[0];
            if (typeof target != 'string')
                return undefined;
            for (var i = 0; i < this.target.length; ++i) {
                if (!this.target[i].className)
                    return false;
                else {
                    var cls = ' ' + this.target[i].className + ' ';
                    if (cls.indexOf(' ' + target + ' ') == -1)
                        return false;
                }
            }
            return true;
        },
        rmClass : function() {
            var value = arguments[0];
            if (typeof value != 'string')
                return undefined;
            for (var i = 0; i < this.target.length; ++i)
                if (this.target[i].nodeType == 1)
                    if (this.target[i].className) {
                        var setClass = ' ' + this.target[i].className + ' ';
                        if (setClass.indexOf(' ' + value + ' ') != -1)
                            setClass = setClass.toString().replace(' ' + value + ' ', ' ');
                        this.target[i].className = trim(setClass);
                    }
            return this;
        },
        each : function() {
            var fx = arguments[0];
            if (!(this.target.length > 0) || (typeof fx != 'function') || (fx.length != 2))
                return undefined;
            for (var i = 0; i < this.target.length; ++i)
                if (fx(i, this.target[i]) == false)
                    break;
        },
        styles : function () {
            return document.defaultView.getComputedStyle(this.target[0], null);
        },
        coor : function (index) {
            if (document.documentElement.getBoundingClientRect) {
                var query = this.target[0].getBoundingClientRect();
                switch (index) {
                    case 0 : return query.left;
                    case 1 : return query.top;
                    case 2 : return query.right;
                    case 3 : return query.bottom;
                }
            }
        }
    };

    jQuery.noConflict = function() {
        var removeAll = arguments[0] ? arguments[0] : false;
        window.$ = _$;
        if (removeAll)
            window.jQuery = _jQuery;
        return jQuery;
    };

    jQuery.prototype.init.prototype = jQuery.prototype;
})(window, document);
