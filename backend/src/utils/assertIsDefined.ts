export function assertIdDefind<T>(val: T): asserts val is NonNullable<T> {
    if(!val){
        throw Error("Expected 'val' to be defined, but recieved" + val);
    }
}