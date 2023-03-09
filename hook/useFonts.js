import * as Font from "expo-font";

export default useFonts = async () => {
    await Font.loadAsync({
        "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
    });
};