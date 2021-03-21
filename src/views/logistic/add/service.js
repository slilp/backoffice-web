import { getParam } from "../../../axios";

async function getAllTransporterList(){

    const res = await getParam(`/transporter/all`, {});

    if (res.status == 200) {
        return res.data.data;
    } else {
      return [{}];
    }
}


export {
    getAllTransporterList
}