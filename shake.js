const escodegen = require('escodegen');
const { Parser, TreeShaker } = require('./ast');

const shakeItBaby = new TreeShaker(new Parser('module1'));
// make it one big bundle with new modules
const moduleStringOptimized = shakeItBaby.Modules
   .map(m => escodegen.generate(m))
   .join('');
// also make one bundled version with the old modules
// note: we have to specifiy the module prop on the module object
const moduleStringUnshaked = shakeItBaby.Unshaked
   .map(u => escodegen.generate(u.module))
   .join('');
// have a look at how different they look
console.log(moduleStringOptimized);
console.log(moduleStringUnshaked);
// let's count the characters
//  do a naive comparison => in percent
const impr = Math.floor(
  (
    1 -
    moduleStringOptimized.length /
    moduleStringUnshaked.length
  ) * 100
);

console.log('IMPROVEMENT: ', impr, '% 🎉');
