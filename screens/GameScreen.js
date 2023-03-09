import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, FlatList } from "react-native"
import { Ionicons } from "@expo/vector-icons"

import NumberContainer from "../components/game/NumberContainer";
import Card from "../components/ui/Card";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import Colors from "../constants/colors";
import InstructionText from "../components/ui/InstructionText";
import GuessLogItem from "../components/game/GuessLogItem";

function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}

let minBoundry = 1;
let maxBoundry = 100;

function GameScreen({ userNumber, onGameOver }) {
    const initialGuess = generateRandomBetween(1, 100, userNumber)
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessRounds, setGuessRounds] = useState([initialGuess])

    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver(guessRounds.length);
        }
    }, [currentGuess, userNumber, onGameOver]);

    useEffect(() => {
        minBoundry = 1;
        maxBoundry = 100;
    }, []);

    function nextGuessHandler(direction) { // direction => 'lower' or 'greater'
        if (
            (direction === 'lower' && currentGuess < userNumber)
            ||
            (direction === 'greater' && currentGuess > userNumber)) {

            Alert.alert("Don't lie!",
                "You know that this is wrong...",
                [{ text: 'Sorry!', style: 'cancel' }]
            )
            return;
        }

        if (direction === 'lower') {
            maxBoundry = currentGuess;
        } else {
            minBoundry = currentGuess + 1;
        }
        // console.log(minBoundry, maxBoundry);
        const newRndNumber = generateRandomBetween(minBoundry, maxBoundry, currentGuess);
        setCurrentGuess(newRndNumber);
        setGuessRounds(preGuessRounds => [newRndNumber, ...preGuessRounds]);

    }

    const guessRoundsListLength = guessRounds.length;

    return (
        <View style={styles.screen} >
            <Title>Opponent's Guess</Title>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <InstructionText style={styles.InstructionText}> Higher or Lower</InstructionText>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')} >
                            <Ionicons name="md-remove" size={23} color="white" />
                        </PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')} >
                            <Ionicons name="md-add" size={23} color="white" />
                        </PrimaryButton>
                    </View>

                </View>

            </Card>
            <View style={styles.listContainer}>
                {/* {guessRounds.map((guessRound) => {
                    <Text key={guessRound}> {guessRound} </Text>
                })} */}

                <FlatList data={guessRounds}
                    renderItem={(itemData) =>
                        <GuessLogItem
                            roundNumber={guessRoundsListLength - itemData.index}
                            guess={itemData.item} />
                    }
                    keyExtractor={(item) => item}
                />

            </View>

        </View>
    )
}

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.accent500,
        textAlign: 'center',
        borderWidth: 2,
        borderColor: Colors.accent500,
        padding: 12,
    },
    InstructionText: {
        marginBottom: 12,
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 1,
    },
    listContainer: {
        flex: 1,
        padding: 16,
    },
})
