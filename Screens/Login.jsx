import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
} from "react-native";

import React, { useState } from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebaseConfig";

import { useNavigation } from "@react-navigation/native";

const backgroundImage = require("../assets/images/bg.jpg");

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true);

  const navigation = useNavigation();

  const handleLogin = () => {
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigation.navigate("Home");
        })
        .catch((error) => {
          Alert.alert("Login Failed", "Please check your email and password", [
            {
              text: "Forgot Password",
              onPress: handleForgotPassword, // Pass the function reference, not call it
            },
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
          ]);
        });
    } else {
      Alert.alert("Error", "Please fill in all fields");
    }
  };

  const handleSignUp = () => {
    if (email && password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigation.navigate("Home");
        })
        .catch((error) => {
          Alert.alert(
            "Sign Up Failed",
            "Please try again with a different email",
            [{ text: "Log In Instead", onPress: SwitchMode }, { text: "OK" }],
          );
        });
    } else {
      Alert.alert("Error", "Please fill in all fields");
    }
  };

  const handleForgotPassword = () => {
    Alert.alert(
      "Forgot Password",
      "Please contact support to reset your password",
    );
  };

  const SwitchMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={backgroundImage} style={styles.backgroundImage} />

      <View style={styles.contentContainer}>
        <View style={styles.formBox}>
          <Text style={styles.title}>
            {isLoginMode ? "Welcome Back" : "Create Account"}
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            autoCapitalize="none"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            style={styles.mainButton}
            onPress={isLoginMode ? handleLogin : handleSignUp}
          >
            <Text style={styles.buttonText}>
              {isLoginMode ? "Login" : "Sign Up"}
            </Text>
          </TouchableOpacity>

          <View style={styles.switchModeContainer}>
            <Text>
              {isLoginMode
                ? "Don't have an account? "
                : "Already have an account? "}
            </Text>
            <TouchableOpacity onPress={() => setIsLoginMode(!isLoginMode)}>
              <Text style={styles.switchModeText}>
                {isLoginMode ? "Sign Up" : "Login"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* <TouchableOpacity
            onPress={handleForgotPassword}
            style={styles.forgotPassword}
          >
            <Text>Forgot Password?</Text>
          </TouchableOpacity>*/}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backgroundImage: {
    ...StyleSheet.absoluteFillObject, // Ensures the image fills the screen
    height: "100%",
    width: "100%",
    zIndex: -1, // Places the image behind the content
  },

  contentContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Slightly darker overlay for better text visibility
    padding: 20,
    justifyContent: "center",
  },

  formBox: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  input: {
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
  },

  mainButton: {
    backgroundColor: "#007AFF",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  switchModeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },

  switchModeText: {
    color: "#007AFF",
    fontWeight: "bold",
  },

  forgotPassword: {
    alignItems: "center",
    marginTop: 15,
  },
});
