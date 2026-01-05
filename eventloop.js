console.log(1);
setTimeout(() => {
  console.log(2);
}, 5000);
setTimeout(() => {
  console.log(3);
}, 2000);
setTimeout(() => {
  console.log(5);
}, 3000);
console.log(4);
// 1 4 3 5 2