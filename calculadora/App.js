import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";

export default function App() {
  const buttons = [
    "AC",
    "DEL",
    "%",
    "/",
    "7",
    "8",
    "9",
    "*",
    "4",
    "5",
    "6",
    "-",
    "3",
    "2",
    "1",
    "+",
    "0",
    ".",
    "+/-",
    "=",
  ];

  const buttonSize = Dimensions.get("window").width / 4 - 20; // Calcula o tamanho dos botões com base na largura da tela.

  const [currentNumber, setCurrentNumber] = useState("");
  const [lastNumber, setLastNumber] = useState("");
  const [operator, setOperator] = useState("");

  const handleInput = (buttonPressed) => {
    if (["*", "/", "+", "-"].includes(buttonPressed)) {
      setOperator(buttonPressed);
      setLastNumber(currentNumber);
      setCurrentNumber("");
    } else if (buttonPressed === "AC") {
      setCurrentNumber("");
      setLastNumber("");
      setOperator("");
    } else if (buttonPressed === "DEL") {
      setCurrentNumber(currentNumber.slice(0, -1));
    } else if (buttonPressed === "=") {
      const num1 = parseFloat(lastNumber);
      const num2 = parseFloat(currentNumber);
      switch (operator) {
        case "+":
          setCurrentNumber((num1 + num2).toString());
          break;
        case "-":
          setCurrentNumber((num1 - num2).toString());
          break;
        case "*":
          setCurrentNumber((num1 * num2).toString());
          break;
        case "/":
          setCurrentNumber((num1 / num2).toString());
          break;
        default:
          break;
      }
      setOperator("");
      setLastNumber("");
    } else {
      setCurrentNumber(currentNumber + buttonPressed);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.result}>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>
      <View style={styles.buttons}>
        {buttons.map((button) => (
          <TouchableOpacity
            key={button}
            style={[
              styles.button,
              { width: buttonSize, height: buttonSize, borderRadius: buttonSize / 2 },
            ]}
            onPress={() => handleInput(button)}
          >
            <Text style={styles.buttonText}>{button}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#252525",
  },
  result: {
    flex: 2,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    backgroundColor: "#252525",
  },
  resultText: {
    fontSize: 30,
    margin: 10,
    color: "#EBE3D5",
  },
  buttons: {
    flex: 3,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#252525",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5E5E5E",
    margin: 10,
  },
  buttonText: {
    color: "#EBE3D5",
    fontSize: 30,
  },
});
