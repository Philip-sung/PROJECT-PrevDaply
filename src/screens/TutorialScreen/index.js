import React from 'react';
import { Colors, View, Text } from 'react-native-ui-lib';
import { TouchableWithoutFeedback } from 'react-native';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper';

const slides = [
  {
    key: 'one',
    image: require('../../assets/images/onBoarding1.jpeg'),
    isLast: false,
  },
  {
    key: 'two',
    image: require('../../assets/images/onBoarding2.jpeg'),
    isLast: false,
  },
  {
    key: 'three',
    image: require('../../assets/images/onBoarding3.jpeg'),
    isLast: false,
  },
  {
    key: 'four',
    image: require('../../assets/images/onBoarding4.jpeg'),
    isLast: false,
  },
  {
    key: 'five',
    image: require('../../assets/images/onBoarding5.jpeg'),
    isLast: true,
  },
];

const TutorialScreen = ({ navigation }) => {
  const { navigate } = navigation;

  const handleDone = () => {
    navigate('SignUp');
  };

  return (
    <Swiper
      activeDotColor={Colors.point}
      removeClippedSubviews={false}
      loop={false}
      // paginationStyle={{ bottom: -25 }}
    >
      {slides.map((y) => (
        <View
          style={{ position: 'relative' }}
          flex
          key={`reviewImage-${y.key}`}
        >
          <FastImage source={y.image} style={{ flex: 1 }}></FastImage>
          {y.isLast && (
            <TouchableWithoutFeedback onPress={handleDone}>
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                width={100}
                height={100}
              >
                <Text secondary>시작하기</Text>
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>
      ))}
    </Swiper>
  );
};

export default TutorialScreen;
