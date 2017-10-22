export function Time(target, key, descriptor) {
    if (!isUndefined(descriptor) && !isFunction(descriptor.value)) {
        throw new SyntaxError("Must is Function Type");
    }
    if (isObject(target)) {
        const descriptorName = key;
        const fn = descriptor.value;
        console.time(descriptorName);
        return {
            ...descriptor,
            value() {
                try {
                    return fn.apply(this, arguments);
                } finally {
                    console.timeEnd(descriptorName);
                }
            }
        }
    }
    if (isString(target) && target === "s") {
        return (target, key, descriptor) => {
            const fn = descriptor.value;
            const run_ = new Date().getTime();
            return {
                ...descriptor,
                value() {
                    try {
                        return fn.apply(this, arguments);
                    } finally {
                        var runed = new Date().getTime();
                        console.log(`${key}:${runed - run_}s`);
                    }
                }
            }
        }
    }
}