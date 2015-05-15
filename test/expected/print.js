var print = (function() {
    return console.log;
})();
var first = (function() {
    return 'hello';
})();
var second = (function() {
    return 'world!';
})();
var main = (function(print, first, second) {
    print(first + ' ' + second);
})(print, first, second);
