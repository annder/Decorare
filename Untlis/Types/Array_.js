import {
    isArray
} from "lodash";
import {
    TypeJudeg
} from "./../ToolsDecorate"
export function Array_(target, key, descriptor) {
    TypeJudeg(descriptor.value, isArray, "array");
    if (target) {
        var result = target;
        return (target, key, descriptor) => {
            TypeJudeg(descriptor.value, isArray, "array");
            descriptor.value = function () {
                return result;
            }
            return descriptor;
        }
    }
}