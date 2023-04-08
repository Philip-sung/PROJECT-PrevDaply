import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Text, View, Button, Incubator } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import { List } from 'immutable';
import FastImage from 'react-native-fast-image';
import { MainWrapper } from '../../../styles/main';
import feelingConfig from './constants';
import { FeelingItem } from './styles';
import checkCircleIcon from '../../../assets/icons/basic-circle-check-outline.png';
import checkedCircleIcon from '../../../assets/icons/basic-circle-check.png';
import { dateActions } from '../../../redux/date';
import { hp, paddingHorizontal, Touchable } from '../../../styles';
import { ListHeader } from '..';
import { UploadLoader } from '../../../components/Loader';

const { TextField } = Incubator;

const FeelingScreen = ({ navigation, route }) => {
  const { navigate } = navigation;
  const { params } = route;
  const { step } = params;
  const dateState = useSelector((state) => state.date);
  const { postingDate, postLoading } = dateState;
  const { feeling } = postingDate;
  const dispatch = useDispatch();
  const [activeFeeling, setActiveFeeling] = useState(feeling);

  const selectFeeling = (item) => {
    setActiveFeeling(item);
    dispatch(dateActions.setPostingDate({ feeling: item }));
  };

  const onPressComplete = () => {
    dispatch(dateActions.postDate());
  };

  return (
    <View flex-1 style={{ paddingBottom: hp('3%') }}>
      <ScrollView contentContainerStyle={{ paddingHorizontal }}>
        <ListHeader
          title={`Step 0${step + 3}`}
          subTitle="어떤 기분이 들 때 가기 좋나요?"
        ></ListHeader>
        {postLoading ? (
          <UploadLoader wrapperHeight={50}></UploadLoader>
        ) : (
          <>
            <View centerH row style={{ flexWrap: 'wrap' }}>
              {feelingConfig.map((x, i) => (
                <Touchable key={x.id} onPress={() => selectFeeling(x)}>
                  <FeelingItem
                    style={{ marginRight: (i + 1) % 3 === 0 ? 0 : 20 }}
                  >
                    <FastImage
                      source={x.path}
                      style={{ width: 40, height: 40 }}
                    ></FastImage>
                    <FastImage
                      style={{ width: 25, height: 25, marginTop: 5 }}
                      source={
                        x.id === activeFeeling.id
                          ? checkedCircleIcon
                          : checkCircleIcon
                      }
                    ></FastImage>

                    <Text grey20 text80L marginT-3>
                      {x.text}
                    </Text>
                  </FeelingItem>
                </Touchable>
              ))}
            </View>
          </>
        )}
      </ScrollView>
      <View style={{ paddingHorizontal }}>
        <Button
          label={postLoading ? '로딩중...' : '업로드'}
          disabled={activeFeeling.id === null || postLoading}
          onPress={onPressComplete}
        ></Button>
      </View>
    </View>
  );
};

export default FeelingScreen;
