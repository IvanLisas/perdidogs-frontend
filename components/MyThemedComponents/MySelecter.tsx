import React from 'react'
import { StyleSheet, View } from 'react-native'
import { CheckIcon, Select } from 'native-base'
import useTheme from '../../hooks/useTheme'

interface MySelecterProps {
  value: any | undefined
  values: any[]
  setValue: (value: any) => void
  label: string
}

const MySelecter: React.FC<MySelecterProps> = (props) => {
  const { value, values, setValue, label } = props

  const theme = useTheme()

  return (
    <Select
      selectedValue={value}
      marginBottom={4}
      borderRadius={12}
      placeholder={label}
      borderWidth={1}
      borderColor={theme.primary}
      placeholderTextColor="grey"
      style={styles.input}
      _item={{
        backgroundColor: theme.background,
        borderBottomWidth: 0.1
      }}
      bg={theme.background}
      _actionSheetContent={{ borderTopRadius: 25, backgroundColor: theme.background }}
      onValueChange={(itemValue) => setValue(itemValue)}
      _selectedItem={{
        bg: theme.primary,

        _stack: { backgroundColor: theme.primary },
        endIcon: <CheckIcon size={4} />
      }}
    >
      {values?.map((param: any, index: number) => (
        <Select.Item style={{}} key={index + 'selected'} _text={{ fontSize: 20 }} label={param.description} value={param.Id} />
      ))}
    </Select>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,

    padding: 16
  },
  title: {
    fontSize: 20,
    fontFamily: 'LoveMeLikeASister',
    paddingBottom: 16
  },
  input: {
    padding: 16
  }
})

export default MySelecter
