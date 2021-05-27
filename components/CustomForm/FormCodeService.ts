// 根据具体的formCode返回对应的service
// 之前写在router的配置里面，如果引用不在router配置的formCode表单有点不方便
import get from 'lodash/get';

import Service from '@/services';
import { getConfigFormPath } from '@/routerConfig'

const FormCodeServiceMap = {
  Project: 'Project',
  Approval: 'Workflow.Approval',
  Contract: 'Contract.InContract',
  outContract: 'Contract.OutContract',
  materialContract: 'Contract.MaterialContract',
  workerContract: 'Contract.WorkerContract',
  otherContract: 'Contract.OtherContract',
  leaseContract: 'Contract.LeaseContract',
  laborContract: 'Contract.LaborContract',
  InputInvoice: 'Invoice.inputInvoice',
  SaleInvoice: 'Invoice.saleInvoice',
  PaymentFinance: 'Finance.Payment',
  ReceiptFinance: 'Finance.Receipt',
  Settle: 'Finance.Settle',
  SelectFinancePaymentDetail1: 'Finance.SelectFinancePaymentDetail',
  SalaryFinance: 'Finance.Salary',
  LoanBill: 'Finance.Loan',
  ReimburseBill: 'Finance.Reimburse',
  PurchasePayable: 'Purchase.PurchaseSettle',
  PurchaseApply: 'Purchase.PurchaseApply',
  PurchaseEnquiry: 'Purchase.PurchaseEnquiry',
  PurchaseNeed: 'Purchase.PurchaseNeed',
  PurchaseDepotIn: 'Supply.DepotIn',
  ReturnDepotIn: 'Supply.ReturnDepotIn',
  DepotOut: 'Supply.DepotOut',
  RefundDepotOut: 'Supply.RefundDepotOut',
  DepotTransfer: 'Supply.DepotTransfer',
  DepotCheck: 'Supply.DepotCheck',
  LeaseIn: 'Rent.LeaseIn',
  LeaseOut: 'Rent.LeaseOut',
  LeaseInDetail: 'Rent.LeaseInDetail',
  Supplier: 'Database.Supplier',
  Material: 'Database.Material',
  Machine: 'Database.Machine',
  Depot: 'Database.Depot',
  User: 'System.User',
  UserGroup: 'System.UserGroup',
  QualityCheck: 'Field.QualityInspection',
  Incentive: 'Field.InspectionRap',
  Reform: 'Field.InspectionReform',
  // SafetyInspection: 'Field.SafetyInspection',
  // QualityInspection: 'Field.QualityInspection',
  //   task一个formCode对应几个service
  Task: 'Task',
  WorkLog: 'WorkLog',
  //   全自定义表单
  USERCREATE: 'UserCreate',
  classGroup: 'Labor',
  project_fund_plan: 'FundPlan.FundPlan',
  FundDetail: 'FundPlan.FundPlanModel',
  materialPlan: 'ProjectMaterial.MaterialPlan',
  materialDetail: 'ProjectMaterial.MaterialDetail',
  materialReport: 'ProjectMaterial.MaterialReport',
  FundReport: "FundReport",
};

type FormCodeType = keyof typeof FormCodeServiceMap;
// 只有下面两种formCode，在不同的列表用到不同的service
// 任务类型
type TaskType = 'CreateList' | 'Charge' | 'ParticipateList' | 'ConfirmList';
// 审批类型
type Approval = 'myhandle' | 'mycreate' | 'finish' | 'copytome' | 'rejectservice';

// 自定义表单类型
type UserCreate = 'USERCREATE';

type ServiceType = Approval | TaskType | UserCreate;

function getServiceFromFormCode(formCode: FormCodeType) {
  const serviceName = FormCodeServiceMap[formCode];
  return get(Service, serviceName);
}

function getServiceAndFormCodeFromPath(path = "") {
  const ifSystemForm = path.indexOf('usercreate') > -1;
  if (ifSystemForm) {
    const pathArr = path.split('/');
    const formCode = pathArr[pathArr.length - 1];
    return { service: getServiceFromFormCode("USERCREATE"), formCode };
  } else {
    const { formCode } = getConfigFormPath(path);
    return { service: getServiceFromFormCode(formCode), formCode };
  }
}


export { FormCodeType, ServiceType, getServiceAndFormCodeFromPath };

export default getServiceFromFormCode;
