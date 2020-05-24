import axios from "axios";
import Cookie from 'js-cookie'
import baseUrl from './baseUrl'

// const baseUrl = "http://v.juhe.cn";
const http = axios.create({});

http.interceptors.request.use(config => {
	let isServer = config.isServer
	let url = config.url;
	if (isServer) {
		url = baseUrl + url;
		config.url = url;
	}
	return config;
});

http.interceptors.response.use(res => {
	return res.data
})

export default http;