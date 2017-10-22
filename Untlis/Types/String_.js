import _, {
    isString
} from "lodash"
import {TypeJudeg} from "./../ToolsDecorate"
export function String_(target, key, descriptor) {
    TypeJudeg(descriptor.value, isString, "string");
    if (target) {
        var result = target;
        return (target, key, descriptor) => {
            TypeJudeg(descriptor.value, isString, "string");
            descriptor.value = function () {
                return result;
            }
            return descriptor;
        }
    }
}