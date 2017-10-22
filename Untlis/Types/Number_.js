import {
    isNumber
} from "lodash";

import {
    TypeJudeg
} from "./../ToolsDecorate"
export function Number_(target, key, descriptor) {
    TypeJudeg(descriptor.value, isNumber, "Number");
    if (target) {
        var result = target;
        return (target, key, descriptor) => {
            TypeJudeg(descriptor.value, isNumber, "Number");
            descriptor.value = function () {
                return result;
            }
            return descriptor;
        }
    }
}