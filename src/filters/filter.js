import utils from "../utils/utils";

let filters = {
    signStatus: function (value) {
        return utils.keyMap({
            1: '待审核',
            2: '通过',
            3: '拒绝'
        })(value);
    },

}
export default filters;