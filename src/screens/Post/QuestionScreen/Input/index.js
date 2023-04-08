import React from 'react';
import { View, Text, Button, Colors, TextInput } from 'react-native-ui-lib';
import { mainPaddingVertical, paddingHorizontal } from '../../../../styles';

export default function Input({ feature }) {
  const inputValue = {
    value: feature.content,
    placeholder: '입력하기',
    onChangeText: (txt) => {
      const targetFeature = { ...feature, content: txt };
      setFeature(targetFeature);
      updateFeatureListState(targetFeature);
    },
    ref: inputRef,
    onSubmitEditing: (e) => {
      scrollRef?.current.scrollToEnd();
    },
  };

  return (
    <View
      row
      spread
      backgroundColor="white"
      style={{
        maxHeight: 250,
        paddingHorizontal,
        paddingVertical: mainPaddingVertical,
        borderTopWidth: 1,
        borderColor: Colors.grey50,
      }}
    >
      <View flex-3 paddingR-10>
        <Text grey40 text80L>{`ex.) ${feature.question}`}</Text>
        <TextInput {...inputValue} multiline></TextInput>
      </View>
      <View flex-1 centerV>
        {isLast && (
          <Button
            marginB-5
            onPress={addFreeFeature}
            outline
            size="small"
            label="내용추가"
          ></Button>
        )}
        <Button
          onPress={isLast ? navigate2Feeling : navigate2NextFeature}
          disabled={nextInvalid}
          size="small"
          label="다음"
        ></Button>
      </View>
    </View>
  );
}
