// This file will add both p5 instanced and global intellisence
// import module = require('p5');
import * as p5Global from 'p5/global'
// @ts-ignore
import module = require("@tensorflow/tfjs");


export = module;
export as namespace tf;
declare global {
    interface Window {
        tf: typeof module
    }
}
