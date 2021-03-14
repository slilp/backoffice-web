import { getParam } from "../../../axios";

export const searchData =  async (search, page, size) => {
    const res = await getParam(`/invoice/search/${page}/${size}/`, {
      inv: search.sInv || "",
      pid: search.sPid || "",
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
            name:  item.purchaseInfo.customerInfo.name,
            amount: item.amount ,
            status: item.status == "waiting" ? "รอการชำระเงิน" : "ชำระเงินเเล้ว",
            edit: "เเก้ไข",
          };
        });
  
        return { list: data, total: res.data.data.count };
      } else {
        return [];
      }
    }
  };