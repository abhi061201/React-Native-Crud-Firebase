import { TouchableOpacity, View } from "react-native"
// import FontAwesome from 'react-native-vector-icons/FontAwesome';

export interface CustomButtonProps {
    buttonName: string;
    callback: () => void;
}
export const CustomButton: React.FC<CustomButtonProps> = ({ buttonName, callback }) => {
    return (
        <TouchableOpacity onPress={callback}>
            <View style={{
                width: 60,
                height: 40,
                backgroundColor: "#ECECEC",
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 8,
                marginVertical: 5
            }}>
                {/* <FontAwesome name={buttonName} color='#000000' size={22}></FontAwesome> */}
            </View>
        </TouchableOpacity>
    )
}