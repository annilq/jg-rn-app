import { isTest } from '@/utils/utils';
export const baseUrl = "http://project-test.jianguanoa.com:8001";

// =================  用户   ===============
export const account = {
  user: `${baseUrl}/api/v1/system/user/getUserInfo`,
  logout: `${baseUrl}/api/v1/system/user/logout`,
  login: "http://uc-test.jianguanoa.com:8100/login",
};

// 系统常量
// export const globalConstant = `${baseUrl}/api/v1/base/constant/getAllConstant`;
export const globalConstant = `${baseUrl}/api/v1/system/dictItem/findDictList`;

// =================  基础表 ===============
// 供应商
export const supplier = {
  list: `${baseUrl}/api/v1/base/supplier/pageList`,
  query: `${baseUrl}/api/v1/base/supplier/query`,
  add: `${baseUrl}/api/v1/base/supplier/save`,
  update: `${baseUrl}/api/v1/base/supplier/update`,
  remove: `${baseUrl}/api/v1/base/supplier/delete`,
};

// 材料
export const material = {
  list: `${baseUrl}/api/v1/base/material/pageList`,
  query: `${baseUrl}/api/v1/base/material/query`,
  add: `${baseUrl}/api/v1/base/material/save`,
  update: `${baseUrl}/api/v1/base/material/update`,
  remove: `${baseUrl}/api/v1/base/material/delete`,
};

// 材料分类
export const materialCategory = {
  list: `${baseUrl}/api/v1/base/materialCategory/pageList`,
  query: `${baseUrl}/api/v1/base/materialCategory/query`,
  add: `${baseUrl}/api/v1/base/materialCategory/save`,
  update: `${baseUrl}/api/v1/base/materialCategory/update`,
  remove: `${baseUrl}/api/v1/base/materialCategory/delete`,
};

// 机械设备
export const machine = {
  list: `${baseUrl}/api/v1/base/machine/pageList`,
  query: `${baseUrl}/api/v1/base/machine/query`,
  add: `${baseUrl}/api/v1/base/machine/save`,
  update: `${baseUrl}/api/v1/base/machine/update`,
  remove: `${baseUrl}/api/v1/base/machine/delete`,
};

// 机械设备分类
export const machineCategory = {
  list: `${baseUrl}/api/v1/base/machineCategory/treeList`,
  query: `${baseUrl}/api/v1/base/machineCategory/query`,
  add: `${baseUrl}/api/v1/base/machineCategory/save`,
  update: `${baseUrl}/api/v1/base/machineCategory/update`,
  remove: `${baseUrl}/api/v1/base/machineCategory/delete`,
};

// 仓库
export const depot = {
  list: `${baseUrl}/api/v1/base/depot/pageList`,
  query: `${baseUrl}/api/v1/base/depot/query`,
  add: `${baseUrl}/api/v1/base/depot/save`,
  update: `${baseUrl}/api/v1/base/depot/update`,
  remove: `${baseUrl}/api/v1/base/depot/delete`,
};

export const attachment = {
  uploadFile: `${baseUrl}/api/v1/base/attachment/uploadFile`,
  uploadPicture: `${baseUrl}/api/v1/base/attachment/uploadPicture`,
};
// =================  系统设置 ===============

export const unit = {
  all: `${baseUrl}/api/v1/system/unit/getAllUnit`,
};

// 菜单
export const menu = {
  list: `${baseUrl}/api/v1/system/menu/pageList`,
  query: `${baseUrl}/api/v1/system/menu/query`,
  add: `${baseUrl}/api/v1/system/menu/save`,
  update: `${baseUrl}/api/v1/system/menu/update`,
  remove: `${baseUrl}/api/v1/system/menu/delete`,
  all: `${baseUrl}/api/v1/system/menu/findAllMenuList`,
  roleMenu: `${baseUrl}/api/v1/system/menu/findMenuListByRole`,
  saveRoleMenu: `${baseUrl}/api/v1/system/menu/saveMenuRole`,
  enable: `${baseUrl}/api/v1/system/menu/enable`,
  disable: `${baseUrl}/api/v1/system/menu/disable`,
};

// 功能
export const action = {
  list: `${baseUrl}/api/v1/system/function/pageList`,
  query: `${baseUrl}/api/v1/system/function/query`,
  add: `${baseUrl}/api/v1/system/function/save`,
  update: `${baseUrl}/api/v1/system/function/update`,
  remove: `${baseUrl}/api/v1/system/function/delete`,
};

