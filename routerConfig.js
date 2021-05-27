const zdyIcon = require("@/assets/images/ic_project_zdybd.png")
const routeMaps = [
  {
    path: '/project/index',
    componentPath: 'Project',
    formCode: 'Project',
    icon: require("@/assets/images/ic_project_xmlb.png"),
    operations: ['WRITE', 'DOWNLOAD', 'EDIT', 'DELETE'],
  },
  // contract
  {
    path: '/contract/inContract',
    formCode: 'Contract',
    icon: require("@/assets/images/ic_project_skht.png"),
    operations: ['WRITE', 'DOWNLOAD', 'EDIT', 'DELETE'],
  },
  // 材料采购
  {
    path: '/contract/outContract',
    formCode: 'materialContract',
    icon: require("@/assets/images/ic_project_fkht.png"),
    componentPath: 'Contract',
    operations: ['WRITE', 'DOWNLOAD', 'EDIT', 'DELETE'],
  },
  // 租赁
  {
    path: '/contract/leaseContract',
    formCode: 'leaseContract',
    icon: require("@/assets/images/ic_project_fkht.png"),
    operations: ['WRITE', 'DOWNLOAD', 'EDIT', 'DELETE'],
  },
  // 分包
  {
    path: '/contract/laborContract',
    formCode: 'laborContract',
    icon: require("@/assets/images/ic_project_fkht.png"),
    operations: ['WRITE', 'DOWNLOAD', 'EDIT', 'DELETE'],
  },
  // 其他
  {
    path: '/contract/otherContract',
    formCode: 'otherContract',
    icon: require("@/assets/images/ic_project_fkht.png"),
    operations: ['WRITE', 'DOWNLOAD', 'EDIT', 'DELETE'],
  },
  // 劳务
  {
    path: '/contract/workerContract',
    formCode: 'workerContract',
    icon: require("@/assets/images/ic_project_fkht.png"),
    operations: ['WRITE', 'DOWNLOAD', 'EDIT', 'DELETE'],
  },
  // 进项发票
  {
    path: "/finance/invoice",
    icon: require("@/assets/images/ic_project_fp.png"),
  },
  {
    path: '/finance/invoice/inputInvoice',
    formCode: 'InputInvoice',
    icon: require("@/assets/images/ic_project_jxfp.png"),
    operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
  },
  // 销项发票
  {
    path: '/finance/invoice/saleInvoice',
    formCode: 'SaleInvoice',
    icon: require("@/assets/images/ic_project_xxfp.png"),
    operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
  },
  {
    path: '/finance/payment',
    formCode: 'PaymentFinance',
    icon: require("@/assets/images/ic_project_fkd.png"),
    componentPath: 'Finance/Payment',
    operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
  },
  {
    path: '/finance/receipt',
    formCode: 'ReceiptFinance',
    icon: require("@/assets/images/ic_project_skd.png"),
    operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
  },
  {
    path: '/finance/settle',
    formCode: 'Settle',
    icon: require("@/assets/images/ic_project_jsd.png"),
    componentPath: 'Finance/Settle',
    operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
  },
  {
    path: '/finance/loan',
    formCode: 'LoanBill',
    icon: require("@/assets/images/ic_project_jkd.png"),
    operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
  },
  {
    path: '/finance/reimburse',
    formCode: 'ReimburseBill',
    icon: require("@/assets/images/ic_project_bxd.png"),
    operations: ['WRITE', 'EDIT', 'DELETE']
  },
  {
    path: '/finance/purchaseBill',
    formCode: 'PurchasePayable',
    icon: zdyIcon,
    params: { approveStatus: 'COMPLETE' },
    operations: ['WRITE', 'EDIT', 'DELETE']
  },
  // 农名工工资
  {
    path: '/finance/salary',
    formCode: 'SalaryFinance',
    componentPath: 'Finance/Salary',
    operations: ['WRITE', 'EDIT', 'DELETE']
  },
  {
    path: "/supply/purchase",
    icon: require("@/assets/images/ic_project_cg.png"),
  },
  {
    path: '/supply/purchase/purchaseApply',
    formCode: 'PurchaseApply',
    icon: require("@/assets/images/ic_project_cg.png"),
    operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
  },
  {
    path: '/supply/purchase/purchaseEnquiry',
    componentPath: 'Supply/Purchase/purchaseEnquiry',
    formCode: 'PurchaseEnquiry',
    icon: zdyIcon,
    operations: ['WRITE', 'EDIT', 'DELETE']
  },
  {
    path: '/supply/purchase/purchaseNeed',
    formCode: 'PurchaseNeed',
    icon: zdyIcon,
    operations: ['WRITE', 'EDIT', 'DELETE']
  },
  {
    path: '/supply/purchase/purchaseContract',
    formCode: 'Contract',
    icon:zdyIcon,
    params: { contractCate: '3' },
    operations: ['WRITE', 'EDIT', 'DELETE']
  },
  // 采购入库
  {
    path: "/supply/stock",
    icon: require("@/assets/images/ic_project_kc.png"),
  },
  {
    path: '/supply/stock/depotIn',
    formCode: 'PurchaseDepotIn',
    icon: require("@/assets/images/ic_project_cgrk.png"),
    operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
  },
  // 归还入库
  {
    path: '/supply/stock/depotIn2',
    formCode: 'ReturnDepotIn',
    icon: require("@/assets/images/ic_project_ghrk.png"),
    componentPath: 'Supply/Stock/returnDepotIn',
    operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
  },
  // 领用出库
  {
    path: '/supply/stock/depotOut',
    formCode: 'DepotOut',
    icon: zdyIcon,
    operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
  },
  // 退货出库
  {
    path: '/supply/stock/depotOut2',
    formCode: 'RefundDepotOut',
    name: "depotOut2",
    operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
  },
  // 库存调拨
  {
    path: '/supply/stock/depotTransfer',
    formCode: 'DepotTransfer',
    icon:zdyIcon,
    operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
  },
  // 库存盘点
  {
    path: '/supply/stock/depotCheckDetail',
    formCode: 'DepotCheck',
    icon: zdyIcon,
    operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
  },
  // 库存详情
  {
    path: '/supply/stock/depotDetail',
    operations: ['DOWNLOAD']
  },
  // 租赁进场
  {
    path: "/supply/rent",
    icon: zdyIcon
  }
  ,
  {
    path: '/supply/rent/leaseenter',
    formCode: 'LeaseIn',
    icon: require("@/assets/images/ic_project_zljc.png"),
    operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
  },
  // 租赁退场
  {
    path: '/supply/rent/leaseleave',
    formCode: 'LeaseOut',
    icon: require("@/assets/images/ic_project_zltc.png"),
    componentPath: 'Supply/Rent/LeaseLeave',
    operations: ['WRITE', 'EDIT', 'DELETE', 'DOWNLOAD']
  },
  // 租赁盘点
  {
    path: '/supply/rent/leasecheck',
    formCode: 'LeaseInDetail',
    icon: zdyIcon,
    componentPath: 'Supply/Rent/LeaseCheck',
    operations: ['DOWNLOAD'],
    showCreator: false,
  },
  {
    path: '/database/supplier',
    formCode: 'Supplier',
    icon: require("@/assets/images/ic_project_zljch.png"),
    operations: ["WRITE", 'DOWNLOAD', 'EDIT', 'DELETE'],
  },
  {
    path: '/database/material',
    formCode: 'Material',
    icon: require("@/assets/images/ic_project_zljch.png"),
    operations: ["WRITE", 'DOWNLOAD', 'EDIT', 'DELETE'],
  },
  {
    path: '/database/machine',
    formCode: 'Machine',
    icon: require("@/assets/images/ic_project_zljch.png"),
    operations: ['WRITE', 'EDIT', 'DELETE']
  },
  {
    path: '/database/depot',
    formCode: 'Depot',
    icon: require("@/assets/images/ic_project_zljch.png"),
    componentPath: 'Database/Depot',
    operations: ['WRITE', 'EDIT', 'DELETE']
  },
  // task 任务
  {
    path: '/taskManagement/task/pending',
    componentPath: 'Task',
    formCode: 'Task',
    serviceType: 'PendingList',
  },
  {
    path: '/taskManagement/task/create',
    componentPath: 'Task',
    formCode: 'Task',
    serviceType: 'CreateList',
    operations: ['WRITE', 'EDIT', 'DELETE']
  },
  {
    path: '/taskManagement/task/charge',
    componentPath: 'Task',
    formCode: 'Task',
    serviceType: 'Charge',
  },
  {
    path: '/taskManagement/task/participate',
    componentPath: 'Task',
    formCode: 'Task',
    serviceType: 'ParticipateList',
  },
  {
    path: '/taskManagement/task/confirm',
    componentPath: 'Task',
    formCode: 'Task',
    serviceType: 'ConfirmList',
  },
  {
    path: '/taskManagement/task/all',
    componentPath: 'Task',
    formCode: 'Task',
    serviceType: 'AllList',
    operations: ['DOWNLOAD'],
  },
  // worklog 工作日志
  {
    path: '/worklog/index',
    formCode: 'WorkLog',
    operations: ['WRITE', 'EDIT', 'DELETE']
  },
  // 完全自定义组件
  {
    path: '/usercreate/:formCode',
    serviceType: 'USERCREATE',
    formCode: 'USERCREATE',
    icon: require("@/assets/images/ic_project_zljch.png"),
    operations: ['WRITE', 'EDIT', 'DELETE']
  },
  // 质量检查
  {
    path: '/quality',
    icon: require("@/assets/images/ic_project_zljc.png"),
  },
  {
    path: '/quality/qualityCheck',
    formCode: 'QualityCheck',
    icon: require("@/assets/images/ic_project_zljc.png"),
    componentPath: 'Check',
    params: { category: 1 },
    operations: ['WRITE', 'EDIT', 'DELETE']
  },
  // 待我检查
  {
    path: '/quality/checkWaiting',
    formCode: 'QualityCheck',
    componentPath: 'CheckWaiting',
    params: { category: 1, status: '0' },
  },
  // 质量整改
  {
    path: '/quality/rectification',
    formCode: 'Reform',
    icon: require("@/assets/images/ic_project_zlzg.png"),
    operations: ['EDIT', 'DELETE'],
    params: { category: 1 },
    componentPath: 'Reform',
  },
  // 奖惩
  {
    path: '/quality/incentive',
    formCode: 'Incentive',
    icon: require("@/assets/images/ic_project_zljch.png"),
    operations: ['EDIT', 'DELETE'],
    params: { category: 1 },
  },
  {
    path: '/safety',
    icon: require("@/assets/images/ic_project_aqjc.png"),
  },
  {
    path: '/safety/safetyCheck',
    formCode: 'QualityCheck',
    icon: require("@/assets/images/ic_project_aqjc.png"),
    componentPath: 'Check',
    params: { category: 2 },
    operations: ['WRITE', 'EDIT', 'DELETE']
  },
  // 待我检查
  {
    path: '/safety/checkWaiting',
    formCode: 'QualityCheck',
    icon: require("@/assets/images/ic_project_aqjch.png"),
    componentPath: 'CheckWaiting',
    params: { category: 2, status: '0' },
  },
  // 安全整改
  {
    path: '/safety/rectification',
    formCode: 'Reform',
    icon: require("@/assets/images/ic_project_aqzg.png"),
    params: { category: 2 },
    componentPath: 'Reform',
    operations: ['EDIT', 'DELETE'],
  },
  // 奖惩
  {
    path: '/safety/incentive',
    formCode: 'Incentive',
    icon: require("@/assets/images/ic_project_aqjch.png"),
    params: { category: 2 },
    operations: ['EDIT', 'DELETE'],
  },
  // 劳务班组
  {
    path: '/labor/laborteam',
    formCode: 'classGroup',
    operations: ['WRITE', 'EDIT', 'DELETE']
  },
  // 资金计划模版
  {
    path: '/projectFund/fundModel',
    formCode: 'FundDetail',
    operations: ['WRITE', 'EDIT', 'DELETE']
  },
  // 资金计划
  {
    path: '/projectFund/fundPlan',
    formCode: 'project_fund_plan',
    componentPath: 'ProjectFund',
    operations: ['WRITE', 'EDIT', 'DELETE']
  },
  {
    path: '/projectFund/fundReport',
    formCode: 'FundReport',
    componentPath: 'ProjectFundReport',
    operations: ['WRITE']
  },
  // 物料计划
  {
    path: '/projectMaterial/materialPlan',
    formCode: 'materialPlan',
    componentPath: 'MaterialPlan',
    operations: ['WRITE', 'EDIT', 'DELETE']
  },
  // 物资填报
  {
    path: '/projectMaterial/materialReport',
    formCode: 'materialReport',
    operations: ['WRITE'],
    componentPath: 'MaterialReport',
  },
  // 进度填报
  {
    path: '/projectProcess/processReport',
    component: './ProcessReport',
  },
  // 进度计划
  {
    path: '/projectProcess/processPlan',
    component: './ProjectPlan',
  },
]
export function getConfigFormFormCode(formCode) {
  return routeMaps.find(item => item.formCode === formCode) || {}
}

export function getConfigFormPath(path) {
  return routeMaps.find(item => item.path === path) || {}
}

export function getIconConfigFormPath(path) {
  let url = zdyIcon
  if (path.indexOf("usercreate") > -1) {
    url = zdyIcon
  } else {
    const routeConfig = routeMaps.find(item => item.path === path);
    if (!routeConfig) {
      console.log(path);
    } else if (routeConfig.icon) {
      url = routeConfig.icon
    }
  }
  return url
}
