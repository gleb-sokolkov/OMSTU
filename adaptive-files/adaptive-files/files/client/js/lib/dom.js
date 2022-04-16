export default class DOMFunctions {

    static SM_BREAKPOINT = 600;

    static nextNeighbor(node) {
        let neighbor = node.nextSibling;
        while(neighbor && neighbor.nodeType !== 1) {
            neighbor = neighbor.nextSibling;
        }
        return neighbor;
    }
    
    /**
     * Finds elements in DOM, which matches some query string, and converts a result to Array  
     * @param {String} queryStr query string using to search elements, which matches this string 
     * @returns {Array.<Element>} Array of founded Elements
     */
    static findElements = (queryStr) => Array.prototype.slice.call(document.querySelectorAll(queryStr));
    
    static SM(a, b) {
        document.documentElement.clientWidth <= DOMFunctions.SM_BREAKPOINT ? a() : b();
    }
}