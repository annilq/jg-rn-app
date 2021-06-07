import { StyleSheet } from 'react-native';
import { exp } from 'react-native-reanimated';
const styles = StyleSheet.create({
  baseForm: {
    display: "flex",
    flexDirection: "column",
    paddingBottom: "60",
    position: "relative",
    backgroundColor: "#f5f5f5",
  },
  containers: {
    display: "flex",
    flexWrap: "wrap",
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  formDetailContainer: {
    color: "#000",
    padding: "20 30 0"
  },
  formInfoItem: {
    padding: 5,
    marginTop:10,
    marginBottom:10,
    display: "flex",
    flexDirection:"row",
  },
  formInfoLabel: {
    width: 90,
    marginRight: 5,
    color: "#9e9e9e",
  },
  formInfoValue:{
    flex: 1,
  }
});
export default styles