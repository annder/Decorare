import _ from "lodash"
const {
    isFunction,
    isString,
    isUndefined
} = _;
export default function TypeJudeg(values, types, ErrorCoder) {
    if (!isFunction(values)) {
        throw new Error(`The decorator must be a function type`);
    }
    if (isUndefined(values)) {
        throw new Error(`Incoming parameters cannot be undefined`);
    }
    if (!types(values())) {
        throw new Error(`The type of parameter you enter must be a ${ErrorCoder}`)
    };
}