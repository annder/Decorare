import {
    warn
} from "./ToolsDecorate"
const DEFAULT_MSG = "this function will be removed in futrue version.";
export  function Deprecate(target, key, descrptor, [msg = DEFAULT_MSG, options = {}]) {
    if (typeof descrptor.value !== "function") {
        throw new SyntaxError('Only functions can be marked as deprecated');
    }
    const ErrorFunc_Name = `${target.constructor.name}#${key}`;
    if (options.url) {
        msg += `\n\n ${options.url} for more details`;
    }
    return {
        ...descrptor,
        value: function () {
            warn(`DEPRECAION ${ErrorFunc_Name}:${msg}`);
            return descrptor.value.apply(this, arguments);
        }
    }
}