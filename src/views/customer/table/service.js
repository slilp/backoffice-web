import { getParam } from "../../../axios";

export const searchData = async (search, page, size) => {

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
            location: `${item.billToLocation} ${item.billTo.subDistrict} ${item.billTo.district} ${item.billTo.province} ${item.billTo.zipCode}` ,
            tel: item.tel,
            type: item.type,
            edit: `./editc/${item.cid}`
          };
        });
  
        return { list: data, total: res.data.data.count };
      } else {
        return [];
      }
    }
  };