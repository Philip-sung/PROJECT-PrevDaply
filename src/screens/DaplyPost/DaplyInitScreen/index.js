import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { Text, View, Colors, Button } from 'react-native-ui-lib';
import { useSelector, useDispatch } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FastImage from 'react-native-fast-image';
import SimpleLine from 'react-native-vector-icons/SimpleLineIcons';
import Octicon from 'react-native-vector-icons/Octicons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import { ListHeader } from '..';
import {
  borderRadius,
  colorTheme,
  paddingHorizontal,
  shadowConfig,
} from '../../../styles';
import { DateIndexLabel, MainPhotoItem } from './styles';
import DaplyTitleInput from './DaplyTitleInput';
import { daplyActions } from '../../../redux/daply';
import { renderOrderText } from './utils';
import { DAPLY_TITLE_LENGTH } from '../../../configs';

const DaplyInitScreen = ({ navigation, route }) => {
  const { navigate } = navigation;
  const { params } = route;

  const dispatch = useDispatch();

  const { postingPlayList, postingDaply } = useSelector((state) => state.daply);
  const isPlayListEmpty = postingPlayList.filter((x) => x.date).length === 0;

  const { title } = postingDaply;

  const onPressItem = ({ index }) => {
    navigate('MyDateList', {
      dateIndex: index,
      subTitle: `${renderOrderText(index)} 데이트`,
    });
  };

  const handleDragEnd = ({ data }) => {
    dispatch(daplyActions.setPostingPlayList(data));
  };

  const renderItem = useCallback(
    ({ item, index, drag, isActive }) => (
      <TouchableOpacity
        style={{
          backgroundColor: 'white',
          justifyContent: 'center',
          paddingHorizontal,
          paddingVertical: 10,
          ...(isActive && { ...shadowConfig }),
        }}
        onPress={() => onPressItem({ item, index })}
        onLongPress={drag}
      >
        <View row flex centerV>
          <MainPhotoItem>
            {item.date ? (
              <View width="100%" height="100%">
                <FastImage
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius,
                  }}
                  source={{ uri: item.date.mainImg }}
                  resizeMode={FastImage.resizeMode.cover}
                ></FastImage>
                <DateIndexLabel center>
                  <Text text90L white>
                    {index + 1}
                  </Text>
                </DateIndexLabel>
              </View>
            ) : (
              <>
                {/* <Text grey30>{renderOrderText(index)}</Text> */}
                <AntDesign
                  name="plus"
                  size={20}
                  color={colorTheme.secondary[300]}
                ></AntDesign>
              </>
            )}
          </MainPhotoItem>
          {item.date ? (
            <View centerV row spread flex>
              <View paddingL-15 column centerV>
                <Text grey20 text70BO>
                  {item.date.title}
                </Text>
                <View row>
                  <View centerV row marginR-20>
                    <SimpleLine size={15} name="eye" color={Colors.grey40} />
                    <Text text80L marginL-5 grey20>
                      {item.date._count.dateView}
                    </Text>
                  </View>
                  <View centerV row marginR-20>
                    <SimpleLine size={15} name="heart" color={Colors.grey40} />
                    <Text text80L marginL-5 grey20>
                      {item.date._count.dateLike}
                    </Text>
                  </View>
                  <View centerV row>
                    <Octicon size={15} name="comment" color={Colors.grey40} />
                    <Text text80L marginL-5 grey20>
                      {item.date._count.dateComment}
                    </Text>
                  </View>
                </View>
                <View marginT-5>
                  <Text grey30 text90L>
                    {moment(item.date.createdAt).fromNow()}
                  </Text>
                </View>
              </View>
              <Ionicon
                color={Colors.grey30}
                name="ios-reorder-three-outline"
                size={30}
              ></Ionicon>
            </View>
          ) : (
            <View marginL-15 centerV>
              <Text text70BO grey20>
                {renderOrderText(index)} 데이트를 선택해주세요
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    ),
    [postingPlayList],
  );

  const onPressPostDaply = () => {
    // dispatch(daplyActions.postDaply());
    navigate('DaplyCategory');
  };

  return (
    <View flex-1>
      <DraggableFlatList
        data={postingPlayList}
        onDragEnd={handleDragEnd}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => `draggable-item-${item.key}`}
        renderItem={renderItem}
        ListHeaderComponent={
          <View style={{ paddingHorizontal }}>
            <ListHeader
              title="Step 01"
              subTitle="이번 플레이리스트의 제목은 무엇인가요?"
            ></ListHeader>
            <DaplyTitleInput></DaplyTitleInput>
          </View>
        }
        ListFooterComponentStyle={{
          marginTop: 20,
          paddingHorizontal,
        }}
        ListFooterComponent={
          <View>
            <Button
              onPress={onPressPostDaply}
              disabled={
                isPlayListEmpty ||
                title.length === 0 ||
                title.length > DAPLY_TITLE_LENGTH
              }
              label="다음"
            ></Button>
          </View>
        }
      ></DraggableFlatList>
    </View>
  );
};

export default DaplyInitScreen;
