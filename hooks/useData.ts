import { useState, useEffect, useRef } from 'react';

interface data {
  code: number;
  info: string;
  resp: object;
}
interface list {
  code: number;
  info: string;
  resp: {
    currentPage: number;
    list: object[];
    pageSize: number;
    totalPage: number;
    totalSize: number;
  };
}

export function useData(fn, id) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(
    () => {
      function getData() {
        setLoading(true);
        fn(id).then((response: data) => {
          setData(response && response.resp);
          setLoading(false);
        }).catch(err=>{
          setLoading(false);
        });
      }
      getData();
    },
    [id]
  );

  return [data,loading];
}

export function useList(fn, params) {
  const [data, setData] = useState([]);
  const listRef = useRef(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    function getData() {
      setLoading(true);
      fn(params).then((response: list) => {
        setData(response && response.resp.list);
        setLoading(false);
      });
    }
    getData();
  }, []);

  return [loading, data];
}
