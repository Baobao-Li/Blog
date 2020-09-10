(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{593:function(n,e,t){"use strict";t.r(e);var r=t(4),a=Object(r.a)({},(function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[t("table",[t("thead",[t("tr",[t("th",[n._v("方法")]),n._v(" "),t("th",[n._v("说明")])])]),n._v(" "),t("tbody",[t("tr",[t("td",[n._v("Number.isFinite()")]),n._v(" "),t("td",[n._v("判断一个值是不是有限的")])]),n._v(" "),t("tr",[t("td",[n._v("Number.isNan()")]),n._v(" "),t("td",[n._v("判断一个值是不是NaN")])]),n._v(" "),t("tr",[t("td",[n._v("Number()")]),n._v(" "),t("td",[n._v("类型转换")])]),n._v(" "),t("tr",[t("td",[n._v("Numbar.parseInt()")]),n._v(" "),t("td",[n._v("将字符串转化为整数")])]),n._v(" "),t("tr",[t("td",[n._v("Numbar.parseFloat()")]),n._v(" "),t("td",[n._v("将字符串转化为小数")])]),n._v(" "),t("tr",[t("td",[n._v("Numbar.isInteger()")]),n._v(" "),t("td",[n._v("判断一个数是不是一个整数")])]),n._v(" "),t("tr",[t("td",[n._v("Number.isSafeInteger()")]),n._v(" "),t("td",[n._v("判断是不是一个安全的数")])]),n._v(" "),t("tr",[t("td",[n._v("Math.cbrt()")]),n._v(" "),t("td",[n._v("用于计算一个数的立方根")])]),n._v(" "),t("tr",[t("td",[n._v("Math.trunc()")]),n._v(" "),t("td",[n._v("用于去除一个数的小数部分，返回整数")])])])]),n._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v("1、如果参数类型不是数值，Number.isFinite一律返回false\n2、如果参数类型不是NaN，Number.isNaN一律返回false\n注:es5含有隐式转换，es6不含有隐式转换\n\n// es5\nisFinite(25) // true\nisFinite(\"25\") // true\n// es6\nNumber.isFinite(25) // true\nNumber.isFinite(\"25\") // false\n\n\n// es5\nisNaN(NaN) // true\nisNaN(\"NaN\") // true\n// es6\nNumber.isNaN(NaN) // true\nNumber.isNaN(\"NaN\") // false\nNumber.isNaN(1) // false\n\n3、Number.parseInt(), Number.parseFloat()\n// ES5的写法\nparseInt('12.34') // 12\nparseFloat('123.45#') // 123.45\n\n// ES6的写法\nNumber.parseInt('12.34') // 12\nNumber.parseFloat('123.45#') // 123.45\n\n这样做的目的，是逐步减少全局性方法，使得语言逐步模块化。\nNumber.parseInt === parseInt // true\nNumber.parseFloat === parseFloat // true\n\n4、Number.isInteger()用来判断一个数值是否为整数\nNumber.isInteger(25) // true\nNumber.isInteger(25.1) // false\nNumber.isInteger(25.0) // true\n// 如果参数不是数值，Number.isInteger返回false\nNumber.isInteger() // false\nNumber.isInteger(null) // false\nNumber.isInteger('15') // false\nNumber.isInteger(true) // false\n\n\n5、Number.isSafeInteger()则是用来判断一个整数是否落在这个范围之内\nNumber.isSafeInteger('a') // false\nNumber.isSafeInteger(null) // false\nNumber.isSafeInteger(NaN) // false\nNumber.isSafeInteger(Infinity) // false\nNumber.isSafeInteger(-Infinity) // false\n\nNumber.isSafeInteger(3) // true\nNumber.isSafeInteger(1.2) // false\nNumber.isSafeInteger(9007199254740990) // true\nNumber.isSafeInteger(9007199254740992) // false\n\nNumber.isSafeInteger(Number.MIN_SAFE_INTEGER - 1) // false\nNumber.isSafeInteger(Number.MIN_SAFE_INTEGER) // true\nNumber.isSafeInteger(Number.MAX_SAFE_INTEGER) // true\nNumber.isSafeInteger(Number.MAX_SAFE_INTEGER + 1) // false\n\n6、Math.trunc方法用于去除一个数的小数部分，返回整数部分\nMath.trunc(4.1) // 4\nMath.trunc(4.9) // 4\nMath.trunc(-4.1) // -4\nMath.trunc(-4.9) // -4\nMath.trunc(-0.1234) // -0\n\n// 对于非数值，Math.trunc内部使用Number方法将其先转为数值\nMath.trunc('123.456') // 123\nMath.trunc(true) //1\nMath.trunc(false) // 0\nMath.trunc(null) // 0\n\n// 对于空值和无法截取整数的值，返回NaN\nMath.trunc(NaN);      // NaN\nMath.trunc('foo');    // NaN\nMath.trunc();         // NaN\nMath.trunc(undefined) // NaN\n\n7、Math.cbrt方法用于计算一个数的立方根\nMath.cbrt(-1) // -1\nMath.cbrt(0)  // 0\nMath.cbrt(1)  // 1\nMath.cbrt(2)  // 1.2599210498948734\n对于非数值，Math.cbrt方法内部也是先使用Number方法将其转为数值\nMath.cbrt('8') // 2\nMath.cbrt('hello') // NaN\n\n")])])]),t("h4",{attrs:{id:"_1、设置默认值"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1、设置默认值"}},[n._v("#")]),n._v(" 1、设置默认值")]),n._v(" "),t("ul",[t("li",[n._v("回调里面使用箭头函数，this指向上级对象")]),n._v(" "),t("li",[n._v("回调里面使用function,this指向当前对象")])]),n._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v(" // es5\n let fun = function(val){\n    var val = val || 666;\n    return val\n }\n console.log(fun())\n  \n \n // es6\n let fun = (val=666) => {\n     return val;\n }\n // 简写\n let fun = (val=666) => val;\n \n // 函数默认值的注意事项\n // 定义形参默认值，需要注意：先声明后使用，遵循声明变量的规则\n let fun = (val,val) => { // 报错\n    console.log(val)\n }\n let fun = (val2 = 2,val1 = val2) => { \n    console.log(val1)\n }\n fun();\n \n \n // 设置形参后，函数内部的私有变量如果用let命令来声明变量，不得重复定义\n let fun = (val) => {  // 报错\n     let val = 666;\n     console.log(val)\n }\n fun(555);\n \n \n // 获取函数所有形参\n // es5\n let fun = function(){\n    console.log(arguments); // 类数组\n    [...arguments].forEach(item=>{ // 通过...把它转为一个数组\n        console.log(item);\n    })\n }\n fun(1,2,3,4,5)\n \n // es6\n // 箭头函数没有arguments对象\n // reset 参数返回一个实参的数组的集合\n let fun = (...reset) => {\n     console.log(reset)\n     reset.forEach(item=>{ \n        console.log(item);\n    })\n }\n fun(1,2,3,4,5,6)\n \n \n \n")])])]),t("h4",{attrs:{id:"_2、扩展运算符"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2、扩展运算符"}},[n._v("#")]),n._v(" 2、扩展运算符 ...")]),n._v(" "),t("ul",[t("li",[n._v("可以展开一个数组")])]),n._v(" "),t("h4",{attrs:{id:"_3、伪逗号"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3、伪逗号"}},[n._v("#")]),n._v(" 3、伪逗号")]),n._v(" "),t("ul",[t("li",[n._v("es2017允许你去写一个逗号")])]),n._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v("let obj = {\n    name:'zs',\n    age:18,\n}\n")])])]),t("h4",{attrs:{id:"_4、数组的扩展"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4、数组的扩展"}},[n._v("#")]),n._v(" 4、数组的扩展")]),n._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v('1、扩展运算符\n// 将数组转化为数组项的参数系列\nlet arr1 = [1,2,3,4];\nlet arr2 = [...arr1];\n\n\n2. Array.from(arr)\n// 将类似数组、可以遍历对象(包括set map解构类型的数据) 转为数组\n...arr 展开数组的每一项   [...arr] 转为一个数组\n\n\n3、数组的空值/空位\nlet arr = new Array(5);\n// 长度为5   a[0]为undefined\n\n\n4、Array.of()  用来将一组参数序列转为数组,可以用来代替new Array()\nlet arr = Array.of(1,2,3,4,5);\nconsole.log(arr)\n// 不传参为空数组\n\n\n5、Array.copyWithin(target,start,end)\n用数组中的一些项，替换数组中的值\n// target(必须)： 要替换项的下标\n// start(可选)： 替换的起始下标\n// end(可选)： 替换的结束下标\nlet arr = [1, 4, 2, 5, 3, 2];\nconsole.log(arr.copyWithin(0, 4))\n// [ 3, 2, 2, 5, 3, 2 ]\n\n\n6、Array.find()   返回满足条件的第一个项\nlet arr = [2,8,4,3];\nlet res = arr.find((item,index,array)=>{\n    return item>2;\n})\nconsole.log(res) // 8\n\n\n7、Array.findIndex()   返回满足条件的第一个项下标\nlet arr = [2,8,4,3];\nlet res = arr.findIndex((item,index,array)=>{\n    return item==2;\n})\nconsole.log(res) // 0\n\n\n8、Array.fill()  给数组填充相同的值\nlet arr = new Array(5);\narr.fill("mmd",2,3) \n// 2 是开始下标\n// 3 是结束下标\n\n\n9、去重 结合set实现数组去重\nlet arr = [1,2,3,4,5,2,1,3,4,4];\nlet res = new Set(arr);\nconsole.log(res) // 转为一个类数组\nlet result = Array.from(res); // 转数组\n\n\n')])])]),t("h4",{attrs:{id:"_5、this指向"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_5、this指向"}},[n._v("#")]),n._v(" 5、this指向")]),n._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v("构造器 === 构造函数\n1、箭头函数不是一个构造器，不可以实例化\nlet fun = () => {\n    \n}\nnew fun()  // 报错\n\n2、::  左边是一个对象  右边是一个方法\n")])])]),t("h4",{attrs:{id:"_6、对象扩展"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_6、对象扩展"}},[n._v("#")]),n._v(" 6、对象扩展")]),n._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[n._v("console.log(Object.is(123,'123')) // false\n\n\n1、Object.assign()  默认是浅拷贝\n // 3个参数是深度拷贝  Object.assign({},obj1,obj2)\n // 2个参数是浅拷贝 Object.assign(obj1,obj2)\n \n 有{}会生成新串   没有会替换原字符串\n")])])])])}),[],!1,null,null,null);e.default=a.exports}}]);