// 角色
export const role = {
  list: `${baseUrl}/api/v1/system/role/pageList`,
  query: `${baseUrl}/api/v1/system/role/query`,
  add: `${baseUrl}/api/v1/system/role/save`,
  update: `${baseUrl}/api/v1/system/role/update`,
  remove: `${baseUrl}/api/v1/system/role/delete`,
};

// 用户组
export const userGroup = {
  list: `${baseUrl}/api/v1/system/tsUserGroup/pageList`,
  query: `${baseUrl}/api/v1/system/tsUserGroup/query`,
  add: `${baseUrl}/api/v1/system/tsUserGroup/save`,
  update: `${baseUrl}/api/v1/system/tsUserGroup/update`,
  remove: `${baseUrl}/api/v1/system/tsUserGroup/delete`,
};

// 用户
export const users = {
  list: `${baseUrl}/api/v1/system/user/pageList`,
  query: `${baseUrl}/api/v1/system/user/query`,
  add: `${baseUrl}/api/v1/system/user/save`,
  update: `${baseUrl}/api/v1/system/user/update`,
  remove: `${baseUrl}/api/v1/system/user/delete`,
  // 移动端or pc端
  // findMenuList: `${baseUrl}/api/v1/system/user/findMenuList`,
  findMenuList: `${baseUrl}/api/v1/system/menuMobile/getMyMenu`,
  findRoleList: `${baseUrl}/api/v1/system/user/findRoleList`,
  all: `${baseUrl}/api/v1/system/user/userList`,
};

// 数据权限API
export const permission = {
  list: `${baseUrl}/api/v1/system/dataAuthority/list`,
  query: `${baseUrl}/api/v1/system/dataAuthority/query`,
  update: `${baseUrl}/api/v1/system/dataAuthority/update`,
};

//数据字典
export const dict = {
  list: `${baseUrl}/api/v1/system/dict/pageList`,
  query: `${baseUrl}/api/v1/system/dict/query`,
  add: `${baseUrl}/api/v1/system/dict/save`,
  update: `${baseUrl}/api/v1/system/dict/update`,
  remove: `${baseUrl}/api/v1/system/dict/delete`,
};

//数据字典子项
export const dictItem = {
  list: `${baseUrl}/api/v1/system/dictItem/pageList`,
  query: `${baseUrl}/api/v1/system/dictItem/query`,
  add: `${baseUrl}/api/v1/system/dictItem/save`,
  update: `${baseUrl}/api/v1/system/dictItem/update`,
  remove: `${baseUrl}/api/v1/system/dictItem/delete`,
};

//代码生成
export const code = {
  execute: `${baseUrl}/codeGen/execute`, // 代码执行
  getConfig: `${baseUrl}/codeGen/getConfig`, //初始化
};
// =================  项目模块 ===============
export const project = {
  list: `${baseUrl}/api/v1/contract/project/pageList`,
  query: `${baseUrl}/api/v1/contract/project/query`,
  add: `${baseUrl}/api/v1/contract/project/save`,
  update: `${baseUrl}/api/v1/contract/project/update`,
  remove: `${baseUrl}/api/v1/contract/project/delete`,
  approve: `${baseUrl}/api/v1/contract/project/approveProject`,
};
// 项目分类
export const projectCategory = {
  treeList: `${baseUrl}/api/v1/contract/projectCategory/treeList`,
  query: `${baseUrl}/api/v1/contract/projectCategory/query`,
  add: `${baseUrl}/api/v1/contract/projectCategory/save`,
  update: `${baseUrl}/api/v1/contract/projectCategory/update`,
  remove: `${baseUrl}/api/v1/contract/projectCategory/delete`,
};
// =================  合同模块 ===============
// 基础信息
export const contract = {
  list: `${baseUrl}/api/v1/contract/contract/pageList`,
  approve: `${baseUrl}/api/v1/contract/contract/approveContract`,
  query: `${baseUrl}/api/v1/contract/contract/query`,
  add: `${baseUrl}/api/v1/contract/contract/save`,
  update: `${baseUrl}/api/v1/contract/contract/update`,
  remove: `${baseUrl}/api/v1/contract/contract/delete`,
  loadProject: `${baseUrl}/api/v1/contract/project/loadProject`,
};

