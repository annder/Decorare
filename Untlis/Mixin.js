export function Mixin(...mix) {
    if (!mix.length) {
        throw new Error("The mixin decorator must call arguments!");
    }
    if (mix.some(x => !isFunction(x))) throw new Error("The Mixin descorator must call the function type arguments!")
    return (target, key, descriptor) => {
        mix.forEach((f, index) => {
            defineProperty(target.prototype, mix[index].name, {
                value: f
            });
        })
    }
    return descriptor;
}