import {
    createDefalutSetter
} from "./../Decorare/ToolsDecorate"
/* 
    The lazyinitializer alway is undefiend values. 
*/
const {
    defineProperty
} = Object;

export  function LazyInitialize_(target, key, descriptor) {
    const {
        writable,
        enumerable,
        value,
        initializer,
        configurable
    } = descriptor;
    return {
        enumerable,
        configurable,
        value() {
            if (this === target) {
                return;
            }
            const ret = initializer ?
                initializer.call(this) :
                value;
            defineProperty(this, key, {
                writable: true,
                enumerable,
                configurable,
                value: ret
            });
            return ret;
        }
    }
}