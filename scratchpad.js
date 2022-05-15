function plusMinus(arr) {
  const sorted = arr.sort();
  const hasZeros = sorted.includes(0);
  // console.log('hasZeros:', hasZeros)
  let zeros = [];
  let negs = [];
  let pos = [];

  if (hasZeros) {
    const firstZeroIdx = sorted.indexOf(0);
    const lastZeroIdx = sorted.lastIndexOf(0);
    zeros = sorted.slice(firstZeroIdx, lastZeroIdx + 1);
    negs = sorted.slice(0, firstZeroIdx);
    pos = sorted.slice(lastZeroIdx, -1);
  } else {
    for (i = 0; i < sorted.length; i++) {
      const curr = sorted[i];
      if (curr < 0) {
        negs.push(curr);
      } else {
        pos = sorted.slice(i, -1);
        break;
      }
    }
  }

  console.log((pos.length / arr.length).toPrecision(6)); // positives
  console.log((negs.length / arr.length).toPrecision(6)); // negatives
  console.log((zeros.length / arr.length).toPrecision(6)); // zeros
}

plusMinus([-4, 3, -9, 0, 4, 1, 3, 5, 6, 0, 0, 1, 3, -7, -8, -4, -9, -8, -1, 2, 3, 9, 0]);

// function findSmallest(A) {
//   let a = [...new Set(A)].sort().filter((num) => num > 0); //?
//   const hold = [];
//   hold.push(a[0]);
//   if (hold[0] !== 1) return 1;

//   for (let i = 1; i < a.length; i++) {
//     const curr = a[i]; //?
//     const currHold = hold[hold.length - 1]; //?
//     if (curr === currHold + 1) {
//       hold.push(a[i]);
//     } else {
//       return hold[hold.length - 1] + 1;
//     }
//   }
//   return hold[hold.length - 1] + 1;
// }

// findSmallest([8, 9, 4, 5, -1, -2, 7, 0, -1, 1, 2, 3, 4, 6, 1, 8, 2, 3]); //?

/*

calc('5 1 2 + 4 * + 3 -')

we have a string, lets use an array
split string into an array
we dont know what to do with each one until we come to an operator
so you need to save each one till you find an operator
loop > find a number > store it
loop > find an operator then get the latest two numbers you stored and use the operator to calculate the result
    but then store that result in the place that the two numbers were (end of the array)
in the end (last operator) you should have your latest evaluated result, the last number and the last operator
    calc that and store which makes the result array only have one number left which is your final answer.


? should the result be a float? or should it be an int?


*/

// function fizzBuzz(n) {
//   if (n === 0) console.log(n);
//   // if (Number(n)) console.log('NaN');
//   for (let i = 1; i <= n; i++) {
//     console.log(n % 15 === 0 ? 'FizzBuzz' : n % 3 === 0 ? 'Fizz' : n % 5 === 0 ? 'Buzz' : n); //?
//   }
// }

// fizzBuzz(3); //?
// fizzBuzz(5); //?
// fizzBuzz(1); //?
// fizzBuzz(15); //?
// fizzBuzz(28); //?
// fizzBuzz(32); //?
// fizzBuzz(33); //?
// fizzBuzz(135); //?
// fizzBuzz(15); //?

// const bigInput =
//   '-8 23 8 - 9 23 - - * 33 -8 / + 38 -14 - - -7 32 -19 - 11 + + + 14 22 - - 27 -9 - + 31 + -12 -11 - - 14 + 30 + 37 30 - + -9 + 7 - 37 + -5 13 / - 19 -2 -19 12 + - 23 + - -19 - + 6 + -17 + 17 + 5 36 + -10 + + 23 -8 - - 18 - 31 -16 - + 34 + -6 + 24 - 22 - -8 - 28 + -12 + 39 28 -7 + + -14 5 + 5 + 10 + + + -18 * 10 + -5 11 - 6 + - -12 31 + + 30 29 - - 39 + 13 -8 -5 + - 26 19 - * - 10 - -20 5 + + 0 - 28 - 19 / 28 + -18 - 28 20 + -5 -19 + + - -12 - 3 - 6 -15 + 4 - - 38 + -9 - 38 - 12 -20 - 10 5 -15 - - - + -11 + 5 + 2 - 28 + -9 -11 - + 37 - -17 31 - 2 + + -16 -12 - - 12 + 34 - 15 + 8 + 17 - 2 - 33 + -5 + 14 + 29 - 33 23 + 26 30 - + + 39 + 9 24 - - 20 15 + - 24 + 37 - 30 -1 - + 34 + -13 - 23 15 - - -5 -8 8 30 35 -9 22 + - - 36 -1 + 5 - - + 25 - + 27 - 16 + + + 39 - 15 - -3 + 5 -6 - + -6 -15 -7 - + / 13 - 18 + 4 + 29 + -17 0 -6 -20 -17 + 12 - + - + + -10 22 + + -11 - -2 38 - - -6 + 0 - -10 + -4 -10 + - 0 - 31 30 - 37 5 + + + -15 + 38 4 - -16 -17 + + + 38 - 27 -19 / 12 + /';

// function calc0(exp) {
//   if (exp.trim() === '') return 0;
//   const lastItem = exp.trim().slice(-1);
//   if (Number(lastItem)) throw new Error('Expression must end with an operator');

