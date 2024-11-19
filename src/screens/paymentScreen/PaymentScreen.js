import React, { useState } from 'react';
import { Alert, Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../../utility/colors';
import { getData, saveData } from '../../utility/storage';
const PaymentScreen = () => {
    const [cardNum, setCardNum] = useState("");
    const [cardExp, setCardExp] = useState("");
    const [cardCvv, setCardCvv] = useState("");
    const [isShowDetails, setisShowDetails] = useState(false);
    const checkExpDate = () => {
        const [month, year] = cardExp?.split('/').map(Number)
        const current = new Date();
        const newDate = new Date(`20${year}`, month - 1)
        return newDate >= current
    }
    const checkValidations = () => {
        var validnumber = false;
        var validExp = false;
        var validCvv = false;
        if (cardNum?.length >= 13 || cardNum?.length <= 19) {
            validnumber = true;
        }
        if (checkExpDate()) {
            validExp = true
        }
        if (cardCvv?.length == 3 || cardCvv?.length == 4) {
            validCvv = true;
        }
        return validnumber && validCvv && validExp
    }
    const handleSaveDetails = async () => {
        console.log("data", cardNum, cardExp, cardCvv)
        if (cardNum && cardExp && cardCvv) {
            const validated = checkValidations()
            if (validated) {
                const response = await saveData(
                    "cardData", {
                    cardNum, cardExp, cardCvv
                }
                )
                if (response) {
                    Alert.alert("Success", "Data Saved Successfully!!!", [
                        {
                            text: "Done",
                            onPress: () => { }
                        }
                    ])
                }
            }
            else {
                Alert.alert("Oops!", "Check Details Again!!!")
            }
        }
        else {
            Alert.alert("Oops!", "Fill All Given Details")
        }
    }
    const handleshowCardData = async () => {
        const cardData = await getData("cardData")
        if (cardData) {
            setisShowDetails(true)
            setCardNum(cardData.cardNum);
            setCardExp(cardData.cardExp)
            setCardCvv(cardData.cardCvv)
        }
    }
    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.bodyContainer}>
                <Text style={styles.lableStyle}>
                    Card number:
                </Text>
                <TextInput
                    style={styles.inputStyle}
                    placeholder='Enter Your Card Number'
                    value={cardNum}
                    onChangeText={(text) => {
                        setCardNum(text)
                    }}
                    keyboardType='numeric'
                />
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <View style={{ flex: 0.6 }}>
                        <Text style={styles.lableStyle}>
                            Expiry Date:
                        </Text>
                        <TextInput
                            style={styles.inputStyle}
                            placeholder='Enter Expiry Date (MM/YYYY)'
                            value={cardExp}
                            onChangeText={(text) => {
                                setCardExp(text)
                            }}
                            keyboardType='numeric'
                        />
                    </View>
                    <View style={{ flex: 0.3 }}>
                        <Text style={styles.lableStyle}>
                            CVV:
                        </Text>
                        <TextInput
                            style={styles.inputStyle}
                            placeholder='Enter CVV'
                            value={cardCvv}
                            onChangeText={(text) => {
                                setCardCvv(text)
                            }}
                            keyboardType='numeric'
                            secureTextEntry={true}
                        />

                    </View>
                </View>
                <View style={{ marginBottom: 12 }}>
                    <Button title='Save Details'
                        onPress={() => {
                            handleSaveDetails()
                        }} />
                </View>

                <Button title='View Card Details'
                    onPress={() => {
                        handleshowCardData()
                    }} />
                {
                    isShowDetails && (
                        <View>
                            <Text style={styles.titleStyle}>
                                {" Card Number:" + cardNum}
                            </Text>
                            <Text style={styles.titleStyle}>
                                {" Card Exp:" + cardExp}
                            </Text>
                            <Text style={styles.titleStyle}>
                                {" CVV:" + cardCvv}
                            </Text>
                        </View>
                    )
                }
            </View></SafeAreaView>
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
export default PaymentScreen;