// =================  财务模块 ===============

// 发票抵扣
export const bizInvoiceDeduction = {
  list: `${baseUrl}/api/v1/finance/bizInvoiceDeduction/pageList`,
  query: `${baseUrl}/api/v1/finance/bizInvoiceDeduction/query`,
  calc: `${baseUrl}/api/v1/finance/bizInvoiceDeduction/calc`,
};

// 进项发票
export const bizInvoiceInput = {
  list: `${baseUrl}/api/v1/finance/bizInvoiceInput/pageList`,
  query: `${baseUrl}/api/v1/finance/bizInvoiceInput/query`,
  add: `${baseUrl}/api/v1/finance/bizInvoiceInput/save`,
  update: `${baseUrl}/api/v1/finance/bizInvoiceInput/update`,
  remove: `${baseUrl}/api/v1/finance/bizInvoiceInput/delete`,
  uploadInvoice: `${baseUrl}/api/v1/finance/bizInvoiceInput/uploadInvoice`,
};
// 销项发票
export const bizInvoiceSale = {
  list: `${baseUrl}/api/v1/finance/bizInvoiceSale/pageList`,
  query: `${baseUrl}/api/v1/finance/bizInvoiceSale/query`,
  add: `${baseUrl}/api/v1/finance/bizInvoiceSale/save`,
  update: `${baseUrl}/api/v1/finance/bizInvoiceSale/update`,
  remove: `${baseUrl}/api/v1/finance/bizInvoiceSale/delete`,
};
// 收款单
export const bizFinReceipt = {
  list: `${baseUrl}/api/v1/finance/bizFinReceipt/pageList`,
  query: `${baseUrl}/api/v1/finance/bizFinReceipt/query`,
  add: `${baseUrl}/api/v1/finance/bizFinReceipt/save`,
  update: `${baseUrl}/api/v1/finance/bizFinReceipt/update`,
  remove: `${baseUrl}/api/v1/finance/bizFinReceipt/delete`,
  findLast: `${baseUrl}/api/v1/finance/bizFinReceipt/findLastReceipt`,
  approve: `${baseUrl}/api/v1/finance/bizFinReceipt/approveFinReceipt`,
};
// 付款单
export const bizFinPaymentRequest = {
  list: `${baseUrl}/api/v1/finance/bizFinPaymentRequest/pageList`,
  query: `${baseUrl}/api/v1/finance/bizFinPaymentRequest/query`,
  add: `${baseUrl}/api/v1/finance/bizFinPaymentRequest/save`,
  update: `${baseUrl}/api/v1/finance/bizFinPaymentRequest/update`,
  remove: `${baseUrl}/api/v1/finance/bizFinPaymentRequest/delete`,
  findLast: `${baseUrl}/api/v1/finance/bizFinPaymentRequest/findLast`,
  approve: `${baseUrl}/api/v1/finance/bizFinPaymentRequest/approveFinPayment`,
};
// 借款单
export const bizLoanBill = {
  list: `${baseUrl}/api/v1/finance/bizLoanBill/pageList`,
  query: `${baseUrl}/api/v1/finance/bizLoanBill/query`,
  add: `${baseUrl}/api/v1/finance/bizLoanBill/save`,
  update: `${baseUrl}/api/v1/finance/bizLoanBill/update`,
  remove: `${baseUrl}/api/v1/finance/bizLoanBill/delete`,
  approve: `${baseUrl}/api/v1/finance/bizLoanBill/approveLoanBill`,
};

// 报销单
export const bizReimburseBill = {
  list: `${baseUrl}/api/v1/finance/bizReimburseBill/pageList`,
  query: `${baseUrl}/api/v1/finance/bizReimburseBill/query`,
  add: `${baseUrl}/api/v1/finance/bizReimburseBill/save`,
  update: `${baseUrl}/api/v1/finance/bizReimburseBill/update`,
  remove: `${baseUrl}/api/v1/finance/bizReimburseBill/delete`,
  approve: `${baseUrl}/api/v1/finance/bizReimburseBill/approveReimburse`,
  detail: `${baseUrl}/api/v1/finance/bizReimburseDetail/pageList`,
};

// =================  物资模块 ===============

