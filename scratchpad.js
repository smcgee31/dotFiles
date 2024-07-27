// const util = require('util');
// const execSync = util.promisify(require('child_process').exec);

// const getFilesLists = async (args) => {
//   const lists = [];
//   try {
//     for await (const arg of args) {
//       console.log(`getting files for: '${arg}'`);
//       const { err, stdout, stderr } = await execSync(`ag -wl ${arg}`);
//       if (stdout) {
//         console.log(`stdout: ${stdout}`);
//       }
//       if (stderr) {
//         console.error(`stderr: ${stderr}`);
//       }
//       if (err) {
//         console.error('Whoops - Error:', err);
//         return;
//       }
//       if (stderr) {
//         console.error(`stderr: ${stderr}`);
//       }
//       lists.push(stdout.toString().split('\n').slice(0, -1));
//     }

//     return lists;
//   } catch (error) {
//     if (error.code === 1 && error.stdout === '' && error.stderr === '') {
//       console.error('No results, you may have misspelled your search string...');
//     } else {
//       console.error('here is your Error:', error);
//     }
//   }
// };

// const intersection = (arrays) => {
//   return arrays.reduce((a, b) => a.filter((c) => b.includes(c)));
// };

// const isAgInstalled = async () => {
//   const { err, stdout, stderr } = await execSync('which ag');
//   if (err) {
//     console.error('Error:', err);
//     return;
//   }
//   if (stderr) {
//     console.log(`Error:\n${stderr}`);
//     return false;
//   }
//   return true;
// };

// getFilesLists(['asdf', 'blarg']);

// =================================================================================

// Write a function called ‘vowel2index’ that takes a string and
// replaces all the vowels [a,e,i,o,u] with their respective positions
// within that string.
// function vowel2idx(str) {
//   const vowels = ['a', 'e', 'i', 'o', 'u'];

// method 1 - for loop (any loop would essentially be the same/similar)
// const result = str.split('');
// for (let i = 0; i < result.length; i++) {
//   if (vowels.includes(result[i])) {
//     result[i] = i;
//   }
// }
// return result.join('');

// method 2 - split/map/join
// return str
//   .split('')
//   .map((letter, index) => (vowels.includes(letter) ? index : letter))
//   .join('');

// method 3 - recursive
// const result = str.split('');
// const recurse = (arr, index) => {
//   if (index === arr.length) {
//     return arr.join('');
//   }
//   if (vowels.includes(arr[index])) {
//     arr[index] = index;
//   }
//   return recurse(arr, index + 1);
// };
// return recurse(result, 0);
// }

// console.log(vowel2idx('The quick red fox jumped over the lazy brown dog'));

// const vowel2Index = (string) => {
//   return string.replace(/[aeiou]/gi, (vowel, offset) => offset);
// };
// console.log(vowel2Index('The quick red fox jumped over the lazy brown dog'));

// =================================================================================

// const triangle = (num) => {
//   let stars = [];
//   let totalStars = 0;

//   for (let i = 0; i < num; i++) {
//     stars.push(i + 1);
//   }

//   for (let i = 0; i < stars.length; i++) {
//     totalStars += stars[i];
//   }
//   return totalStars;
// };

// console.log(triangle(3));

// =================================================================================

// const calculateAge1 = (birthDate, otherDate) => {
//   let age;
//   birthDate = new Date(birthDate);
//   otherDate = new Date(otherDate);

//   let years = otherDate.getFullYear() - birthDate.getFullYear();
//   console.log(years);
//   if (
//     otherDate.getMonth() < birthDate.getMonth() ||
//     (otherDate.getMonth() == birthDate.getMonth() && otherDate.getDate() < birthDate.getDate())
//     ) {
//       years--;
//     }
//   return (age = years);
// };

// console.log(calculateAge1('02/19/1982', '09/07/2023'));

// const calculateAge2 = (birthDate, otherDate) => {
//   // const birth = new Date(birthDate);
//   // const other = new Date(otherDate);
//   // console.log(birth);
//   // console.log(other);

