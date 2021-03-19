import { getParam } from "../../../axios";


const searchCustomer = async (search) => {
    const res = await getParam(`/customer/info/${search}`, {});
  
    if (res.status == 200) {
      return res.data.data;
    } else {
      return {};
    }
};

const getAllSaleList = async () => {
    const res = await getParam(`/sale/all`, {});

    if (res.status == 200) {
        return res.data.data;
    } else {
      return [{}];
    }
};

export {
    searchCustomer,
    getAllSaleList
}
  


