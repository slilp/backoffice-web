import { getParam , deleteAxios} from "../../../axios";


async function deleteSale(sid , setRefresh){
    const del = await deleteAxios(`/sale/delete/${sid}`,{});
    setRefresh(value => !value);
}

export const searchData = async (setRefresh) => {

    const res = await getParam(`/sale/all`, {});
    if (res.status == 200) {
      if (res.data.data != null) {
        let data = res.data.data.map((item) => {
          return {
            key: item.sid,
            title: item.title,
            firstName: item.firstName,
            lastName: item.lastName,
            deleteS: async ()=> {await deleteSale(item.sid , setRefresh)}
          };
        });
  
        return { list: data };
      } else {
        return [];
      }
    }
  };