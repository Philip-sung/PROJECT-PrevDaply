import React from 'react';
import { Text } from 'react-native-ui-lib';
import {
  parseValue,
  isMentionPartType,
} from 'react-native-controlled-mentions';
import * as RootNavigation from '../../routes/navigation';

/**
 * Part renderer
 *
 * @param part
 * @param index
 */
const renderPart = (part, index) => {
  // Just plain text
  if (!part.partType) {
    return (
      <Text text90R key={index}>
        {part.text}
      </Text>
    );
  }

  // Mention type part
  if (isMentionPartType(part.partType)) {
    return (
      <Text
        text90R
        key={`${index}-${part.data?.trigger}`}
        style={part.partType.textStyle}
        onPress={() =>
          RootNavigation.navigate('User', {
            userId: part.data.id,
            nickname: part.data.name,
          })
        }
      >
        {part.text}
      </Text>
    );
  }

  // Other styled part types
  return (
    <Text text90R key={`${index}-pattern`} style={part.partType.textStyle}>
      {part.text}
    </Text>
  );
};

/**
 * Value renderer. Parsing value to parts array and then mapping the array using 'renderPart'
 *
 * @param value - value from MentionInput
 * @param partTypes - the part types array that you providing to MentionInput
 */
export const renderValue = (value, partTypes) => {
  const { parts } = parseValue(value, partTypes);
  return <Text>{parts.map(renderPart)}</Text>;
};
