import _, {
    isFunction
} from "lodash"
import {
    TypeJudeg
} from "./../ToolsDecorate"
export function Function_(target, key, descriptor) {
    TypeJudeg(descriptor.value, isFunction, "function");
    if (target) {
        var result = target;
        return (target, key, descriptor) => {
            TypeJudeg(descriptor.value, isFunction, "function");
            descriptor.value = function () {
                return result;
            }
            return descriptor;
        }
    }
}