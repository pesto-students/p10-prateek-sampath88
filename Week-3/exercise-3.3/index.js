function createIncrement() {
  let count = 0;
  let name='jane';
  function increment() {
    count++;
  }

  let message = `Count is ${count}`;
  function log() {
    console.log(message);
  }
  return [increment, log];
}

const [increment, log] = createIncrement();

increment();
increment();
increment();
log();//output: Count is 0

//Explanation:
//Note: javascript execution has two phases:
// 1. Declaration and 
// 2. Initialization or execution.
/* 
    The value of 'message' is evaluated only when the createIncrement(); is invoked.
    So when the createIncrement(); is invoked, In the execution phase of createIncrement(); whatever the value count is having,
    that is evaluated in the 'message'.

    what will not happen here is:
    The 'message' right side expression is not evaluated, for each invokation of log(); or increment();
 */

//Closure
/* 
    Closure is like a blackbox or container.
    the closure will persist or (will keep the reference) to the dependencies that are required to execute 
    the internal or child functions.

    In the above code the Closure will persist only 'count' and 'message' variables.
    Not the 'name' variable (which i included for the better explanation).
    The 'name' variable is not included in the closure because,
    The name is not required to complete the execution of child functions.
*/
