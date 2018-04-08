// const Url = 'http://test.sdcen.cn:94/study'

const Url = 'http://tongkaoks.sdcen.cn/study'



export default Api = {
    Login: Url + '/Api/Login',
    SchoolId: 'e126b4bd-cc3d-4eb2-95df-e21ba3ae3e75',
    GetPaperList: Url + '/Api/GetPaperList?SchoolId=',
    GetStuWorkList: Url + '/Api/StuWorkList',
    doWork: Url + '/Ap/doWork',
    viewWork: Url + '/Ap/viewWork'
}