//   const items = exp
//     .trim()
//     .split(/\s+/)
//     .map((item) => {
//       return isFinite(item) ? +item : item;
//     });
//   // if (!isNaN(items[items.length - 1])) throw new Error('Expression must end with an operator');

//   const stack = [];

//   const calc = {
//     '+': (a, b) => a + b,
//     '-': (a, b) => a - b,
//     '*': (a, b) => a * b,
//     '/': (a, b) => a / b,
//   };

//   for (const op of items) {
//     stack.push(calc[op] ? calc[op](...stack.splice(-2)) : op);
//   }

//   return stack.pop();
// }

// calc0(' '); //?
// calc0(bigInput); //?
// calc0('2 3 4 + - 3'); //?

// function calc1(exp) {
//   if (exp.trim().length === 0) return 0;

//   let items = exp
//     .trim()
//     .split(/\s+/)
//     .map((item) => (+item ? +item : item)); //?

//   if (!isNaN(items[items.length - 1])) {
//     throw new Error('Expression must end with an operator');
//   }

//   let calc = {
//     '+': (a, b) => a + b,
//     '-': (a, b) => a - b,
//     '*': (a, b) => a * b,
//     '/': (a, b) => a / b,
//   };

//   let stack = [];

//   items.forEach((item) => {
//     stack.push(calc[item] ? calc[item](...stack.splice(-2)) : item);
//   });

//   return stack.pop();
// }

// calc1(bigInput); //?
// calc1('5 1 2 + 4 * + 3 -'); //?
// calc1(' '); //?
// // calc1('3 4 * 4'); //?

// function calc2(exp) {
//   if (exp.trim().length === 0) return 0;

//   const items = exp.trim().split(/\s+/);

//   if (!isNaN(items[items.length - 1])) {
//     throw new Error('Expression must end with an operator');
//   }

//   const stack = [];

//   items.forEach((item) => {
//     if (isFinite(item)) {
//       stack.push(parseFloat(item));
//     } else if (item === '+') {
//       stack.push(stack.pop() + stack.pop());
//     } else if (item === '*') {
//       stack.push(stack.pop() * stack.pop());
//     } else if (item === '-' || item === '/') {
//       const b = stack.pop();
//       const a = stack.pop();
//       if (item === '-') {
//         stack.push(a - b);
//       } else {
//         stack.push(a / b);
//       }
//     }
//   });

//   return stack.pop();
// }

// calc2(bigInput); //?
// calc2('  '); //?
// // calc2('3 4 * 4'); //?

// function calc3(exp) {
//   if (exp.trim() === '') return 0;

//   const items = exp.trim().split(/\s+/);

//   if (!isNaN(items[items.length - 1])) {
//     throw new Error('Expression must end with an operator');
//   }

//   if (!isNaN(items[items.length - 1])) {
//     throw new Error('Expression must end with an operator!');
//   }

//   const stack = [];

//   items.forEach((item) => {
//     switch (item) {
//       case '+':
//         stack.push(stack.pop() + stack.pop());
//         break;

//       case '*':
//         stack.push(stack.pop() * stack.pop());
//         break;

//       case '-':
//         const b = stack.pop();
//         const a = stack.pop();
//         stack.push(a - b);
//         break;

//       case '/':
//         const d = stack.pop();
//         const c = stack.pop();
//         stack.push(c / d);
//         break;

//       default:
//         stack.push(parseFloat(item));
//         break;
//     }
//   });

//   return stack.pop();
// }

// calc3(bigInput); //?
// calc3('2 1 +'); //?
// calc3(''); //?
// // calc3('3 4 * 4'); //?

// function calc4(exp) {
//   const stack = [];
//   const items = exp.trim().split(/\s+/);

//   if (!isNaN(items[items.length - 1])) {
//     throw new Error('Expression must end with an operator!');
//   }

//   items.forEach((item) => {
//     switch (item) {
//       case '+':
//         const b = stack.pop();
//         const a = stack.pop();
//         stack.push(a + b);
//         break;

//       case '-':
//         const d = stack.pop();
//         const c = stack.pop();
//         stack.push(c - d);
//         break;

//       case '*':
//         const f = stack.pop();
//         const e = stack.pop();
//         stack.push(e * f);
//         break;

//       case '/':
//         const h = stack.pop();
//         const g = stack.pop();
//         stack.push(g / h);
//         break;

//       default:
//         stack.push(parseFloat(item));
//         break;
//     }
//   });
//   return stack.pop() || 0;
// }

// calc4(bigInput); //?
// calc4('5 1 2 + 4 * + 3 -'); //?
// // calc4('4 5 - 4'); //?

// function calc5(exp) {
//   const stack = [];
//   const items = exp.trim().split(/\s+/);

//   if (!isNaN(items[items.length - 1])) {
//     throw new Error('Expression must end with an operator!');
//   }

//   items.forEach((e) => {
//     if (e === '+' || e === '-' || e === '*' || e === '/') {
//       const vars = [stack.pop(), stack.pop()];
//       stack.push(eval(`${vars[1]} ${e} ${vars[0]}`)); // !! NICE AND SHORT BUT EVAL IS A BAD IDEA !!
//     } else stack.push(parseFloat(e));
//   });

//   return stack[0] || 0;
// }

// calc5(bigInput); //?
// calc5('5 1 2 + 4 * + 3 -'); //?
// // calc5('2 4 - 4'); //?
