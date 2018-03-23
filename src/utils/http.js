import axios from 'axios'
import router from './router'


axios.defaults.timeout = 50000;
axios.defaults.baseURL="http://www.datahub.net.cn/api/"
// axios.defaults.baseURL="http://172.16.1.51:8000/api/"
// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (localStorage.getItem('token')) {
            config.headers.Authorization = 'JWT ' + localStorage.getItem('token');
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
        // localStorage.setItem("token",response.data.token)
        return response;
    },
    error => {
        console.log(error.response);
        // if (error.response) {
        //     switch (error.response.status) {
        //         case 403:
        //             // localStorage.setItem('token','');
        //             alert('登录信息已过期，请重新登录');
        //             router.replace({
        //                 path: 'login',
        //                 query: {redirect: router.currentRoute.fullPath}
        //             })
        //     }
        // }
        return Promise.reject(error)
    });

export default axios;