// 仓库详情
export const depotDetail = {
  list: `${baseUrl}/api/v1/depot/depotDetail/pageList`,
  query: `${baseUrl}/api/v1/depot/depotDetail/query`,
  add: `${baseUrl}/api/v1/depot/depotDetail/save`,
  update: `${baseUrl}/api/v1/depot/depotDetail/update`,
  remove: `${baseUrl}/api/v1/depot/depotDetail/delete`,
};

// 采购入库
export const purchaseDepotIn = {
  list: `${baseUrl}/api/v1/depot/purchaseDepotIn/pageList`,
  query: `${baseUrl}/api/v1/depot/purchaseDepotIn/query`,
  add: `${baseUrl}/api/v1/depot/purchaseDepotIn/save`,
  update: `${baseUrl}/api/v1/depot/purchaseDepotIn/update`,
  remove: `${baseUrl}/api/v1/depot/purchaseDepotIn/delete`,
  approve: `${baseUrl}/api/v1/depot/purchaseDepotIn/approvePurDepotIn`,
};
// 归还入库
export const returnDepotIn = {
  list: `${baseUrl}/api/v1/depot/returnDepotIn/pageList`,
  query: `${baseUrl}/api/v1/depot/returnDepotIn/query`,
  add: `${baseUrl}/api/v1/depot/returnDepotIn/save`,
  update: `${baseUrl}/api/v1/depot/returnDepotIn/update`,
  remove: `${baseUrl}/api/v1/depot/returnDepotIn/delete`,
  approve: `${baseUrl}/api/v1/depot/returnDepotIn/approveReturnDepotIn`,
};

// 采购申请
export const purchaseApply = {
  list: `${baseUrl}/api/v1/purchase/purchaseApply/pageList`,
  query: `${baseUrl}/api/v1/purchase/purchaseApply/query`,
  add: `${baseUrl}/api/v1/purchase/purchaseApply/save`,
  update: `${baseUrl}/api/v1/purchase/purchaseApply/update`,
  remove: `${baseUrl}/api/v1/purchase/purchaseApply/delete`,
  approve: `${baseUrl}/api/v1/purchase/purchaseApply/approvePurApply`,
};

// 采购询价
export const purchaseEnquiry = {
  list: `${baseUrl}/api/v1/purchase/purchaseEnquiry/pageList`,
  query: `${baseUrl}/api/v1/purchase/purchaseEnquiry/query`,
  add: `${baseUrl}/api/v1/purchase/purchaseEnquiry/save`,
  update: `${baseUrl}/api/v1/purchase/purchaseEnquiry/update`,
  remove: `${baseUrl}/api/v1/purchase/purchaseEnquiry/delete`,
  approve: `${baseUrl}/api/v1/purchase/purchaseEnquiry/approvePurEnquiry`,
};
// 采购询价材料
export const purEnquiryMaterial = {
  list: `${baseUrl}/api/v1/purchase/purEnquiryMaterial/pageList`,
  query: `${baseUrl}/api/v1/purchase/purEnquiryMaterial/query`,
  add: `${baseUrl}/api/v1/purchase/purEnquiryMaterial/save`,
  update: `${baseUrl}/api/v1/purchase/purEnquiryMaterial/update`,
  remove: `${baseUrl}/api/v1/purchase/purEnquiryMaterial/delete`,
};
// 采购询价记录
export const purEnquiryRecords = {
  list: `${baseUrl}/api/v1/purchase/purEnquiryRecords/pageList`,
  query: `${baseUrl}/api/v1/purchase/purEnquiryRecords/query`,
  add: `${baseUrl}/api/v1/purchase/purEnquiryRecords/save`,
  update: `${baseUrl}/api/v1/purchase/purEnquiryRecords/update`,
  remove: `${baseUrl}/api/v1/purchase/purEnquiryRecords/delete`,
};
// 采购需求计划--详情
export const purNeedDetail = {
  list: `${baseUrl}/api/v1/purchase/purNeedDetail/pageList`,
  query: `${baseUrl}/api/v1/purchase/purNeedDetail/query`,
  add: `${baseUrl}/api/v1/purchase/purNeedDetail/save`,
  update: `${baseUrl}/api/v1/purchase/purNeedDetail/update`,
  remove: `${baseUrl}/api/v1/purchase/purNeedDetail/delete`,
};

