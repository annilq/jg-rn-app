// https://usehooks-typescript.com/react-hook/use-fetch
import { useReducer, useEffect } from 'react'

import request from '@/utils/request';
// State & hook output
interface State<T> {
  status: 'init' | 'fetching' | 'error' | 'fetched'
  data?: T
  error?: string
}

// discriminated union type
type Action<T> =
  | { type: 'request' }
  | { type: 'success'; payload: T }
  | { type: 'failure'; payload: string }
function useFetch<T = unknown>(
  url?: string,
  params?: any = {},
  options?: any = {},
): State<T> {
  const { pageRemote, ...newparams } = params
  const paramsStr = JSON.stringify(newparams)
  let cancelRequest = false
  const initialState: State<T> = {
    status: 'init',
    error: undefined,
    data: undefined,
  }
  // Keep state logic separated
  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case 'request':
        return { ...initialState, data: state.data, status: 'fetching' }
      case 'success':
        return { ...initialState, status: 'fetched', data: action.payload }
      case 'failure':
        return { ...initialState, status: 'error', error: action.payload }
      default:
        return state
    }
  }
  const [state, dispatch] = useReducer(fetchReducer, initialState)
  useEffect(() => {
    if (!url) {
      return
    }
    const fetchData = async () => {
      dispatch({ type: 'request' })
      try {
        const response = await request(url, { data: JSON.parse(paramsStr), ...options })
        if (cancelRequest) return
        const { resp } = response;
        if (resp.currentPage && state.data && pageRemote) {
          const { list, ...rest } = resp;
          const newData = { list: state.data.list.concat(list), ...rest };
          dispatch({ type: 'success', payload: newData })
        } else {
          dispatch({ type: 'success', payload: resp })
        }

      } catch (error) {
        if (cancelRequest) return
        dispatch({ type: 'failure', payload: error.message })
      }
    }
    fetchData()
    return () => {
      cancelRequest = true
    }
  }, [url, paramsStr])
  return state
}
export default useFetch