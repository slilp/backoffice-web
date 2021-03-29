import { getParam , deleteAxios} from "../../../axios";


async function deleteTransporter(tid , setRefresh){
    const del = await deleteAxios(`/transporter/delete/${tid}`,{});
    setRefresh(value => !value);
}

export const searchData = async (setRefresh) => {

    const res = await getParam(`/transporter/all`, {});
    if (res.status == 200) {
      if (res.data.data != null) {
        let data = res.data.data.map((item) => {
          return {
            key: item.tid,
            title: item.title,
            firstName: item.firstName,
            lastName: item.lastName,
            deleteT: async ()=> {await deleteTransporter(item.tid , setRefresh)}
          };
        });
  
        return { list: data };
      } else {
        return [];
      }
    }
  };