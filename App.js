import React, { useState, useEffect } from "react";
import { View, TextInput, Text, Button, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const App = () => {
  const [amount, setAmount] = useState("");
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("EUR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [exchangeRates, setExchangeRates] = useState({});

  const API_KEY = "aa17a71f58471d83cdf54fb1"; 

  const fetchExchangeRates = async () => {
    try {
      const response = await axios.get(
        `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${baseCurrency}`
      );
      setExchangeRates(response.data.conversion_rates);
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
    }
  };

  const calculateConversion = () => {
    if (exchangeRates[targetCurrency] && amount) {
      setConvertedAmount(
        (parseFloat(amount) * exchangeRates[targetCurrency]).toFixed(2)
      );
    }
  };

  const swapCurrencies = () => {
    const temp = baseCurrency;
    setBaseCurrency(targetCurrency);
    setTargetCurrency(temp);
    setConvertedAmount(null);
  };

  const saveSettings = async () => {
    try {
      await AsyncStorage.setItem(
        "currencySettings",
        JSON.stringify({ amount, baseCurrency, targetCurrency })
      );
    } catch (error) {
      console.error("Error saving settings:", error);
    }
  };

  const loadSettings = async () => {
    try {
      const savedSettings = await AsyncStorage.getItem("currencySettings");
      if (savedSettings) {
        const { amount, baseCurrency, targetCurrency } = JSON.parse(
          savedSettings
        );
        setAmount(amount);
        setBaseCurrency(baseCurrency);
        setTargetCurrency(targetCurrency);
      }
    } catch (error) {
      console.error("Error loading settings:", error);
    }
  };

  useEffect(() => {
    fetchExchangeRates();
  }, [baseCurrency]);

  useEffect(() => {
    loadSettings();
  }, []);

  useEffect(() => {
    saveSettings();
  }, [amount, baseCurrency, targetCurrency]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <Picker
        selectedValue={baseCurrency}
        onValueChange={(itemValue) => setBaseCurrency(itemValue)}
        style={styles.picker}
      >
        {Object.keys(exchangeRates).map((currency) => (
          <Picker.Item key={currency} label={currency} value={currency} />
        ))}
      </Picker>
      <Picker
        selectedValue={targetCurrency}
        onValueChange={(itemValue) => setTargetCurrency(itemValue)}
        style={styles.picker}
      >
        {Object.keys(exchangeRates).map((currency) => (
          <Picker.Item key={currency} label={currency} value={currency} />
        ))}
      </Picker>
      <Button title="Convert" onPress={calculateConversion} />
      {convertedAmount && (
        <Text style={styles.result}>
          {amount} {baseCurrency} = {convertedAmount} {targetCurrency}
        </Text>
      )}
      <Button title="Swap Currencies" onPress={swapCurrencies} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  picker: {
    height: 50,
    marginBottom: 20,
  },
  result: {
    fontSize: 18,
    marginVertical: 20,
    fontWeight: "bold",
  },
});

export default App;
