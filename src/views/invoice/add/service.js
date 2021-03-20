import { getParam } from "../../../axios";

const getBalance = async (search) => {
    const res = await getParam(`/purchase/balance/${search}`, {});
  
    if (res.status == 200) {
      return res.data.data;
    } else {
      return {};
    }
  };
  

  export  {
      getBalance
  }