//   const msInYear = 1000 * 60 * 60 * 24 * 365; // ms in a year

//   // console.log(Math.floor((other - birth) / msInYear));

//   const birth = new Date(birthDate).getTime();
//   const other = new Date(otherDate).getTime();

//   console.log(Math.floor((other - birth) / msInYear));
// };

// calculateAge2('02/19/1982', '09/07/2023');

// =================================================================================

//CHALLENGE #6
// Given two integers a and b, which can be positive or negative, find the sum of all the integers between and including them and return it.
// If the two numbers are equal return a or b.
// Note: a and b are not ordered!!
//1, 0) --> 1 (1 + 0 = 1)
//(1, 2) --> 3 (1 + 2 = 3)
//(0, 1) --> 1 (0 + 1 = 1)
//(1, 1) --> 1 (1 since both are same)
//(-1,0) --> -1 (-1 + 0 = -1)
//(-1, 2) --> 2 (-1 + 0 + 1 + 2 = 2)

// const getSum = (a, b) => {
//   if (a === b) return a;
//   const [from, to] = [a, b].sort();
//   // const fullSet = [...Array(to - from + 1).keys()].map((x) => x + from);
//   // const result = fullSet.reduce((acc, cur) => acc + cur, 0);
//   // return result;
//   return [...Array(to - from + 1).keys()].map((x) => x + from).reduce((acc, cur) => acc + cur, 0);
// };

// console.log(getSum(4, -1));

// let from = -1;
// let to = 3;
// // console.log([...Array(to - from + 1).keys()].map((x) => x + from));
// console.log(Array(5)); // [ , , , , ]
// console.log([...Array(5)]); // [ undefined, undefined, undefined, undefined, undefined ]
// console.log([...Array(5).keys()]); // [ 0, 1, 2, 3, 4 ]
// console.log([...Array(to - from + 1).keys()].map((x) => x + from)); // [ -1, 0, 1, 2, 3 ]

// // instead of looping to build a full array of numbers then looping to add them up
// // just add them as you go in the same loop you would have used to build the array
// const makeSum = (a, b) => {
//   if (a === b) return a;
//   const sorted = [a, b].sort();
//   let sum = sorted[0];
//   for (let i = sorted[0]; i < sorted[1]; i++) {
//     sum += i + 1;
//   }
//   return sum;
// };

// console.log(makeSum(4, -1));

// const getSum2 = (a, b) => {
//   if (a === b) return a;
//   if (a < b) {
//     return a + getSum(a + 1, b);
//   } else if (a > b) {
//     return a + getSum(a - 1, b);
//   }
// };

// console.log(getSum2(4, -1));

// =================================================================================

//CHALLENGE #7
// write a function that returns camelCase or PascalCase from a string that isn't

// const toCamelCase = (str) => {
//   str = str.split('');
//   return str
//     .map((el, i) => {
//       console.log(el);
//       if (el === '-' || el === '_') {
//         el = str[i + 1].toUpperCase();
//         str.splice(i + 1, 1);
//       }
//       return el;
//     })
//     .join('');
// };

/*
given a list of temps [int] both pos and neg
find the temp closest to zero, favor the positive over the neg if equal ones exist.
*/

const nums = [-2, -4, 5, 3, 4, 2, -5];

const closestToZero = (n) => {
  if (n.length == 0) return null;
  if (n.length == 1) return n[0];
  if (n.includes(0)) return 0;
  const pos = n.filter((x) => x > 0).sort((a, b) => a - b);
  const neg = n.filter((x) => x < 0).sort((a, b) => a - b);
  // const sortedPos = pos.sort((a, b) => a - b);
  // const sortedNeg = neg.sort((a, b) => a - b);
  console.log(pos);
  console.log(neg);
  // compare the absolute value of the first element of each array

  return Math.abs(pos[0]) < Math.abs(neg[0]) ? pos[0] : neg[length - 1];
};

console.log(closestToZero(nums));
