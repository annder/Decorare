import _ from "lodash";
const {
    isFunction,
    isEqual
} = _;
const FUNCTION_REGEXP = /^function ([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?(\([^\)]*\))[\s\S]+$/;

function handleArgMate(f, g) {
    var Mate = [];
    f.toString().replace(FUNCTION_REGEXP, (a, b, c) => {
        Mate.push(c);
    })
    g.toString().replace(FUNCTION_REGEXP, (a, b, c) => {
        Mate.push(c);
    })
    if (!isEqual(Mate[0], Mate[1])) {
        throw new Error("The parameters must be consistent");
    }
}

export function Override(target, key, descriptor) {
    const getSuperPrototype = target.__proto__;
    const SuperPrototypeKey = getOwnPropertyNames(getSuperPrototype);
    const SuperFunc = getSuperPrototype[SuperPrototypeKey[1]];
    const fn = descriptor.value;
    if (!isFunction(SuperFunc)) {
        throw new SyntaxError("A subclass must be a function type");
    }
    if (!isFunction(fn)) {
        throw new SyntaxError("The parent class must be a function type");
    }
    handleArgMate(fn, SuperFunc);
    if (fn.length !== SuperFunc.length) {
        throw new Error("The parameter must be the same as the parent class parameter");
    }

    if (key !== SuperFunc[1]) {
        const ShowdownCheckFunc = [
            f => f.toUpperCase(),
            f => f.toLowerCase(),
            f => f + 's',
            f => f.slice(0, 1),
            f => f.slice(-1, f.length)
        ]
        for (let i = 0; i < ShowdownCheckFunc.length; i++) {
            var fn_ = ShowdownCheckFunc[i];
            var HandledKey = fn_(key);
            if (HandledKey == key) {
                console.error(`Mabey you entry function name is ${key}`);
                break;
            } else {
                throw new Error("The parameter must be the same as the parent class parameter");
            };
        }
    }
    return { ...descriptor
    }
}