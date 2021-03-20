import { getParam } from "../../../axios";

export const searchData  = async (search, page, size, handle) => {
  const res = await getParam(`/purchase/quick-search/${page}/${size}/`, {
    name: search.sName || "",
    pid: search.sCode || ""
  });
  if (res.status == 200) {
    if (res.data.data.rows != null) {
      let data = res.data.data.rows.map((item) => {
        return {
          key: item.pid,
          code: item.pid,
          name: item.customerInfo.name,
          revenue: item.revenue,
          edit: { pid: item.pid , customerInfo : item.customerInfo , func: handle}
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