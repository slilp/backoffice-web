import { getParam , deleteAxios } from "../../../axios";

async function deletePurchase(pid , setRefresh){
  const del = await deleteAxios(`/purchase/delete/${pid}`,{});
  setRefresh(value => !value);
}


export const searchData  = async (search, page, size,setRefresh) => {
  const res = await getParam(`/purchase/search/${page}/${size}/`, {
    name: search.sName || "",
    pid: search.sCode || "",
    status: search.sStatus || "",
  });
  if (res.status == 200) {
    if (res.data.data.rows != null) {
      let data = res.data.data.rows.map((item) => {
        return {
          key: item.pid,
          code: item.pid,
          name: item.customerInfo.name,
          revenue: item.revenue,
          location : `${item.customerInfo.shipToLocation? item.customerInfo.shipToLocation : ''} ${item.customerInfo.shipTo.subDistrict} ${item.customerInfo.shipTo.district} ${item.customerInfo.shipTo.province} ${item.customerInfo.shipTo.zipCode}` ,
          deliveryLocation : item.transportInfo ?   `${item.transportLocation ? item.transportLocation  : ''} ${item.transportInfo.subDistrict} ${item.transportInfo.district} ${item.transportInfo.province} ${item.transportInfo.zipCode}`   : ' - ',
          type : item.transportType == 'self' ? 'จัดส่งเอง'  : 'โดยขนส่ง' ,
          status : item.status == 'waiting'? 'ชำระเงินยังไม่ครบ' : 'ชำระเงินครบเเล้ว' ,
          edit: `./editp/${item.pid}`,
          deletePid: async ()=> {await deletePurchase(item.pid , setRefresh)}
        };
      });

      return { list: data, total: res.data.data.count };
    } else {
      return { list: [], total: 0 };
    }
  }else{
    return { list: [], total: 0 };

  }
};

