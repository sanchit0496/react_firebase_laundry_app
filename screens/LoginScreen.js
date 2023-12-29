import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  ActivityIndicator,
  ImageBackground
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 
  const navigation = useNavigation();

  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        setLoading(false);
      }
      if (authUser) {
        navigation.replace("Home");
      }
    });

    return unsubscribe;
  }, []);

  const login = () => {
    setLoading(true);
    setError(null); // Reset error state before login attempt
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("userCredential", userCredential);
      })
      .catch((error) => {
        setError("Incorrect Credentials"); // Set error message
        console.log("error", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const image = require('../assets/login.png');

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>

        {loading ? (
          <View style={{ alignItems: "center", justifyContent: "center", flexDirection: "row", flex: 1 }}>
            <ActivityIndicator size="large" color={"white"} />
          </View>
        ) : (
          <KeyboardAvoidingView style = {{backgroundColor: "white", margin: 10, borderRadius: 15, paddingBottom: 20, opacity: 0.8}}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <Text style={{ fontSize: 20, color: "#003F5C", fontWeight: "bold", marginBottom: 40 }}>
              Sign In to Get Organized
              </Text>
            </View>

            <View style={{ paddingLeft: 10, paddingRight: 10}}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcons name="email-outline" size={24} color="black" />
                <TextInput
                  placeholder="Email"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  placeholderTextColor="black"
                  style={{
                    fontSize: email ? 18 : 18,
                    borderBottomWidth: 1,
                    borderBottomColor: "gray",
                    marginLeft: 13,
                    width: 300,
                    marginVertical: 10,
                  }}
                />
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="key-outline" size={24} color="black" />
                <TextInput
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry={true}
                  placeholder="Password"
                  placeholderTextColor="black"
                  style={{
                    fontSize: password ? 18 : 18,
                    borderBottomWidth: 1,
                    borderBottomColor: "gray",
                    marginLeft: 13,
                    width: 300,
                    marginVertical: 20,
                  }}
                />
              </View>

              {error && (
                <Text style={{ color: "red", fontSize: 16, textAlign: "center", marginBottom: -20 }}>
                  {error}
                </Text>
              )}

              <Pressable
                onPress={login}
                style={{
                  width: 200,
                  backgroundColor: "#003F5C",
                  padding: 15,
                  borderRadius: 7,
                  marginTop: 50,
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <Text style={{ fontSize: 18, textAlign: "center", color: "white" }}>Login</Text>
              </Pressable>

              <Pressable onPress={() => navigation.navigate("Register")} style={{ marginTop: 20 }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 17,
                    color: "gray",
                    fontWeight: "500",
                  }}
                >
                  Sign Up For New Account
                </Text>
              </Pressable>
            </View>
          </KeyboardAvoidingView>
        )}
      </ImageBackground>

    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});
