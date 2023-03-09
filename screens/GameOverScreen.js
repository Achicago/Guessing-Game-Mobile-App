import { Image, Text, View } from "react-native";
import Title from "../components/ui/Title";

function GameOverScreen() {
    return <View>
        <Title>Game Over</Title>
        <Image source={require('../assets/images/success.png')} />
    </View>
}

export default GameOverScreen;