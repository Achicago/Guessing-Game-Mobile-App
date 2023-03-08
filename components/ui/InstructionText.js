import { Text, StyleSheet } from "react-native";

function instructionText({ children, style }) {
    return <Text style={[styles.instructionText, style]}>{children}</Text>
}

export default instructionText;

const styles = StyleSheet.create({
    instructionText: {
        color: 'white',
        fontSize: 24,
    },
})