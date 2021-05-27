import { useState, useEffect } from 'react';
import useFormConfig from '@/hooks/useFormConfig';

function getSearchList(containers) {
  const searchForms = containers.reduce((acc, container) => {
    const searchControls =
      (container.controls && container.controls.filter(item => item.isSearchAble === true)) || [];
    return acc.concat(searchControls);
  }, []);
  return searchForms;
}

function useSearchConfig(formCode) {
  const [list, setList] = useState([]);
  const { tableConfig } = useFormConfig(formCode);

  useEffect(() => {
    if (tableConfig.containers&&tableConfig.containers.length > 0) {
      const searchListConfig = getSearchList(tableConfig.containers);
      if (searchListConfig.length > 0) {
        setList(searchListConfig);
      }
    }
  }, [tableConfig]);

  return [list, setList];
}
export default useSearchConfig
