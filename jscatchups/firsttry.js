// console.log('This is Node.js');


// !!!File system
// const fs = require('fs');

// fs.writeFileSync('hello.txt', 'Hello from node.js');
//////////////////////////////////////////////////////////////

// !!!Disconstruct
// const names = ['James', 'Diego', 'Emma', 'Roman'];
// const [a1, a2] = names;
// console.log(a1, a2);


// const nameList = {
//     b1: 'James',
//     b2: 'Diego',
//     b3: 'Emma'
// }

// const { b1, b3 } = nameList;

// console.log(b1, b3);
//////////////////////////////////////////////////////////////


// !!!Spread
// const namelistCopy = [...names];
// console.log(namelistCopy);
// console.log(names);
//////////////////////////////////////////////////////////////

// !!!Async functions
// const asyncFunc = () => {
//     const promise = new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve('Finished!');
//         }, 1000);
//     });
//     return promise;
// };

// setTimeout(() => {
//     console.log('first timer over...');
//     asyncFunc().then(info => {
//         console.log(info);
//         return asyncFunc().then(info2 => {
//             console.log(info2);
//         })
//     });
// }, 2000);

//////////////////////////////////////////////////////////////

// !!!template strings
let name = 'James';
let age = '24';
console.log(`My name is ${name}, and I'm ${age} years old.`);