function createCounter() {
    let count = 0;
    return {
        increment: function() {
            count++;
            console.log(this.count);
        },
        getCount: function() {
            return count;
        }
    };
}

// Test
const counter = createCounter();
console.log(counter.getCount()); // 0
counter.increment(); // 1
console.log(counter.getCount()); // 1