// 采购申请--详情
export const purApplyDetail = {
  list: `${baseUrl}/api/v1/purchase/purApplyDetail/pageList`,
  query: `${baseUrl}/api/v1/purchase/purApplyDetail/queryByformId`,
};

// 采购需求计划主表
export const purchaseNeed = {
  list: `${baseUrl}/api/v1/purchase/purchaseNeed/pageList`,
  query: `${baseUrl}/api/v1/purchase/purchaseNeed/query`,
  add: `${baseUrl}/api/v1/purchase/purchaseNeed/save`,
  update: `${baseUrl}/api/v1/purchase/purchaseNeed/update`,
  remove: `${baseUrl}/api/v1/purchase/purchaseNeed/delete`,
};

// 采购结算
export const settle = {
  list: `${baseUrl}/api/v1/finance/settle/pageList`,
  query: `${baseUrl}/api/v1/finance/settle/query`,
  add: `${baseUrl}/api/v1/finance/settle/save`,
  update: `${baseUrl}/api/v1/finance/settle/update`,
  remove: `${baseUrl}/api/v1/finance/settle/delete`,
  approve: `${baseUrl}/api/v1/finance/settle/approve`,
};

// 领用出库
export const depotOut = {
  list: `${baseUrl}/api/v1/depot/depotOut/pageList`,
  query: `${baseUrl}/api/v1/depot/depotOut/query`,
  add: `${baseUrl}/api/v1/depot/depotOut/save`,
  update: `${baseUrl}/api/v1/depot/depotOut/update`,
  remove: `${baseUrl}/api/v1/depot/depotOut/delete`,
  approve: `${baseUrl}/api/v1/depot/depotOut/approveDepotOut`,
};

// 库存调拨
export const depotTransfer = {
  list: `${baseUrl}/api/v1/depot/depotTransfer/pageList`,
  query: `${baseUrl}/api/v1/depot/depotTransfer/query`,
  add: `${baseUrl}/api/v1/depot/depotTransfer/save`,
  update: `${baseUrl}/api/v1/depot/depotTransfer/update`,
  remove: `${baseUrl}/api/v1/depot/depotTransfer/delete`,
  approve: `${baseUrl}/api/v1/depot/depotTransfer/approveDepotTransfer`,
};

// 退货出库
export const refundDepotOut = {
  list: `${baseUrl}/api/v1/depot/refundDepotOut/pageList`,
  query: `${baseUrl}/api/v1/depot/refundDepotOut/query`,
  add: `${baseUrl}/api/v1/depot/refundDepotOut/save`,
  update: `${baseUrl}/api/v1/depot/refundDepotOut/update`,
  remove: `${baseUrl}/api/v1/depot/refundDepotOut/delete`,
  approve: `${baseUrl}/api/v1/depot/refundDepotOut/approveRefundDepotOut`,
};

// 库存盘点
export const depotCheck = {
  list: `${baseUrl}/api/v1/depot/depotCheck/pageList`,
  query: `${baseUrl}/api/v1/depot/depotCheck/query`,
  add: `${baseUrl}/api/v1/depot/depotCheck/save`,
  update: `${baseUrl}/api/v1/depot/depotCheck/update`,
  remove: `${baseUrl}/api/v1/depot/depotCheck/delete`,
  approve: `${baseUrl}/api/v1/depot/depotCheck/approveDepotCheck`,
};

// 库存盘点详情
export const depotCheckDetail = {
  list: `${baseUrl}/api/v1/depot/depotCheckDetail/pageList`,
  query: `${baseUrl}/api/v1/depot/depotCheckDetail/query`,
  queryByformId: `${baseUrl}/api/v1/depot/depotCheckDetail/queryByformId`,
};

// 出入库详情
export const depotInOutDetail = {
  remove: `${baseUrl}/api/v1/depot/depotInOutDetail/delete`,
  list: `${baseUrl}/api/v1/depot/depotInOutDetail/pageList`,
  query: `${baseUrl}/api/v1/depot/depotInOutDetail/query`,
  queryByFormId: `${baseUrl}/api/v1/depot/depotInOutDetail/queryByFormId`,
  add: `${baseUrl}/api/v1/depot/depotInOutDetail/save`,
  update: `${baseUrl}/api/v1/depot/depotInOutDetail/update`,
  pageListByMaterial: `${baseUrl}/api/v1/depot/depotInOutDetail/pageListByMaterial`,
};

