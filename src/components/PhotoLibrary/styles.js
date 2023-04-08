import { Dimensions, StyleSheet } from 'react-native';
import { colorTheme } from '../../styles';
const screenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  strech: {
    width: '100%',
    height: '100%',
  },
  deviceSquare: {
    width: screenWidth,
    height: screenWidth,
  },
  header: {
    padding: 10,
  },
  photoItem: {
    width: screenWidth / 4,
    height: screenWidth / 4,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: 'white',
    marginRight: 10,
  },
  checkButtonWrapper: {
    position: 'absolute',
    right: 5,
    top: 5,
  },
  checkButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colorTheme.primary[300],
    borderWidth: 1,
    borderColor: colorTheme.primary[300],
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedIndexText: {
    color: 'white',
    position: 'absolute',
    alignSelf: 'center',
    fontSize: 12,
  },
});
