import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Input } from 'antd';
import FormEvent from '@/utils/formevent';
import { DataPicker, JgSelect } from '@/components/CustomForm';
import { query } from '@/services/workflow/processDefinition';

interface SelectProps extends JgFormProps.IFormProps {
  formCode: string;
}

function ApproveSelect(props: SelectProps) {
  const {
    project, formdata, value: { approveProcessId, nextNodeApprovers },
    dispatch, formCode, processList: data = [], onChange
  } = props;

  const [flowData, setFlowData] = useState(null);
  const projectId = project.id || formdata.projectId
  function handler(params) {
    const { value, emitType } = params
    // 只响应onChange不响应onSelect
    if (emitType === 1) {
      if (value) {
        dispatch({ type: 'workflow/processListRemote', payload: { formCode, projectId: value } });
      } else {
        dispatch({ type: 'workflow/processListRemote', payload: { formCode } });
      }
    }
  }

  function clearData() {
    handler(data);
    onChange({ approveProcessId: null, nextNodeApprovers: null });
    setFlowData(null);
  }

  function handleProjectChange(data) {
    handler(data);
    clearData()
  }

  // 不是项目看板下监听表单的projectId来切换审批流程列表
  useEffect(() => {
    FormEvent.on(`${formCode}.projectId`, handleProjectChange);
    return () => {
      FormEvent.removeListener(`${formCode}.projectId`, handleProjectChange);
      // 清除审批列表历史，否则默认选中的流程会显示在别的流程
      dispatch({ type: 'workflow/processList', payload: { processList: [] } });
    };
  }, []);

  // 只有一个流程定义时候默认选中
  useEffect(() => {
    if (data && data.length === 1) {
      onChange({ approveProcessId: data[0].id, nextNodeApprovers: null });
    }
  }, [data]);

  // 项目看板下根据项目切换来显示审批流程
  useEffect(
    () => {
      handler({ value: projectId, emitType: 1 });
    },
    [projectId]
  );
  // 请求流程图数据
  useEffect(
    () => {
      if (approveProcessId) {
        query({ id: approveProcessId }).then(({ resp: flowdata }) => {
          setFlowData(flowdata);
        });
      }
    },
    [approveProcessId]
  );
  function onSelectApprovers(data) {
    const newData = data && data.map(({ name, id }) => ({
      name,
      id,
    }));
    onChange({ approveProcessId, nextNodeApprovers: JSON.stringify(newData) });
  }

  function flowOnChange(value) {
    onChange({ approveProcessId: value, nextNodeApprovers });
  }

  const flow = data.find(item => item.id === approveProcessId);
  const defaultApprovers = (nextNodeApprovers && JSON.parse(nextNodeApprovers)) || [];
  const names = defaultApprovers.map(item => item.name).join(',');
  const approverIds = defaultApprovers.map(item => item.id).join(',');
  // 判断第二个节点是否是指定审批人类型
  const [{ targetNodeCode: secondLink }] = (flowData && flowData.linkList) || [{ targetNodeCode: null }];
  const secondNode = secondLink && flowData.nodeList.find(item => item.nodeCode === secondLink);
  const isCustomApprover = secondNode && secondNode.operatorType === 6
  return (
    <>
      <JgSelect
        value={flow && flow.id || ""}
        style={{ width: '100%' }}
        onChange={flowOnChange}
        placeholder="审批流程版本"
        data={data}
        optionKeys={["definitionName", "id"]}
      />
      {isCustomApprover && (
        <div style={{ lineHeight: '32px', width: "100%", marginTop: 10 }}>
          <div>审批人:</div>
          <DataPicker
            extraProps={{
              formCode: 'User',
              multiple: true,
            }}
            formdata={{ ...formdata, approverIds }}
            id="approverIds"
            placeholder="审批人"
            onSelect={data => onSelectApprovers(data)}
            onChange={data => onSelectApprovers(data && data.split(','))}
          >
            <Input
              value={names}
              placeholder="审批人"
              style={{ flex: 1, verticalAlign: 'middle' }}
            />
          </DataPicker>
        </div>
      )
      }
    </>
  );

}

export default connect(({ workflow, project }) => ({
  project: project.project,
  processList: workflow.processList,
}))(ApproveSelect);
