import { StatusBar, View } from "react-native";
import CustomText from "../components/CustomText";
import { useCheckUserLoggedIn } from "../hooks/useAuth";

export default function Index() {
  const { isLoading } = useCheckUserLoggedIn();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StatusBar barStyle="dark-content" />
      <CustomText>
        {isLoading ? "Loading..." : "Checking authentication..."}
      </CustomText>
    </View>
  );
}