// 租赁入场
export const leaseIn = {
  remove: `${baseUrl}/api/v1/lease/leaseIn/delete`,
  list: `${baseUrl}/api/v1/lease/leaseIn/pageList`,
  query: `${baseUrl}/api/v1/lease/leaseIn/query`,
  add: `${baseUrl}/api/v1/lease/leaseIn/save`,
  update: `${baseUrl}/api/v1/lease/leaseIn/update`,
  approve: `${baseUrl}/api/v1/lease/leaseIn/approveLease`,
};
export const leaseInDetail = {
  // list: `${baseUrl}/api/v1/lease/leaseInDetail/pageList`,
  query: `${baseUrl}/api/v1/lease/leaseInDetail/query`,
  list: `${baseUrl}/api/v1/lease/leaseInDetail/getMachineList`,
  getMachineList: `${baseUrl}/api/v1/lease/leaseInDetail/getMachineList`,
};

// 租赁退场
export const leaseOut = {
  remove: `${baseUrl}/api/v1/lease/leaseOut/delete`,
  list: `${baseUrl}/api/v1/lease/leaseOut/pageList`,
  query: `${baseUrl}/api/v1/lease/leaseOut/query`,
  add: `${baseUrl}/api/v1/lease/leaseOut/save`,
  update: `${baseUrl}/api/v1/lease/leaseOut/update`,
  approve: `${baseUrl}/api/v1/lease/leaseOut/approveLease`,
};

// 租赁盘点
export const leaseCheck = {
  remove: `${baseUrl}/api/v1/lease/leaseCheck/delete`,
  list: `${baseUrl}/api/v1/lease/leaseCheck/pageList`,
  query: `${baseUrl}/api/v1/lease/leaseCheck/query`,
  add: `${baseUrl}/api/v1/lease/leaseCheck/save`,
  update: `${baseUrl}/api/v1/lease/leaseCheck/update`,
  approve: `${baseUrl}/api/v1/lease/leaseCheck/approveLeaseCheck`,
};

// 工作日志
export const worklog = {
  remove: `${baseUrl}/api/v1/worklog/workLog/delete`,
  list: `${baseUrl}/api/v1/worklog/workLog/pageList`,
  query: `${baseUrl}/api/v1/worklog/workLog/query`,
  add: `${baseUrl}/api/v1/worklog/workLog/save`,
  update: `${baseUrl}/api/v1/worklog/workLog/update`,
};

// ================================= 巡检=============================
// 检查单
export const inspection = {
  remove: `${baseUrl}/api/inspect/inspection/delete`,
  list: `${baseUrl}/api/inspect/inspection/pageList`,
  query: `${baseUrl}/api/inspect/inspection/query`,
  add: `${baseUrl}/api/inspect/inspection/save`,
  update: `${baseUrl}/api/inspect/inspection/update`,
};

// 检查单项目
export const inspectionSetting = {
  remove: `${baseUrl}/api/inspect/inspectionItem/delete`,
  list: `${baseUrl}/api/inspect/inspectionItem/pageList`,
  query: `${baseUrl}/api/inspect/inspectionItem/query`,
  add: `${baseUrl}/api/inspect/inspectionItem/save`,
  update: `${baseUrl}/api/inspect/inspectionItem/update`,
};

// 质量整改
export const inspectionReform = {
  remove: `${baseUrl}/api/inspect/inspectionReform/delete`,
  list: `${baseUrl}/api/inspect/inspectionReform/pageList`,
  query: `${baseUrl}/api/inspect/inspectionReform/query`,
  add: `${baseUrl}/api/inspect/inspectionReform/save`,
  update: `${baseUrl}/api/inspect/inspectionReform/update`,
  checkPass: `${baseUrl}/api/inspect/inspectionReform/checkPass`,
  checkReject: `${baseUrl}/api/inspect/inspectionReform/checkReject`,
  feedback: `${baseUrl}/api/inspect/inspectionReform/feedback`,
};

// 奖惩
export const inspectionRap = {
  remove: `${baseUrl}/api/inspect/inspectionRap/delete`,
  list: `${baseUrl}/api/inspect/inspectionRap/pageList`,
  query: `${baseUrl}/api/inspect/inspectionRap/query`,
  add: `${baseUrl}/api/inspect/inspectionRap/save`,
  update: `${baseUrl}/api/inspect/inspectionRap/update`,
};

