/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import Upgrade from "views/Upgrade.js";
import Production from "./views/production";
import Invoice from "./views/invoice";
import Customer from "./views/customer";
import Delivery from "./views/delivery/";
import Logistic from "./views/logistic";
import AddCustomer from "./views/customer/add";
import AddProduction from "./views/production/add";
import AddInvoice from "./views/invoice/add";
import AddDelivery from "./views/delivery/add";
import AddLogistic from "./views/logistic/add";

const dashboardRoutes = [
  // {
  //   upgrade: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "nc-icon nc-alien-33",
  //   component: Upgrade,
  //   layout: "/admin",
  // },
  {
    path: "/dashboard",
    name: "หน้าหลัก",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
    sidebar:true,
  },
  {
    path: "/user",
    name: "ลูกค้า",
    icon: "nc-icon nc-circle-09",
    component: Customer,
    layout: "/admin",
    sidebar:true,
  },
  {
    path: "/production",
    name: "การสั่งซื้อ",
    icon: "nc-icon nc-app",
    component: Production,
    layout: "/admin",
    sidebar:true,
  },
  {
    path: "/delivery",
    name: "ข้อมูลที่อยู่ขนส่ง",
    icon: "nc-icon nc-bus-front-12",
    component: Delivery,
    layout: "/admin",
    sidebar:true
  },
  {
    path: "/invoice",
    name: "การชำระเงิน",
    icon: "nc-icon nc-notes",
    component:  Invoice,
    layout: "/admin",
    sidebar:true,
  },
  {
    path: "/logistic",
    name: "การขนส่ง",
    icon: "nc-icon nc-delivery-fast",
    component:  Logistic,
    layout: "/admin",
    sidebar:true,
  },
  {
    path: "/addc",
    name: "สร้างลูกค้าใหม่",
    icon: "nc-icon nc-paper-2",
    component: AddCustomer,
    layout: "/admin",
    sidebar:false
  },
  {
    path: "/addp",
    name: "สร้างรายการผลิต",
    icon: "nc-icon nc-atom",
    component: AddProduction,
    layout: "/admin",
    sidebar:false
  },
  {
    path: "/addd",
    name: "สร้างข้อมูลขนส่ง",
    icon: "nc-icon nc-atom",
    component: AddDelivery,
    layout: "/admin",
    sidebar:false
  },
  {
    path: "/addi",
    name: "สร้างรายการใบเสร็จ",
    icon: "nc-icon nc-pin-3",
    component: AddInvoice,
    layout: "/admin",
    sidebar:false
  },
  {
    path: "/addl",
    name: "สร้างรายการขนส่ง",
    icon: "nc-icon nc-pin-3",
    component: AddLogistic,
    layout: "/admin",
    sidebar:false
  }
];

export default dashboardRoutes;
