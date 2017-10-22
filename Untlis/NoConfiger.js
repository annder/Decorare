function NoConfigur(target, value, descriptor) {
    descriptor.configurable = false;
    return descriptor;
}
export {
    NoConfigur
};