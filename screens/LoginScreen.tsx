import React, { useEffect } from 'react';
import Form, { Field } from 'rc-field-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Input, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import { View } from "react-native"

import { connect } from "react-redux"
import MD5 from 'blueimp-md5';
import FormView from '@/components/Form';

const Login = (props) => {
  const { dispatch } = props
  const [form] = Form.useForm();
  const navigation = useNavigation();

  const handleFinish = (values) => {

    const { tenantName = "江西建设", loginName = "小二", password = "123456" } = values;
    dispatch({
      type: 'account/login',
      payload: {
        tenantName: tenantName.trim(),
        loginName: loginName.trim(),
        password: MD5(password).toString(),
        originalPassword: password,
        from: 'pc',
      },
      async callback() {
        await AsyncStorage.setItem('logininfo', JSON.stringify({
          tenantName: tenantName.trim(),
          loginName: loginName.trim(),
          password
        }))
        // 获取用户数据
        dispatch({
          type: 'account/userRemote',
        });
        dispatch({
          type: 'global/fetchGlobalConstant',
        });
        dispatch({
          type: 'menu/getMenuData',
          callback(data) {
            navigation.navigate("WorkScreen");
          }
        });
      }
    });
  };

  useEffect(() => {
    // AsyncStorage.getItem('logininfo').then(user => console.log(JSON.parse(user)));
  }, [])

  function login() {
    // form.validateFields().then(values => {
    handleFinish({})
    // });
  }

  return (
    <View>
      <Form
        // initialValues={{ tenantName: "江西建设", loginName: "小二", password: "123456" }}
        component={FormView}
        form={form}
      >
        <Field
          name="tenantName"
          trigger="onChangeText"
          // getValueFromEvent={({ nativeEvent }) => nativeEvent.text}
          rules={[{ required: true, message: '请输入组织名' }]}
        >
          <Input placeholder="组织名" returnKeyType="next" />
        </Field>
        <Field
          name="loginName"
          trigger="onChangeText"
          // getValueFromEvent={({ nativeEvent }) => nativeEvent.text}
          rules={[{ required: true, message: '登录名' }]}
        >
          <Input placeholder="登录名" returnKeyType="next" />
        </Field>
        <Field
          name="password"
          trigger="onChangeText"
          // getValueFromEvent={({ nativeEvent }) => nativeEvent.text}
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input placeholder="密码" textContentType="password" secureTextEntry returnKeyType="done" />
        </Field>
        <Button title="登录" onPress={login} />
      </Form>
    </View>
  );
};
export default connect()(Login)