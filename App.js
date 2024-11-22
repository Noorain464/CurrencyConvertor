import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Picker } from '@react-native-picker/picker'; 

const App = () => {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [currencies, setCurrencies] = useState([]);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const API_KEY = " aa17a71f58471d83cdf54fb1"
  const convertCurrency = useCallback(() => {
    if (!amount) {
      setConvertedAmount(null);
      return;
    }
    fetch(`https://api.exchangerate-api.com/v4/${API_KEY}/latest/${fromCurrency}`)
      .then((response) => response.json())
      .then((data) => {
        const exchangeRates = data.rates;
        const conversionRate = exchangeRates[toCurrency];

        if (conversionRate) {
          const result = parseFloat(amount) * conversionRate;
          setConvertedAmount(result.toFixed(2));
        } else {
          setConvertedAmount("Invalid Currency");
        }
      })
      .catch((error) => {
        console.error("Error converting currency: ", error);
      });
  }, [amount, fromCurrency, toCurrency]);

  useEffect(() => {
    fetch(`https://api.exchangerate-api.com/v4/latest/USD`)
      .then((response) => response.json())
      .then((data) => {
        const currencyList = Object.keys(data.rates);
        setCurrencies(currencyList);
      })
      .catch((error) => {
        console.error("Error fetching currency data: ", error);
      });
  }, []);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Currency Converter</Text>
      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Amount:</Text>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={(text) => setAmount(text)}
            keyboardType="numeric"
            placeholder="Enter amount"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>From Currency:</Text>
          <Picker
            selectedValue={fromCurrency}
            onValueChange={(itemValue) => setFromCurrency(itemValue)}
            style={styles.dropdown}
          >
            {currencies.map((currency) => (
              <Picker.Item key={currency} label={currency} value={currency} />
            ))}
          </Picker>
        </View>

        <TouchableOpacity style={styles.swapButton} onPress={swapCurrencies}>
          <Text style={styles.swapButtonText}>Swap</Text>
        </TouchableOpacity>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>To Currency:</Text>
          <Picker
            selectedValue={toCurrency}
            onValueChange={(itemValue) => setToCurrency(itemValue)}
            style={styles.dropdown}
          >
            {currencies.map((currency) => (
              <Picker.Item key={currency} label={currency} value={currency} />
            ))}
          </Picker>
        </View>

        <TouchableOpacity style={styles.convertButton} onPress={convertCurrency}>
          <Text style={styles.convertButtonText}>Convert</Text>
        </TouchableOpacity>

        {convertedAmount !== null && (
          <Text style={styles.result}>
            {amount} {fromCurrency} is {convertedAmount} {toCurrency}
          </Text>
        )}
      </View>
    </View>
  );
};

export default App;

// Example of styles (for demonstration purposes)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  formContainer: {
    width: "100%",
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    padding: 10,
    fontSize: 16,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
  },
  dropdown: {
    width: "100%",
    padding: 10,
    fontSize: 16,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
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
    fontSize: 10,
    color: "#007BFF",
  },
  convertButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  convertButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  result: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
});
