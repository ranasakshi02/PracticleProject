import React, { useState } from 'react';
import { Alert, Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../../utility/colors';
import { getData, saveData } from '../../utility/storage';
import { useNavigation } from '@react-navigation/native';
const UserProfileScreen = () => {
    const navigation = useNavigation()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [isShowDetails, setisShowDetails] = useState(false);
    const handleSaveDetails = async () => {
        if (name && email && password) {
            const response = await saveData(
                "profileData", {
                name, email, password
            }
            )
            if (response) {
                Alert.alert("Success", "Data Saved Successfully!!!", [
                    {
                        text: "Done",
                        onPress: () => { navigation.navigate("paymentScreen"), clearData() }
                    }
                ])
            }
        }
        else {
            Alert.alert("Oops!", "Fill All Given Details")
        }
        console.log("Data", name, email, password)

    }
    const handleshowProfileData = async () => {
        const profileData = await getData("profileData")
        if (profileData) {
            setisShowDetails(true)
            setName(profileData.name);
            setEmail(profileData.email)
            setPassword(profileData.password)
        }
    }
    const clearData = () => {
        setName("")
        setEmail("")
        setPassword("")
        setisShowDetails(false)
    }
    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.bodyContainer}>
                <Text style={styles.lableStyle}>
                    Name:
                </Text>
                <TextInput
                    style={styles.inputStyle}
                    placeholder='Enter Your Name'
                    value={name}
                    onChangeText={(text) => {
                        setName(text)
                    }}
                    keyboardType='default'
                />

                <Text style={styles.lableStyle}>
                    Email:
                </Text>
                <TextInput
                    style={styles.inputStyle}
                    placeholder='Enter Your Email'
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
                    placeholder='Enter Your password'
                    value={password}
                    onChangeText={(text) => {
                        setPassword(text)
                    }}
                    keyboardType='default'
                    secureTextEntry={true}
                />
                <View style={{ marginBottom: 12 }}>
                    <Button title='Save Details'
                        onPress={() => {
                            handleSaveDetails()
                        }} />
                </View>
                <Button title='View Profile Details'
                    onPress={() => {
                        handleshowProfileData()
                    }} />
                {
                    isShowDetails && (
                        <View>
                            <Text style={styles.titleStyle}>
                                {"Name:" + name}
                            </Text>
                            <Text style={styles.titleStyle}>
                                {"Email:" + email}
                            </Text>
                            <Text style={styles.titleStyle}>
                                {"Password:" + password}
                            </Text>
                        </View>
                    )
                }
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
export default UserProfileScreen;