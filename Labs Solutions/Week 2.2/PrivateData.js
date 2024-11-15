function createCounter() {
    let count = 0;

    return {
        increment: function() {
            try {
                if (typeof count !== 'number') {
                    throw new Error('Count must be a number');
                }
                count++;
                console.log(count);
            } catch (error) {
                console.error('Error incrementing count:', error.message);
            }
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

counter.count = 'invalid';
console.log(counter.count);