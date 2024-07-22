export const getTime = () => {
    const now = new Date().getHours();

    let message
    switch (true) {
        case now < 9:
            message = '早上'
            break;
        case now <= 12:
            message = '中午'
            break;
        case now <= 18:
            message = '下午'
            break;
        case now < 24:
            message = '晚上'
            break;
        default:
            break;
    }
    return message
}
// 获取当前时间
export const  getCurrentDateTime = ():string=>{
    const now: Date = new Date();
    
    const year: number = now.getFullYear();
    let month: number | string = now.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    
    let day: number | string = now.getDate();
    day = day < 10 ? '0' + day : day;
    
    let hours: number | string = now.getHours();
    hours = hours < 10 ? '0' + hours : hours;
    
    let minutes: number | string = now.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    
    let seconds: number | string = now.getSeconds();
    seconds = seconds < 10 ? '0' + seconds : seconds;
    
    const formattedDateTime: string = `${year}年${month}月${day}日 ${hours}时${minutes}分${seconds}秒`;
    
    return formattedDateTime;
}