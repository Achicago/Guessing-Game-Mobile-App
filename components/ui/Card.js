import { View, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

function Card({ children }) {
    return <View style={styles.inputContainer}>
        {children}
    </View>
}

export default Card;

const styles = StyleSheet.create({
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 34,
        borderRadius: 8,
        marginTop: 36,
        padding: 20,
        backgroundColor: Colors.primary800,
        elevation: 20,
        shadowColor: 'black',
        shadowOffset: { width: 10, height: 10 },
        shadowRadius: 6,
        shadowOpacity: 0.25
    },
});
