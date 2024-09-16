//整数
const IntegerRegex = /(^-?[1-9]\d*)|(0{1})$/

//正整数
const IntegerPlusRegex = /^[1-9]\d*|0$/

//小数
const decimalRegex = /^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$/

//正小数
const decimalPlusRegex = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/

//百分比校验（最多两位小数,不能超过100，不带百分号）
const percentageRegex = /^(((\d|[1-9]\d)(\.\d{1,2})?)|100|100.0|100.00)$/

//邮箱
const emailRegex = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

//手机
const mobileRegex = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/

//电话号码
const telephoneRegex = /^((\d{3,4}-)|\d{3.4}-)?\d{7,8}$/

//金额校验（不能超过两位小数）
let moneyRegex = /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/

//金额校验，支持负数
let moneyNegativeRegex = /^((-?[1-9]{1}\d*)|(-?0{1}))(\.\d{1,2})?$/

function checkNull(val:any){
    return val!=undefined && val!=null
}

interface ValidatorRule {  
    pattern?: RegExp;  
    message?: string;  
    trigger: string;  
    validator?: (rules: any, value: any, callback: any) => void; // validator 属性是可选的  
}

function getrRegex(min:number|null, max:number|null, regex:RegExp, msg:string, extend:any) {
    let list :ValidatorRule[]= [
        {
            pattern: regex,
            message: msg,
            trigger: "blur",
        }
    ]
    if (checkNull(min) || checkNull(max)) {
        list.push({
            validator: (rules:any, value:any, callback:any) => {
                if (checkNull(max) && value >( max as number)) {
                    return callback(new Error("超出范围"));
                } else if (checkNull(min) && value < (min as number)) {
                    return callback(new Error("超出范围"));
                } else {
                    return callback();
                }
            }, trigger: "blur"
        })
    }
    if (typeof extend === "object") {
        extend.forEach((e:any) => {
            list.push(e)
        });
    }
    return list;
}
// 必填项
function require(msg:string,trigger='blur'){
    return {
        required: true,
        message: msg,
        trigger
    }
}
// 添加必填规则
function addQuired(list:any,required:boolean,msg:string){
        msg = msg == undefined ? '' : msg
        let obj = { required: true, message: msg, trigger: "blur" }
        list.unshift(obj)
}

function Integer(required:boolean, msg:string, min:number, max:number, extend:any) {
    let list = getrRegex(min, max, IntegerRegex, "请输入整数", extend)
    addQuired(list,required,msg)
    return list
}

function IntegerPlus(required:boolean, msg:string, min:number, max:number, extend:any) {
    let list = getrRegex(min, max, IntegerPlusRegex, "请输入正整数", extend)
    addQuired(list,required,msg)
    return list
}

function decimal(required:boolean, msg:string, min:number, max:number, extend:any) {
    let list = getrRegex(min, max, decimalRegex, "请输入小数", extend)
    addQuired(list,required,msg)
    return list
}

function decimalPlus(required:boolean, msg:string, min:number, max:number, extend:any) {
    let list = getrRegex(min, max, decimalPlusRegex, "请输入正小数", extend)
    addQuired(list,required,msg)
    return list
}

function percentage(required:boolean, msg:string, extend:any) {
    let list = getrRegex(null, null, percentageRegex, "请输入正确的百分数，最多两位小数,不能超过100", extend)
    addQuired(list,required,msg)
    return list
}

function email(required:boolean, msg:string, extend:any) {
    let list = getrRegex(null, null, emailRegex, "请输入正确的邮箱", extend)
    addQuired(list,required,msg)
    return list
}


function mobile(required:boolean, msg:string, extend:any) {
    let list = getrRegex(null, null, mobileRegex, "请输入正确的手机号", extend)
    addQuired(list,required,msg)
    return list
}

function telephone(required:boolean, msg:string, extend:any) {
    let list = getrRegex(null, null, telephoneRegex, "请输入正确的电话号码", extend)
    addQuired(list,required,msg)
    return list
}

function money(required:boolean, msg:string, extend:any) {
    let list = getrRegex(null, null, moneyRegex, "请输入正确的金额，不能超过两位小数", extend)
    addQuired(list,required,msg)
    return list
}

function moneyNegative(required:boolean, msg:string, extend:any) {
    let list = getrRegex(null, null, moneyNegativeRegex, "请输入正确的金额，不能超过两位小数", extend)
    addQuired(list,required,msg)
    return list
}



export default {
    //正则
    IntegerRegex: IntegerRegex,
    IntegerPlusRegex: IntegerPlusRegex,
    decimalRegex: decimalRegex,
    decimalPlusRegex: decimalPlusRegex,
    percentageRegex: percentageRegex,
    emailRegex: emailRegex,
    mobileRegex: mobileRegex,
    telephoneRegex: telephoneRegex,
    moneyRegex: moneyRegex,
    moneyNegativeRegex: moneyNegativeRegex,

    require,//必填

    //校验函数
    Integer: function (required:boolean, msg:string, min:number, max:number, extend:any) {
        return Integer(required, msg, min, max, extend);
    },
    IntegerPlus: function (required:boolean, msg:string, min:number, max:number, extend:any) {
        return IntegerPlus(required, msg, min, max, extend);
    },
    decimal: function (required:boolean, msg:string, min:number, max:number, extend:any) {
        return decimal(required, msg, min, max, extend);
    },
    decimalPlus: function (required:boolean, msg:string, min:number, max:number, extend:any) {
        return decimalPlus(required, msg, min, max, extend);
    },
    percentage: function (required:boolean, msg:string, extend:any) {
        return percentage(required, msg, extend);
    },
    email: function (required:boolean, msg:string, extend:any) {
        return email(required, msg, extend);
    },
    mobile: function (required:boolean, msg:string, extend:any) {
        return mobile(required, msg, extend);
    },
    telephone: function (required:boolean, msg:string, extend:any) {
        return telephone(required, msg, extend);
    },
    money: function (required:boolean, msg:string, extend:any) {
        return money(required, msg, extend);
    },
    moneyNegative: function (required:boolean, msg:string, extend:any) {
        return moneyNegative(required, msg, extend);
    }
} 
