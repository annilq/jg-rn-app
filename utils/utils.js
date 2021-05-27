/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function isUrl(path) {
  return reg.test(path);
}

export function findItem(id, list) {
  let item = {};
  for (let i = 0; i < list.length; i++) {
    if (id == list[i].id) {
      item = list[i];
    }
  }
  return item;
}

export function findTreeValue(id, tree) {
  var isGet = false;
  var name = null;
  function search(tree, id) {
    for (let i = 0; i < tree.length; i++) {
      if (tree[i].children && tree[i].children.length > 0) {
        search(tree[i].children, id);
      }
      if (id.toString() === tree[i].id.toString() || isGet) {
        isGet || (name = tree[i].name);
        isGet = true;
        break;
      }
    }
  }
  search(tree, id);

  return name;
}

export const getApprovalStatusColor = status => {
  switch (status) {
    case 'UNDERWAY':
      return 'tagColor1';
    case 'REJECT':
      return 'tagColor2';
    case 'COMPLETE':
      return 'tagColor3';
    case 'REVOKE':
      return 'tagColor4';
    default:
      return 'tagColor5';
  }
};

export const getApprovalStatusText = status => {
  switch (status) {
    case 'UNDERWAY':
      return '审批中';
    case 'REJECT':
      return '审批驳回';
    case 'COMPLETE':
      return '审批完成';
    case 'REVOKE':
      return '撤回';
    default:
      return '未提交审批';
  }
};

export const getApprovalTypeTextColor = status => {
  switch (status) {
    case 8:
      return '#0dcbe4';
    case 0:
      return '#bebebe';
    case 1:
      return '#1890ff';
    case 2:
      return '#ff5640';
    case 4:
      return '#f6be1a';
    default:
      return '#000';
  }
};

export const getTaskStatusColor = status => {
  switch (status) {
    case 'INIT':
      return '#f6be1a';
    case 'RUNNING':
    case 'SUBMIT':
      return '#0dcbe4';
    case 'REJECT':
      return '#ff5640';
    case 'FINISH':
      return '#1890ff';
    case 'CANCEL':
    case 'STOP':
      return 'grey';
    default:
      return '#000';
  }
};


export const getDepotDetailType = data => {
  switch (data) {
    case 'PURCHASE_DEPOT_IN':
      return '采购入库';
    case 'RETURN_DEPOT':
      return '退货入库';
    case 'DEPOT_OUT':
      return '领用出库';
    case 'REFUND_DEPOT_OUT':
      return '退货出库';
    case 'DEPOT_TRANSFER_IN':
      return '调拨入库';
    case 'DEPOT_TRANSFER_OUT':
      return '调拨出库';
    case 'DEPOT_CHECK_FRMLOSS':
      return '盘点报损';
    case 'DEPOT_CHECK_OVERFLOW':
      return '盘点报溢';
    default:
      return '';
  }
};

export const getDepotDetailTransferNum = data => {
  switch (data) {
    case 'PURCHASE_DEPOT_IN':
      return '';
    case 'RETURN_DEPOT':
      return '';
    case 'DEPOT_OUT':
      return '-';
    case 'REFUND_DEPOT_OUT':
      return '-';
    case 'DEPOT_TRANSFER_IN':
      return '';
    case 'DEPOT_TRANSFER_OUT':
      return '-';
    case 'DEPOT_CHECK_FRMLOSS':
      return '-';
    case 'DEPOT_CHECK_OVERFLOW':
      return '';
    default:
      return '';
  }
};

export const isProduction = () => process.env.NODE_ENV === 'production';

export const isTest = () =>true
  // window.location.href.indexOf('project-test') !== -1 ||
  // window.location.href.indexOf('localhost') !== -1;

export const getLoginUrl = () => {
  if (isTest()) {
    return 'http://uc-test.jianguanoa.com:8100/#/user/login';
  }
  return 'https://uc.jianguanoa.com/#/user/login';
};

export const getAccountUrl = () => {
  if (isTest()) {
    return 'http://uc-test.jianguanoa.com:8100/#/account';
  }
  return 'https://uc.jianguanoa.com/#/account';
};
