
define([
    'sum/target',
    'sum/expected',
    'deduct/target',
    'deduct/expected',
    'multiply/target',
    'multiply/expected',
    'divide/target',
    'divide/expected'
], function(
    sumTarget,
    sumExpected,
    deductTarget,
    deductExpected,
    multiplyTarget,
    multiplyExpected,
    divideTarget,
    divideExpected
) {
    console.log(sumTarget === sumExpected);
    console.log(deductTarget === deductExpected);
    console.log(multiplyTarget === multiplyExpected);
    console.log(divideTarget === divideExpected);
});
