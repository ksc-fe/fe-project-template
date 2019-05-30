import axios from 'axios'
import qs from 'qs'
import Message from 'kpc/components/message';

axios.defaults.timeout = 30000;
axios.interceptors.request.use((config) => {
    if (config.method === 'post' && config.headers['content-type'] !== "multipart/form-data") {
        config.data = qs.stringify(config.data);
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default {
    checkLogin: function (params) {
        return this.getRequest('/login/api/checklogin', params);
    },
    getRequest: function (url, params = {}, headers) {
        return axios.get(url, {
                params: params,
                headers: Object.assign({}, headers)
            })
            .then(function (res) {
                if (res.status != 200) {
                    Message.error(res.data.errmsg || '操作失败');
                }
                return res.data;
            })
            .catch(function (error) {
                let data = error.response.data;
                let  = data.errmsg || data.err_msg;
                Message.error(errmsg || '操作失败');
            });
    },
    postRequest: function (url, params = {}, config) {
        return axios.post(url, params, config)
            .then(function (res) {
                if (res.status != 200) {
                    Message.error(res.data.errmsg || '操作失败');
                }
                return res.data;
            })
            .catch(function (error) {
                let data = error.response.data;
                let errmsg = data.errmsg || data.err_msg;
                Message.error(errmsg || '操作失败');
            });
    },
}