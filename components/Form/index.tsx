import React from 'react';
import { View } from 'react-native';
import { ThemeProvider, useTheme } from 'react-native-elements';

const customTheme = {
  colors: {
    primary: "#1890ff"
  },
  Button: {
    raised: true,
    buttonStyle: { height: 50, boxShadow: 0 }
  },
};

function FormView({ onSubmit, onReset, children }) {
  return (
    <ThemeProvider theme={customTheme}>
      <View style={{ padding: 10 }}>
        {children}
      </View>
    </ThemeProvider>
  );
}



export default FormView;
