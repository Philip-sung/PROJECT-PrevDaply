import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { DateLoader } from '../../components/Loader';
import { getItemFromAsync } from '../../hooks/requests';
import { homeActions } from '../../redux/home';
import feelingConfig from '../Post/FeelingScreen/constants';

function InitScreen({ navigation }) {
  const dispatch = useDispatch();
  useEffect(async () => {
    getData();
    const token = await getItemFromAsync('idToken');
    if (!token) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Auth' }],
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainTab' }],
      });
    }
  }, []);

  const getData = () => {
    dispatch(homeActions.getDaplyTopAction());
    dispatch(homeActions.getDateTopAction());
    dispatch(homeActions.getDateTopThemeAction({ isAll: false }));
    dispatch(homeActions.getDateByFeelingAction(feelingConfig[0].value));
  };

  return <DateLoader wrapperHeight={100}></DateLoader>;
}

export default InitScreen;
