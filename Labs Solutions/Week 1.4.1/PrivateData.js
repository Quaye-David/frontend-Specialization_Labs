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

// Test
const counter = createCounter();
console.log(counter.getCount()); // 0
counter.increment(); // 1
console.log(counter.getCount()); // 1
counter.increment();// 2
console.log(counter.getCount()); // 2

// Test error handling by manually setting count to an invalid value
counter.count = 'invalid'; // This won't affect the closure's count variable
counter.increment(); // Error: Count must be a number
console.log(counter.getCount()); // 1 (unchanged)
//Add a variable that tires to get access the the count variable
console.log(counter.count); // undefined