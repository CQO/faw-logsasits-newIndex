import getPlanMonitorDataApi from '@/api/modules/homePage'
export function getDetail(id,callback){
    const obj = {m:{year:sessionStorage.getItem('year') || '2023',id}};
      getPlanMonitorDataApi.getMapPointDetail(obj).then(res=>{
        callback(res.detail)
      })
}