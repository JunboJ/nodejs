function counter () {
    let n = 0;
    return {
        count: function () {
            return n++;
        },
        reset: function () {
            n = 0;
        }
    }
}

let c = counter(),
    d = counter();

console.log(c.count());
console.log(d.count());
console.log(c.reset());
console.log(c.count());
console.log(d.count());
console.log(c.count());
console.log(d.count());