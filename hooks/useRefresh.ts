import { number } from 'prop-types';
import { useState } from 'react';

function useRefresh() {
  const [_, setTimer] = useState(0);
  
  function refresh() {
    const newTimer = Date.now();
    setTimer(newTimer)
  }

  return refresh;
}
export default useRefresh;