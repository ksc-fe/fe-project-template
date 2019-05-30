
let utils = {
    /**
     * 生成一个map函数，通过key获取对应的值，如果没有则返回原key
     */
    keyMap: function (map) {
        return function (key) {
            if (!arguments.length) {
                return map;
            } else {
                return map[key] || key;
            }
        }
    },

    //对集合去重 [{a:1}, {a:2}, {a:1}]
    uniqByKey: function (ary, key) {
        let obj = {};
        _.each(ary, item => {
            if (!obj[item[key]]) {
                obj[item[key]] = item;
            }
        });
        return _(obj).value();
    }
};
export default utils;