// 流程审批接口
export const workflowApproval = {
  approve: `${baseUrl}/api/v1/workflowApproval/approve`,
  list: `${baseUrl}/api/v1/workflowApproval/pageList`,
  reject: `${baseUrl}/api/v1/workflowApproval/reject`,
  revoke: `${baseUrl}/api/v1/workflowApproval/revoke`,
  pass: `${baseUrl}/api/v1/workflowApproval/pass`,
  forcePass: `${baseUrl}/api/v1/workflowApproval/forcePass`,
  auditList: `${baseUrl}/api/v1/workflowApproval/auditList`,
  viewProcess: `${baseUrl}/api/v1/workflowApproval/viewProcess`,
  myCreated: `${baseUrl}/api/v1/workflowApproval/myCreated`,
  processList: `${baseUrl}/api/v1/workflowApproval/processList`,
  copyToMeList: `${baseUrl}/api/v1/workflowApproval/copyToMeList`,
  rejectList: `${baseUrl}/api/v1/workflowApproval/rejectList`,
  findProcessList: `${baseUrl}/api/v1/workflowApproval/findProcessList`,
  getCanModifyColumn: `${baseUrl}/api/v1/workflowApproval/getCanModifyColumn`,
  getPrevNodes: `${baseUrl}/api/v1/workflowApproval/getPrevNodes`,
  urge: `${baseUrl}/api/v1/workflowApproval/urge`,
};

// =================  附件相关 ===============

export const file = {
  delete: `${baseUrl}/api/v1/base/attachment/delete`,
  list: `${baseUrl}/api/v1/base/attachment/pageList`,
  query: `${baseUrl}/api/v1/base/attachment/query`,
  save: `${baseUrl}/api/v1/base/attachment/save`,
  update: `${baseUrl}/api/v1/base/attachment/update`,
  uploadFile: `${baseUrl}/api/v1/base/attachment/uploadFile`,
  uploadPicture: `${baseUrl}/api/v1/base/attachment/uploadPicture`,
  viewFile: `${baseUrl}/api/v1/base/attachment/viewFile`,
  imgOSS: isTest()
    ? 'http://jgoa-test.oss-cn-hangzhou.aliyuncs.com/'
    : 'http://jgproject.oss-cn-hangzhou.aliyuncs.com/',
};

// const flowUrl = 'http://106.52.173.64:8010';
const flowUrl = baseUrl;
// 流程定义
export const processDefinition = {
  list: `${flowUrl}/api/v1/workflow/processDefinition/pageList`,
  query: `${flowUrl}/api/v1/workflow/processDefinition/query`,
  add: `${flowUrl}/api/v1/workflow/processDefinition/save`,
  update: `${flowUrl}/api/v1/workflow/processDefinition/update`,
  remove: `${flowUrl}/api/v1/workflow/processDefinition/delete`,
  publish: `${flowUrl}/api/v1/workflow/processDefinition/publish`,
  cancelPublish: `${flowUrl}/api/v1/workflow/processDefinition/cancelPublish`,
};

// 流程基础数据
export const processBasic = {
  department: `${flowUrl}/api/v1/workflow/basicData/getAllDepartment`, //获取某个公司的全部部门
  role: `${flowUrl}/api/v1/workflow/basicData/getAllRole`, //获取某个公司的全部角色
  organization: `${flowUrl}/api/v1/workflow/basicData/getOrganization`, //获取某个公司的组织架构
  user: `${flowUrl}/api/v1/workflow/basicData/getUserByDepartmentId`, //获取某一部门下的全部员工
};

// 流程
export const processList = {
  list: `${flowUrl}/api/v1/workflow/process/pageList`,
  query: `${flowUrl}/api/v1/workflow/process/query`,
  add: `${flowUrl}/api/v1/workflow/process/save`,
  update: `${flowUrl}/api/v1/workflow/process/update`,
  remove: `${flowUrl}/api/v1/workflow/process/delete`,
};

// 流程分类
export const processCategory = {
  list: `${flowUrl}/api/v1/workflow/processCategory/pageList`,
  all: `${flowUrl}/api/v1/workflow/processCategory/list`,
  query: `${flowUrl}/api/v1/workflow/processCategory/query`,
  add: `${flowUrl}/api/v1/workflow/processCategory/save`,
  update: `${flowUrl}/api/v1/workflow/processCategory/update`,
  remove: `${flowUrl}/api/v1/workflow/processCategory/delete`,
};

