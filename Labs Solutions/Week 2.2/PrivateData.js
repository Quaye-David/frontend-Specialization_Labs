function createCounter() {
    let count = 0;

    return {
        increment: function() {
                count++;
                console.log(count);
        },
        
        getCount: function() {
            return count;
        }
    };
}

//log the count to show how the closure works
const counter = createCounter();
console.log(counter.getCount());
counter.increment();
counter.increment();
counter.increment();
console.log(counter.getCount());