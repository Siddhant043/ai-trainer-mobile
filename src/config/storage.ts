import { MMKV } from "react-native-mmkv";
const storage = new MMKV({
  id: "ai-trainer-store",
  readOnly: false,
});

export default storage;
