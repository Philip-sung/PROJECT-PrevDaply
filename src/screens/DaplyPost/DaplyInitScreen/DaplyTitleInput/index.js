import React from 'react';
import { Incubator } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import { DAPLY_TITLE_LENGTH } from '../../../../configs';
import { daplyActions } from '../../../../redux/daply';

const { TextField } = Incubator;

const DaplyTitleInput = () => {
  const dispatch = useDispatch();
  const { postingDaply } = useSelector((state) => state.daply);
  const { title } = postingDaply;
  const titleInput = {
    value: title,
    error:
      title.length > DAPLY_TITLE_LENGTH &&
      `플레이리스트의 제목은 ${DAPLY_TITLE_LENGTH}글자를 초과할 수 없습니다`,
    onChangeText: (txt) => {
      dispatch(daplyActions.setPostingDaply({ title: txt }));
    },
  };
  return <TextField {...titleInput}></TextField>;
};

export default DaplyTitleInput;
