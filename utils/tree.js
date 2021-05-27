/**
 * 根据Id获取父节点Id
 * @author hmy
 *
 * @param id      String
 * @param tree    Array
 */

export const getParentId = (id, tree) => {
  let parentId;
  for (let i = 0; i < tree.length; i++) {
    if (tree[i].children) {
      if (tree[i].children.some(item => item.id == id)) {
        parentId = tree[i].id;
      } else if (getParentId(id, tree[i].children)) {
        parentId = getParentId(id, tree[i].children);
      }
    }
  }
  return parentId;
};

/**
 * 树状结构扁平化
 * @author hmy
 *
 * @param data         Array
 * @param dataList     Array
 */
export const generateList = (data, dataList) => {
  for (let i = 0; i < data.length; i++) {
    dataList.push(data[i]);
    if (data[i].children) {
      generateList(data[i].children, dataList);
    }
  }
};

/**
 * 根据Id获取所有祖先节点Id
 * @author hmy
 *
 * @param id            String
 * @param list          Array
 * @param parentIdArr   Array
 */
export const findParentIdArr = (id, list, parentIdArr) => {
  const parentId = getParentId(id, list);
  if (parentId) {
    // 顶层parentId为0
    parentIdArr.push(parentId);
    // 逐层往上直至顶层
    findParentIdArr(parentId, list, parentIdArr);
  }
};

// 树状结构拼装携带父节点id (选中值为string, 需要转换)
export const generateIdArray = (ids = [], list = []) => {
  const idArray = [...ids];
  for (let i = 0; i < ids.length; i++) {
    findParentIdArr(parseInt(ids[i], 10), list, idArray);
  }
  return idArray.filter((item, i, self) => item && self.indexOf(item) === i); // 过滤null值和重复值;
};

const getSubIds = (subIdArray, list) => {
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    if (item.children && item.children.length > 0) {
      getSubIds(subIdArray, item.children);
    } else {
      subIdArray.push(item.id.toString());
    }
  }
};

// 树状结构拆卸去掉父节点id (给控件需要string，需要转换)
export const findIdArray = (ids = [], list = []) => {
  const subIdArray = [];
  getSubIds(subIdArray, list);

  const idArray = [];
  for (let i = 0; i < ids.length; i++) {
    if (subIdArray.indexOf(ids[i]) !== -1) {
      idArray.push(ids[i]);
    }
  }

  return idArray;
};
