// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
export const debounce = (func, wait) => {
    let timeout;
  
  
    return function executedFunction(...args) {
        console.log("simpa")
      const later = () => {
       
        clearTimeout(timeout);

        func(...args);
       
      };
  
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
    
  };