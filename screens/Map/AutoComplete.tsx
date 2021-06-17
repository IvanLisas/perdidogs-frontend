import React from 'react'
import { ScrollView, TextInput } from 'react-native'
import { GoogleAutoComplete } from 'react-native-google-autocomplete'

function MyComponent() {
  return (
    <GoogleAutoComplete apiKey="AIzaSyCahzx0wpr4G7jiI_LfsAUf0JWJ3-FZVDs" debounce={300}>
      {({ inputValue, handleTextChange, locationResults, fetchDetails }) => (
        <React.Fragment>
          <TextInput
            style={{
              height: 40,
              width: 300,
              borderWidth: 1,
              paddingHorizontal: 16
            }}
            value={inputValue}
            onChangeText={handleTextChange}
            placeholder="Location..."
          />
          <ScrollView style={{ maxHeight: 100 }}>{locationResults.map((el, i) => console.log(el))}</ScrollView>
        </React.Fragment>
      )}
    </GoogleAutoComplete>
  )
}
