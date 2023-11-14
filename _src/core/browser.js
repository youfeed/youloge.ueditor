/**
 * 浏览器判断模块
 * @yoyuloge 不支持IE safai 直接返回静态值
 * @module UE.browser
 */

var browser = UE.browser = {"ie":false,"opera":false,"webkit":true,"mac":false,"quirks":false,"gecko":false,"chrome":119,"version":537,"isCompatible":true};
//快捷方式
var ie = browser.ie,webkit = browser.webkit,gecko = browser.gecko,opera = browser.opera;