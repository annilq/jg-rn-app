import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  header: {
    height: 200,
    backgroundColor: "#5095ff",
    flexDirection: "row"
  },
  headerMenuItem: {
    width: "33%",
    alignSelf: "center"
  },
  headerText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    marginTop: 10
  },
  flowGroup: {
    backgroundColor: "#fff",
    fontSize: 28,
  },
  menuTitle: {
    lineHeight: 40,
    fontSize: 18,
    paddingLeft: 10,
  },
  menuGroupItem: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    height: 96,
    borderWidth: 1,
    borderColor: "#eee",
    justifyContent: "center",
  },
  menuIcon: {
    marginBottom: 5
  },
  menuMoreIcon: { position: "absolute", bottom: 0, right: -8 }
});
export default styles