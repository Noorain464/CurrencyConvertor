
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
container: {
	flex: 1,
	justifyContent: "center",
	alignItems: "center",
	backgroundColor: "#f5f5f5"
},
subcontainer: {
	shadowColor: "rgba(0, 0, 0, 0.2)",
	shadowOffset: {
	width: 0,
	height: 6
	},
	shadowOpacity: 1,
	shadowRadius: 15,
	elevation: 5,
	padding: 40,
	borderRadius: 20,
	backgroundColor: "#ffffff"
},
header: {
	fontSize: 28,
	fontWeight: "bold",
	marginBottom: 20,
	color: "green"
},
inputContainer: {
	flexDirection: "row",
	alignItems: "center",
	marginVertical: 10
},
label: {
	fontSize: 19,
	marginRight: 10,
	color: "#333",
	fontFamily: "Pacifico"
},
input: {
	flex: 1,
	borderWidth: 1,
	borderColor: "#ccc",
	borderRadius: 10,
	paddingHorizontal: 10,
	height: 40,
	color: "#333"
},
dropdown: {
	width: 150,
	height: 40,
	borderWidth: 1,
	borderColor: "#ccc",
	borderRadius: 4,
	paddingHorizontal: 10,
	justifyContent: "center",
	color: "#333"
},
convertButton: {
	backgroundColor: "#007BFF",
	borderRadius: 4,
	paddingVertical: 12,
	paddingHorizontal: 24,
	marginTop: 20,
	shadowColor: "rgba(0, 123, 255, 0.5)",
	shadowOffset: {
	width: 0,
	height: 3
	},
	shadowOpacity: 1,
	shadowRadius: 15,
	elevation: 3
},
convertButtonText: {
	color: "white",
	fontSize: 18,
	fontWeight: "bold",
	textAlign: "center"
},
result: {
	marginTop: 20,
	fontSize: 18,
	color: "#333"
},
swapButton: {
	backgroundColor: "#ddd",
	borderRadius: 50,
	width: 45,
	height: 40,
	justifyContent: "center",
	alignItems: "center",
	marginBottom: 10
},
swapButtonText: {
	fontSize: 30,
	textAlign: "center",
	color: "red",
	marginBottom: 10
}
});

export { styles };