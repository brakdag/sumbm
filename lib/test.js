const { GPU } = require('gpu.js');
const gpu = new GPU();
let a = []
let b = []
for(let i = 0;i<512;i++){
  let g = []
  for (let x =0;i<512;i++){
    g.push(Math.random())
  }
  a.push(g)
}

for(let i=0;i<512;i++){
  let g = []
  for (let x=0;i<512;i++){
    g.push(Math.random())
  }
  b.push(g)
}

console.log(a,b)

const multiplyMatrix = gpu.createKernel(function(a, b) {
    let sum = 0;
    for (let i = 0; i < 2; i++) {
        sum += a[this.thread.y][i] * b[i][this.thread.x];
    }
    return sum;
}).setOutput([a.length, b.length]);
const c = multiplyMatrix(a, b);
console.log(c)