// 任务
export const task = {
  chargeList: `${baseUrl}/api/v1/task/task/chargeList`,
  confirmList: `${baseUrl}/api/v1/task/task/confirmList`,
  createList: `${baseUrl}/api/v1/task/task/createList`,
  participateList: `${baseUrl}/api/v1/task/task/participateList`,
  query: `${baseUrl}/api/v1/task/task/query`,
  add: `${baseUrl}/api/v1/task/task/save`,
  update: `${baseUrl}/api/v1/task/task/update`,
  remove: `${baseUrl}/api/v1/task/task/delete`,
  beginTask: `${baseUrl}/api/v1/task/task/beginTask`,
  cancelTask: `${baseUrl}/api/v1/task/task/cancelTask`,
  getSubTask: `${baseUrl}/api/v1/task/task/getSubTask`,
  stopTask: `${baseUrl}/api/v1/task/task/stopTask`,
  rejectTask: `${baseUrl}/api/v1/task/task/rejectTask`,
  approveTask: `${baseUrl}/api/v1/task/task/approveTask`,
  submitTask: `${baseUrl}/api/v1/task/task/submitTask`,
  feedBack: `${baseUrl}/api/v1/task/task/feedBack`,
  taskProgress: `${baseUrl}/api/v1/task/taskProgress/pageList`,
  getDefaultByProjectId: `${baseUrl}/api/v1/task/taskDefault/getDefaultByProjectId`,
};

// 日程
export const schedule = {
  getScheduleByMonth: `${baseUrl}/api/v1/task/schedule/getScheduleByMonth`,
  getTaskByDate: `${baseUrl}/api/v1/task/schedule/getTaskByDate`,
};

// 任务默认属性
export const taskDefault = {
  list: `${baseUrl}/api/v1/task/taskDefault/pageList`,
  query: `${baseUrl}/api/v1/task/taskDefault/query`,
  add: `${baseUrl}/api/v1/task/taskDefault/save`,
  update: `${baseUrl}/api/v1/task/taskDefault/update`,
  remove: `${baseUrl}/api/v1/task/taskDefault/delete`,
  getDefaultByProjectId: `${baseUrl}/api/v1/task/taskDefault/getDefaultByProjectId`,
};

// =================  项目配置 ===============
export const tableConfig = {
  // 这里根据form配置了代理
  query: `${baseUrl}/form/engine/query`,
  system: `${baseUrl}/form/engine/system/pageList`,
  listSetquery: `${baseUrl}/api/v1/system/listSet/query`,
  listSetsave: `${baseUrl}/api/v1/system/listSet/save`,
};

// 自定义流程接口
export const allinone = {
  list: `${baseUrl}/api/v1/customize/allinone/pageList`,
  all: `${baseUrl}/api/v1/customize/allinone/list`,
  query: `${baseUrl}/api/v1/customize/allinone/query`,
  add: `${baseUrl}/api/v1/customize/allinone/save`,
  update: `${baseUrl}/api/v1/customize/allinone/update`,
  remove: `${baseUrl}/api/v1/customize/allinone/delete`,
  approve: `${baseUrl}/api/v1/customize/allinone/approveAllinone`,
};

// 关联模块数据接口
export const relation = {
  getRelateList: `${baseUrl}/api/v1/relateInfo/getRelateList`,
  getRelateMenuList: `${baseUrl}/api/v1/relateInfo/getRelateMenuList`,
};

//评论
export const comment = {
  list: `${baseUrl}/api/v1/system/comment/pageList`,
  query: `${baseUrl}/api/v1/system/comment/query`,
  add: `${baseUrl}/api/v1/system/comment/save`,
  remove: `${baseUrl}/api/v1/system/comment/delete`,
  update: `${baseUrl}/api/v1/system/comment/update`,
};

// 评论标签
export const taskTag = {
  list: `${baseUrl}/api/v1/task/taskTag/list`,
  query: `${baseUrl}/api/v1/task/taskTag/query`,
  add: `${baseUrl}/api/v1/task/taskTag/save`,
  remove: `${baseUrl}/api/v1/task/taskTag/delete`,
  update: `${baseUrl}/api/v1/task/taskTag/update`,
};
