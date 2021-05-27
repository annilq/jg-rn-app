# 此项目是使用react-native开发的云建管项目版的app版本
### 从原有react antd 项目迁移
1. 使用dva-core,redux,react-redux来代替umi维护全局状态管理
2. 表单控件使用field-form替换antd form来兼容
3. 使用 react-native-elements UI组件库搭建基础页面
4. react-native-elements 的Icon控件的type设置成antdesign可适配antd(3.x)的Icon组件
5. Text组件中的空格会被识别
6. 可通过包裹TouchableWithoutFeedback来给View添加onPress方法