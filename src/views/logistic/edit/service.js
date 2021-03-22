import { getParam , putJson } from "../../../axios";

export async function getLogisticInfo(lid){
    const logisticInfo = await getParam(`/logistic/search/0/10?lid=${lid}`);
    const customerId = logisticInfo.data.data.rows[0].invoiceInfo.purchaseInfo.customerInfo.cid;
    const purchaseId = logisticInfo.data.data.rows[0].invoiceInfo.purchaseInfo.pid;
    const invoiceId = logisticInfo.data.data.rows[0].invoiceInfo.inv;
    const transporterId = logisticInfo.data.data.rows[0].transporterInfo.tid;

    return {
        logisticInfo : logisticInfo,
        customerId : customerId,
        purchaseId : purchaseId,
        invoiceId : invoiceId,
        transporterId : transporterId
    }
}

export async function getTransporterList(){
    const transporters = await getParam("/transporter/all", {});
    return transporters.data.data;
}

export async function getCustomerInfo(cid){
    const customerInfo = await getParam(`/customer/info/${cid}`);
    return customerInfo.data.data;
}


export async function getPurchaseInfo(pid){
    const purchaseInfo = await getParam(`/purchase/info/${pid}`);
    return purchaseInfo.data.data;
}


export async function editLogisticTrans(request){
    const response = await putJson(`/logistic/update/${request.lid}`, {
        deliveryDate: request.deliveryDate,
        status: request.logisticStatus
    });
    return response;
}
