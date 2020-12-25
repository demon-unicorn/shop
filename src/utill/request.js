import axios from 'axios'
import qs from 'qs'
// import { config } from 'shelljs'
import store from '../store/index'


const baseUrl = "/api"
//响应拦截
axios.interceptors.response.use(res => {
  console.group('响应路径为：' + res.config.url)
  console.log(res)
  return res
})

//请求拦截
axios.interceptors.request.use(config => {
  console.group('请求路径为：', config.url)
  if(config.url!==baseUrl+'/api/userlogin'){
    config.headers.authorization=store.state.user.token
  }
 
  // console.log(store.state.user)
  return config
})

//add里的确定
export const requestAddMenu = (data) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/menuadd',
    data: qs.stringify(data)
  })
}

//获取表单数据
export const requestListData = (params) => {
  return axios({
    method: "get",
    url: baseUrl + '/api/menulist',
    params: params
  })
}
//删除
export const requestDelList = (data) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/menudelete',
    data: data
  })

}
//修改
export const requestUpdataList = (data) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/menuedit',
    data: qs.stringify(data)
  })
}
//获取详情
export const requestMenuDetail = (params) => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/menuinfo',
    params: params
  })
}


//获取角色列表
export const requestRoleList = (params) => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/rolelist',
    params: params
  })
}

//添加角色
export const requestAddRole = (data) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/roleadd',
    data: qs.stringify(data)
  })
}

//删除
export const requestDelRole = (data) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/roledelete',
    data: data
  })
}

//获取角色详情
export const requestRoleDetail = (params) => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/roleinfo',
    params: params
  })
}

//修改角色
export const requestUpdataRole = (data) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/roleedit',
    data: qs.stringify(data)
  })
}

//管理员列表
export const requestManagerList = (params) => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/userlist',
    params: params
  })
}

//添加用户
export const requestAddManager = (data) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/useradd',
    data: qs.stringify(data)
  })
}

//总页
export const requestManagerCount = () => {
  return axios({
    mathod: 'get',
    url: baseUrl + '/api/usercount',

  })
}

//获取管理员详情
export const requestManagerDetail = (params) => {
  return axios({
    method: 'get',
    url: baseUrl + '/api/userinfo',
    params: params
  })
}

//修改管理员
export const requestUpdataManager = (data) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/useredit',
    data: qs.stringify(data)
  })
}

//删除管理员
export const requestDelManager = (data) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/userdelete',
    data: qs.stringify(data)
  })
}

//管理员登录
export const requestLogin = (data) => {
  return axios({
    method: 'post',
    url: baseUrl + '/api/userlogin',
    data: qs.stringify(data)
  })
}

//商品分类列表
export const requestListGood=(params)=>{
return axios({
  method:"get",
  url:baseUrl+'/api/catelist',
  params:params
})
}

//商品分类添加
export const requestAddGood=(data)=>{
  var form=new FormData()
  for(let item in data){
    form.append(item,data[item])
  }
  return axios({
    method:'post',
    url:baseUrl+'/api/cateadd',
    data:form
  })
}

//商品分类详情
export const requestGoodDetail=(params)=>{
  return axios({
    method:'get',
    url:baseUrl+'/api/cateinfo',
    params:params
  })
}

//商品分类修改
export const requestGoodUpdata=(data)=>{
  var form=new FormData()
  for(let i in data){
    form.append(i,data[i])
  }
return axios({
  method:'post',
  url:baseUrl+'/api/cateedit',
  data:form
})
}

//商品分类删除
export const requestGoodDel=(data)=>{
return axios({
  method:'post',
  url:baseUrl+'/api/catedelete',
  data:qs.stringify(data)
})
}

//商品规格添加
export const requestSpecsAdd=(data)=>{
  return axios({
    method:'post',
    url:baseUrl+'/api/specsadd',
    data:qs.stringify(data)
  })
}

//商品规格总数
export const requestSpecsCount=()=>{
return axios({
  method:'get',
  url:baseUrl+'/api/specscount',
  
})
}

//商品规格列表
export const requestSpecsList=(params)=>{
  return axios({
    method:"get",
    url:baseUrl+'/api/specslist',
    params:params
  })
}

//详情
export const requestSpecsDetail=(params)=>{
  return axios({
    method:"get",
    url:baseUrl+'/api/specsinfo',
    params:params
  })
}

//修改
export const requestSpecsUpdata=(data)=>{
  return axios({
    method:"post",
    url:baseUrl+'/api/specsedit',
    data:qs.stringify(data)
  })
}

//商品规格删除
export const requestSpecsDel=(data)=>{
  return axios({
    method:"post",
    url:baseUrl+'/api/specsdelete',
    data:qs.stringify(data)
  })
}