import React from 'react';
import { Text } from 'react-native';
import { ErrorBoundary } from 'react-error-boundary'

// referance :https://reactjs.org/docs/error-boundaries.html
function FallbackComponent({ error, resetErrorBoundary }) {
  return (
    <Text style={{ color: "red" }}>解析失败</Text>
  )
}

const ErrorBoundaryWrapper = (WrapComponent: any) => (props) => {
  return (
    <ErrorBoundary
      FallbackComponent={FallbackComponent}
      onReset={() => {
        // reset the state of your app so the error doesn't happen again
        // router.goBack();
      }}
    >
      <WrapComponent {...props} />
    </ErrorBoundary>);
};

export default ErrorBoundaryWrapper