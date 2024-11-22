import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Picker } from '@react-native-picker/picker';
import axios from "axios";

const App = () => {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [currencies, setCurrencies] = useState([]);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [exchangeRates, setExchangeRates] = useState({});
  const API_KEY = "aa17a71f58471d83cdf54fb1"; 

  const fetchExchangeRates = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency}`
      );
      setExchangeRates(response.data.conversion_rates);
      const currencyList = Object.keys(response.data.conversion_rates);
      setCurrencies(currencyList);
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
    }
  }, [fromCurrency]);
  const convertCurrency = () => {
    if (!amount || isNaN(amount)) {
      setConvertedAmount("Please enter a valid number");
      return;
    }
    if (exchangeRates[toCurrency]) {
      const result = parseFloat(amount) * exchangeRates[toCurrency];
      setConvertedAmount(result.toFixed(2));
    } else {
      setConvertedAmount("Error: Invalid conversion rate");
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  useEffect(() => {
    fetchExchangeRates();
  }, [fromCurrency, fetchExchangeRates]);

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
            {currencies.length === 0 ? (
              <Picker.Item label="Loading..." value="" />
            ) : (
              currencies.map((currency) => (
                <Picker.Item key={currency} label={currency} value={currency} />
              ))
            )}
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
            {currencies.length === 0 ? (
              <Picker.Item label="Loading..." value="" />
            ) : (
              currencies.map((currency) => (
                <Picker.Item key={currency} label={currency} value={currency} />
              ))
            )}
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
    marginBottom: 10,
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
