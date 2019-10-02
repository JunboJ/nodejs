// console.log('This is Node.js');

// const fs = require('fs');

// fs.writeFileSync('hello.txt', 'Hello from node.js');

const names = ['James', 'Diego', 'Emma', 'Roman'];
const [a1, a2] = names;
console.log(a1, a2);


const nameList = {
    b1: 'James',
    b2: 'Diego',
    b3: 'Emma'
}

const { b1, b3 } = nameList;

console.log(b1, b3);


const namelistCopy = [...names];
console.log(namelistCopy);
console.log(names);