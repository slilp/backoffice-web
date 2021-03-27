import {
  getParam,
  deleteAxios
} from "../../../axios";

async function deleteLogistic(lid, setRefresh) {
  const del = await deleteAxios(`/logistic/delete/${lid}`, {});
  setRefresh(value => !value);
}

const statusWord = {
  waiting : "รอการขนส่ง",
  late: "เกินเวลาขนส่ง",
  cancel : "ยกเลิกการขนส่ง",
  success : "ขนส่งเรียบร้อย"
}

export const searchData = async (search, page, size, setRefresh) => {
  const res = await getParam(`/logistic/search/${page}/${size}/`, {
    inv: search.sInv || "",
    pid : search.sPid || "",
    status: search.sStatus || "",
    tid: search.sTid || ""
  });
  if (res.status == 200) {
    if (res.data.data.rows != null) {
      let data = res.data.data.rows.map((item) => {
        return {
          key: item.lid,
          inv: item.inv || '-',
          pid: item.purchaseInfo.pid,
          tname: item.transporterInfo.firstName + ' ' + item.transporterInfo.lastName,
          name: item.purchaseInfo.customerInfo.name,
          type: item.purchaseInfo.purchaseInfo == 'self' ? 'จัดส่งเอง' : 'โดยขนส่ง',
          status: statusWord[item.status],
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