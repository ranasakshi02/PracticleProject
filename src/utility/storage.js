import EncryptedStorage from "react-native-encrypted-storage";
import { Alert } from "react-native";
export const saveData = async (key, value) => {
    try {
        await EncryptedStorage.setItem(key, JSON.stringify(value))
        return true;
    }
    catch (error) {
        Alert.alert("Oops!", error);
        return false;
    }

}
export const getData = async (key) => {
    try {
        const value = await EncryptedStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    }
    catch (error) {
        Alert.alert("Oops!", error);
        return null;
    }
}