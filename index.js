var matrix=[]
const { GPU, input, Input } = require('gpu.js');
const gpu = new GPU();

console.time("matrix")
for(var i =0;i<20*3;i++){
matrix.push(Math.random())
}
console.timeEnd("matrix")

console.time("matrix2")
var matrix2 = new Array(1000000);
for(var i =0;i<1000000;i++){
matrix2[i]=Math.random();
}
console.timeEnd("matrix2")


console.time("for 1")
let sum=0
for(var i =0;i<matrix.length;i+=1){
  sum+=matrix[i]
}
console.log(sum)
console.timeEnd("for 1")


console.time("for 2")
 sum=0
for(var i =0,l=matrix.length;i<l;i+=1){
  sum+=matrix[i]
}
console.log(sum)
console.timeEnd("for 2")

console.time("reduce")
sum=matrix.reduce((a,e)=>a+e,0)
console.log(sum)
console.timeEnd("reduce")


const kernel = gpu.createKernel(function(a) {
  let sum=0;
  for(let i=0;i<100;i++){
  sum+=a[this.thread.x][this.thread.y][i]
}
return sum
})

let s=Math.ceil(matrix.length**(1/3))
let r= s**3-matrix.length
for(let i=r;i--;){
  matrix.push(0)
}
kernel.setOutput([s,s]);

console.time("gpu")
let res=kernel(input(new Float32Array(matrix),[s,s,s]))
console.timeEnd("gpu")

let resp=res.reduce((a,e)=>a+e.reduce((a,e)=>a+e,0),0)
console.log(resp)
