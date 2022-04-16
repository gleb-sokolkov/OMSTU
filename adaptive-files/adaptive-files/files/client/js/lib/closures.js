export default class CLOSURES {

    /**
     * A Timer function represents callback execution at each iteration with some delay and exit function
     * @param {Function} func callback function 
     * @param {Number} delay interval delay
     * @param {Function} exit_func checks condition of exit at each iteration. If it returns false, the timer moves to a new iteration, otherwise the timer stops execution  
     * @returns {Function} closure, that can be executed later  
     */
    static wrapTimeout = (func, delay, exit_func, f = () => {
        if(exit_func?.()) {
            return;
        }
        func();
        setTimeout(f, delay);
    }) => () => setTimeout(f, delay);


    /**
     * A Sleep function creates a promise-wrapper of the setTimeout function. It must be called with await operator. 
     */
    static sleep(delay) {
        return new Promise(resolve => setTimeout(resolve, delay));
    }
    
    static delayedFunc = (callback, delay, iterationEnds = true) => async (...params) => {
        if(iterationEnds) {
            iterationEnds = false;
            await this.sleep(delay);
            iterationEnds = true;
            callback(...params);
        }
    };

    static awaitFunc = (callback, delay, iterationEnds = true) => async (...params) => {
        if(iterationEnds) {
            iterationEnds = false;
            callback(...params);
            await this.sleep(delay);
            iterationEnds = true;
        }
    };
}
