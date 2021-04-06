import {
  getParam
} from "../../../axios";


export const searchData = async (search, page, size, handle) => {
  const res = await getParam(`/invoice/search/${page}/${size}/`, {
    inv: search.sInv || "",
    pid: search.sPid || "notshow",
    status: search.sStatus || "",
    startDate: search.sStartDate || "",
    endDate: search.sEndDate || "",
  });
  if (res.status == 200) {
    if (res.data.data.rows != null) {

      let data = res.data.data.rows.map((item) => {
        return {
          key: item.inv,
          pid: item.purchaseInfo.pid,
          invoiceCode: item.inv,
          pay: item.invoiceDate,
          name: item.purchaseInfo.customerInfo.name,
          amount: item.amount,
          edit: {
            inv: item.inv,
            func: handle
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