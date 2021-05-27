import Accoutt from "./account"
import Approval from "./approval"
import Comment from "./comment"
import Depot from "./depot"
import Global from "./global"
import Incentive from "./incentive"
import Jgtablemodel from "./jgtablemodel"
import Menu from "./menu"
import Project from "./project"
import Quality from "./quality"
import Reform from "./reform"
import Task from "./task"
const models= {
  Accoutt,
  Approval,
  Comment,
  Depot,
  Global,
  Incentive,
  Jgtablemodel,
  Menu,
  Project,
  Quality,
  Reform,
  Task
}
 const initModel=function (app){
  const allmodels = Object.keys(models);
  allmodels.forEach(model => {
    // 装载models对象
    app.model(models[model]);
  });
}
export default initModel