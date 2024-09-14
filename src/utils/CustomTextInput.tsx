import { StyleSheet, Text, View , TextInput, TextInputProps} from 'react-native'
import React from 'react'
import { heightDim } from './Helper'

interface customTextInputProps extends TextInputProps{

}
const CustomTextInput:React.FC<customTextInputProps> = (props) => {
  return (
   <View style={{borderColor: 'blue', }}>
            <TextInput
            placeholderTextColor={props.placeholderTextColor}
            placeholder={props.placeholder}
            value={props.value}
            onChangeText={props.onChangeText}
            cursorColor={props.cursorColor}

            style={{
                color: 'black',
                borderColor: '1F41BB',
                borderWidth: 2,
                borderRadius: 10,
                width: '100%',
                height: heightDim / 15,
                paddingHorizontal: 10,
                marginVertical: 10,
            }}></TextInput>
   </View>
  )
}

export default CustomTextInput

const styles = StyleSheet.create({})