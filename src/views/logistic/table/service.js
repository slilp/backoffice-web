import {
  getParam,
  deleteAxios
} from "../../../axios";

async function deleteLogistic(lid, setRefresh) {
  const del = await deleteAxios(`/logistic/delete/${lid}`, {});
  setRefresh(value => !value);
}

export const searchData = async (search, page, size, setRefresh) => {
  const res = await getParam(`/logistic/search/${page}/${size}/`, {
    inv: search.sInv || "",
    status: search.sStatus || "",
    tid: search.sTid || ""
  });
  if (res.status == 200) {
    if (res.data.data.rows != null) {
      let data = res.data.data.rows.map((item) => {
        return {
          key: item.lid,
          inv: item.invoiceInfo.inv,
          pid: item.invoiceInfo.purchaseInfo.pid,
          tname: item.transporterInfo.firstName + ' ' + item.transporterInfo.lastName,
          name: item.invoiceInfo.purchaseInfo.customerInfo.name,
          type: item.invoiceInfo.purchaseInfo.purchaseInfo == 'self' ? 'จัดส่งเอง' : 'โดยขนส่ง',
          status: item.status == "waiting" ? "รอการขนส่ง" : "ขนส่งเเล้ว",
          edit: `./editl/${item.lid}`,
          deleteInv: async () => {
            await deleteLogistic(item.lid, setRefresh)
          }
        };
      });

      return {
        list: data,
        total: res.data.data.count
      };
    } else {
      return [];
    }
  }
};