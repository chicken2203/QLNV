import { EgretLoadable } from "egret";
import ConstantList from "app/appConfig";
const Dashboard = EgretLoadable({
  loader: () => import("./Dashboard")
});

const dashboardRoutes = [
  {
    path:  ConstantList.ROOT_PATH+"dashboard/analytics",
    component: Dashboard,
  },
];

export default dashboardRoutes;
