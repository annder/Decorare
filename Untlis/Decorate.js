const {
    defineProperty
} = Object;
import _, {
    isObject,
    isFunction
} from "lodash";

function handleFunc(fn) {
    var args = fn;
    var start = args.length - 1;
    return function () {
        var i = start;
        var result = args[start].apply(this, arguments);
        while (i--) result = args[i].call(this, result);
        return result;
    };
};
function Decorate(...func) {
    const isFunc = func.every(x => isFunction(x));
    if (!isFunc) {
        throw new Error("Fucker");
    }
    return (target, key, descriptor) => {
        const value_ = descriptor.value;
        const get_ = descriptor.get;
        const isGet = !!get_;
        const Handled = handleFunc(func);
        if (isGet) {
            return {
                ...descriptor,
                get() {
                    return Handled(get_())
                }
            }
        }
        return {
            ...descriptor,
            value() {
                return Handled(value_());
            }
        }
    }
}
export {Decorate};