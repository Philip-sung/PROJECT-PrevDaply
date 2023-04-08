import React, { useEffect, useState } from 'react';
import { Text, View, Colors, Button } from 'react-native-ui-lib';
import { useSelector, useDispatch } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { DotIndicator } from 'react-native-indicators';
import { initImageLibrary } from '../../utils/image';

import { mainPaddingVertical, paddingHorizontal, wp } from '../../styles';
import { authActions } from '../../redux/auth';

const profileWidth = wp('20%');

const ProfileEditScreen = ({ navigation, route }) => {
  const { navigate } = navigation;
  const { params } = route;
  const dispatch = useDispatch();
  const { user, profileLoading } = useSelector((state) => state.auth);
  const [_profileImg, setProfileImg] = useState(user.profileImg);

  useEffect(() => {
    if (!params) return;
    const { targetImageList } = params;
    const [newProfileImg] = targetImageList;
    const imagePath = newProfileImg.cropped
      ? newProfileImg.cropped.path
      : newProfileImg.uri;
    setProfileImg(imagePath);
    dispatch(authActions.updateProfileImg(newProfileImg));
  }, [params]);

  const onPressAvatar = () => {
    initImageLibrary({
      screen: 'ProfileEdit',
      selectionLimit: 1,
      isCircle: true,
    });
  };

  return (
    <View
      style={{
        paddingHorizontal,
        paddingVertical: mainPaddingVertical,
      }}
    >
      <View center>
        <View
          center
          style={{
            width: profileWidth,
            height: profileWidth,
            borderRadius: profileWidth / 2,
            borderWidth: 1,
            borderColor: Colors.point,
          }}
        >
          {profileLoading ? (
            <DotIndicator
              size={8}
              count={3}
              color={Colors.point}
            ></DotIndicator>
          ) : (
            <FastImage
              style={{
                width: profileWidth,
                height: profileWidth,
                borderRadius: profileWidth / 2,
                borderWidth: 1,
                borderColor: Colors.point,
              }}
              source={{ uri: _profileImg }}
            ></FastImage>
          )}
        </View>
        {!profileLoading && (
          <Button
            onPress={onPressAvatar}
            marginT-10
            link
            label="프로필 사진 바꾸기"
          ></Button>
        )}
      </View>
    </View>
  );
};

export default ProfileEditScreen;
