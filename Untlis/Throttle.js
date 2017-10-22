///try {};
//loading
import _, {
    isNumber,
    isObject,
    isBoolean
} from "lodash";


function Thorttle(target, key, descriptor) {
    const RunTime = target;
    const Options = key;
    if (isNumber(target) && isObject(key)) {
        if (Options.hasOwnProperty("leading") &&
            isBoolean(Options["leading"]) &&
            Options["leading"]) {
            return (target, key, descriptor) => {
                return descriptor;
            }
        }
        return (target, key, descriptor) => {
            setTimeout(() => {
                return descriptor;
            }, RunTime)
        }
    }
    if (isNumber(target)) {
        return (target, key, descriptor) => {
            setTimeout(() => {
                return descriptor;
            }, RunTime)
        }
    }
    setTimeout(() => {
        return descriptor
    }, 300);
}

export {
    Thorttle
}