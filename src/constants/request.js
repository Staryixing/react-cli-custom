const mockUrl = 'http://192.168.1.24:5000/mock/16'; // mock地址
const devUrl = 'https://177h27l110.iok.la/dss'; // 开发地址
const testUrl = "https://177h27l110.iok.la/dss"; // 测试地址
const proUrl = "https://177h27l110.iok.la/dss"; // 华索 生产地址
let BaseURL = '';
const ENV = process.env.NODE_ENV;
console.log('API_ENV',process.env.API_ENV)

if(ENV === "development"){
    BaseURL = devUrl
}else if(ENV === 'production' && process.env.API_ENV === 'test' && window.location.href.includes('192.168.1.24')){
    BaseURL = devUrl
}else if(ENV === 'production' && process.env.API_ENV === 'test' ){
    BaseURL = testUrl
}else if(ENV === 'production' && process.env.API_ENV === 'pro'){
    BaseURL = proUrl
}else {
    BaseURL = devUrl
}

export { BaseURL }