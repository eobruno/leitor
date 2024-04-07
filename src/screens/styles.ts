import { StyleSheet } from "react-native";

export const PRIMARY_COLOR = "#003053";
export const SECONDARY_COLOR = "#003053";
export const TEXT_COLOR = "#333333";
export const BACKGROUND_COLOR = "#ededed"

export const styles = StyleSheet.create({
  BACKGROUND_COLOR: {
    color: BACKGROUND_COLOR,
  },
  PRIMARY_COLOR: {
    color: PRIMARY_COLOR,
  },
  SECONDARY_COLOR: {
    color: PRIMARY_COLOR,
  },
  TEXT_COLOR: {
    color: TEXT_COLOR,
  },
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  options: {
    position: "absolute",
    zIndex: 1,
    top: 100,
    right: 40,
  },
  content: {
    position: "absolute",
    zIndex: 1,
    width: "100%",
    height: 56,
    bottom: 42,
    backgroundColor: "#0000cd90",
    justifyContent: "center",
    alignContent: "center",
  },
  text: {
    color: "#fff",
    fontSize: 10,
  },
  botao: {
    textAlign: "center",
    textAlignVertical: "center",
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#ffffffc0",
    color: "#0000CD",
  },
});
