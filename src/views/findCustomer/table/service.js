import { getParam } from "../../../axios";

export const searchData = async (search, page, size , handle) => {

    const res = await getParam(`/customer/search/${page}/${size}/`, {
      name: search.sName || '',
      cid: search.sCode || '',
      type: search.sType || '',
    });

    if (res.status == 200) {
      if (res.data.data.rows != null) {
        let data = res.data.data.rows.map((item) => {
          return {
            key: item.cid,
            code: item.cid,
            name: item.name,
            edit: { cid: item.cid , func: handle}
          };
        });
  
        return { list: data, total: res.data.data.count };
      } else {
        return [];
      }
    }
  };