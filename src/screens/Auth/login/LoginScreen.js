import React, { useState } from 'react';
import { Alert, Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../../../utility/colors';
import { getData, saveData } from '../../../utility/storage';
import { useNavigation } from '@react-navigation/native';
const LoginScreen = () => {
    const navigation = useNavigation()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const handleSaveDetails = () => {
        if (email === "user@yopmail.com" && password === "Test@123") {
            Alert.alert("", "Logged In Successfully!!",
                [{
                    text: "next",
                    onPress: () => {
                        navigation.navigate("userProfileScreen"),
                            clearData()
                    }

                }]
            )
        }
        else {
            Alert.alert("Oops!", "Check Details Again!!")
        }

    }
    const clearData = () => {
        setEmail("")
        setPassword("")
    }
    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.bodyContainer}>
                <Text style={styles.lableStyle}>
                    Email:
                </Text>
                <TextInput
                    style={styles.inputStyle}
                    placeholder='Enter Your Email (user@yopmail.com)'
                    value={email}
                    onChangeText={(text) => {
                        setEmail(text)
                    }}
                    keyboardType='email-address'
                />

                <Text style={styles.lableStyle}>
                    Password:
                </Text>
                <TextInput
                    style={styles.inputStyle}
                    placeholder='Enter Your password (Test@123)'
                    value={password}
                    onChangeText={(text) => {
                        setPassword(text)
                    }}
                    keyboardType='default'
                    secureTextEntry={true}
                />
                <Button title='Login'
                    onPress={() => {
                        handleSaveDetails()
                    }} />
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create(
    {
        mainContainer: {
            flex: 1,
            backgroundColor: colors.white,
        },
        inputStyle: {
            borderWidth: 1,
            borderColor: '#bfbfbf',
            padding: 8,
            borderRadius: 6,
            marginBottom: 16,
            fontSize: 16,
            color: colors.black
        },
        bodyContainer: {
            marginHorizontal: 12,
            marginTop: 16
        },
        lableStyle: {
            fontSize: 13,
            color: colors.black,
            marginBottom: 8
        },
        titleStyle: {
            fontSize: 18,
            color: colors.black,
            marginBottom: 8
        }
    }
)
export default LoginScreen;