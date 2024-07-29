// 获取地理坐标
export const getPosition = (
    timeout = 10000,
    maximumAge = 60000,
    enableHighAcuracy = false
) =>
    new Promise((resolve, reject) => {
        if (!navigator && !navigator.geolocation) {
            return reject(new Error("浏览器不支持定位！"));
        }
 
        const success = (loc:any) => {
            const location = {
                latitude: loc.coords.latitude, // 纬度
                longitude: loc.coords.longitude, // 经度
                accuracy: loc.coords.accuracy, // 精确度
            };
            resolve(location);
        };
 
        const error = (err:any) => {
            var errorType = [
                "您已拒绝请求地理位置信息！",
                "获取不到位置信息！",
                "获取位置信息超时！",
            ];
            reject(errorType[err.code - 1]);
        };
 
        navigator.geolocation.getCurrentPosition(success, error, {
            enableHighAcuracy, // 指示浏览器获取高精度的位置，默认为false
            timeout, // 指定获取地理位置的超时时间，默认不限时，单位为毫秒
            maximumAge, // 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
        });
    });