import { getParam } from "../../../axios";

export const searchData  = async (search, page, size) => {
  const res = await getParam(`/purchase/search/${page}/${size}/`, {
    name: search.sName || "",
    pid: search.sCode || "",
    transportType: search.sType || "",
  });
  if (res.status == 200) {
    if (res.data.data.rows != null) {
      let data = res.data.data.rows.map((item) => {
        return {
          key: item.pid,
          code: item.pid,
          name: item.customerInfo.name,
          revenue: item.revenue
        };
      });

      return { list: data, total: res.data.data.count };
    } else {
      return [];
    }
  }
};