const {
    getOwnPropertyDescriptor,
    getOwnPropertySymbols,
    getOwnPropertyNames,
    defineProperty,
    getPrototypeOf
} = Object;
let map;

function bind(obj, fn) {
    if (fn["bind"]) {
        return fn.bind(obj);
    }
    return function __bind__() {
        return fn.apply(obj, arguments);
    }
}

function createDefalutSet(key) {
    return function __create__(newValue) {
        defineProperty(this, key, {
            configurable: true,
            writable: true,
            enumerable: true,
            value: newValue
        })
        return newValue;
    }
}

function getBoundSuper(obj, fn) {
    if (typeof WeakMap == "undefined") throw new Error("Sorry");
    if (!map) map = new WeakMap();

    if (map.has(obj) === false) {
        map.set(obj, new WeakMap())
    }
    const getSuper = map.get(obj);
    if (getSuper.has(fn) === false) {
        getSuper.set(fn, bind(fn, obj))
    }
    return getSuper.get(fn);
}

function getKeys() {
    return getOwnPropertySymbols ? (obj) =>
        getOwnPropertyNames(obj)
        .concat(getOwnPropertySymbols(obj)) :
        getOwnPropertyNames;
}

function autoBindClass(Class) {
    const descs = getOwnPropertyDescriptor(Class.prototype);
    const keys = getKeys(descs);
    for (let i = 0, l = keys.length; i < l; i++) {
        var key = keys[i];
        var desc = descs[key];
        if (typeof desc.value !== 'function' || key === "constructor") {
            continue;
        }
        defineProperty(Class.prototype, key)
    }
}

function autobindMethod(target, key, {
    value: fn,
    configurable,
    enumerable
}) {
    if (typeof fn !== 'function') {
        throw new Error("...use")
    }
    const {
        constructor
    } = target;
    return {
        configurable,
        enumerable,
        get() {
            if (this === target) {
                return fn;
            }
            if (this.constructor !== constructor &&
                getPrototypeOf(this).constructor === constructor) {
                return fn;
            }
            if (this.constructor !== constructor && key in this.constructor.prototype) {
                return getBoundSuper(this, fn)
            }
            const boundFn = bind(fn, this);
            defineProperty(this, key, {
                configurable: true,
                writable: true,
                enumerable: true,
                value: boundFn
            });
            return boundFn;
        },
        set: createDefalutSet(key)
    }
}

function Handle(args) {
    if (args.length === 1) {
        return autoBindClass(...args);
    } else {
        return autobindMethod(...args);
    }
}


function autoBind(...arg) {
    if (arg.length === 0) {
        return function () {
            return Handle(arguments);
        }
    } else {
        return Handle(args);
    }
}

//addition value to WeackMap Struct,  invoke class methonds while call agin input on.