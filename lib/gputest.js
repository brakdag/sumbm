const {GPU} = require("gpu.js");
const gpu = new GPU();


const settings = {
    output: { x: 1}
};

const kernel = gpu.createKernel(function() {
  console.log(this)
    return 1;
}, settings);

console.log(kernel())

/*
let t= `GPU:${GPU.isGPUSupported}
KernelMap:${GPU.isKernelMapSupported}
OffscreenC${GPU.isOffscreenCanvasSupported}
WebGl${GPU.isWebGLSupported}
webgl2:${GPU.isWebGL2Supported}
headlessgl:${GPU.isHeadlessGLSupported}
canvas:${GPU.isCanvasSupported}
gpuhtml${GPU.isGPUHTMLImageArraySupported}
singlep:${GPU.isSinglePrecisionSupported}`
console.log(t)
*/
