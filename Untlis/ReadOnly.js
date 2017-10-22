export default function ReandOnly_(target, key, descriptor) {
    descriptor.writable = false;
    return descriptor;
}