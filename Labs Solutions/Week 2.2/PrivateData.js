function createCounter() {
    let count = 0;

    return {
        increment: function() {
            try {
                // Validate count before incrementing
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
console.log(counter.getCount()); // 0
counter.increment(); // 1
counter.increment(); // 2
counter.increment(); // 3
console.log(counter.getCount()); // 3

// Test error handling by manually setting count to an invalid value
counter.count = 'invalid'; // This won't affect the closure's count variable
//Add a variable that tires to get access the the count variable
console.log(counter.count); // undefined