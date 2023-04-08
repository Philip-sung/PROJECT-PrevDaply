import { launchImageLibrary } from 'react-native-image-picker';
import { RNS3 } from 'react-native-aws3';
import * as RootNavigation from '../routes/navigation';

const options = {
  keyPrefix: 'uploads/',
  bucket: 'date-pictures',
  region: 'ap-northeast-2',
  accessKey: 'AKIA4R7W73JAB2O7LWST',
  secretKey: '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',
  successActionStatus: 201,
};

const imageConfig = {
  mediaType: 'photo',
  maxWidth: 600,
  maxHeight: 600,
  quality: 0.5,
};

export const initImageLibrary = ({
  screen,
  selectionLimit,
  extra,
  isCircle,
  callback,
}) => {
  launchImageLibrary(
    {
      ...imageConfig,
      selectionLimit,
    },
    (response) => {
      if (callback) callback();
      if (response.didCancel) return null;
      return RootNavigation.navigate('PhotoLibrary', {
        from: screen,
        imageList: response.assets,
        extra,
        isCircle,
      });
    },
  );
};

export const reformImage = (userId, file) => {
  const timeStamp = new Date().getTime();
  const fileName = `date-image-${userId}-${timeStamp}`;
  let transformed;
  if (file.cropped) {
    transformed = {
      name: fileName,
      type: file.cropped.mime,
      uri: file.cropped.path,
    };
  } else {
    transformed = {
      name: fileName,
      type: file.type,
      uri: file.uri,
    };
  }
  return transformed;
};

export const uploadToS3 = async (userId, urlList) => {
  const result = [];
  await Promise.all(
    urlList.map(async (x) => {
      const response = await RNS3.put(reformImage(userId, x), options);
      result.push({
        ...response,
        selectedIndex: x.selectedIndex ? x.selectedIndex : 1,
      });
    }),
  );
  const final = result.map((x) => ({
    key: x.body.postResponse.key,
    uri: x.body.postResponse.location,
    selectedIndex: x.selectedIndex,
  }));
  return final;
};

export const uploadFeatureImage = async (userId, featureList) => {
  const result = await Promise.all(
    featureList.map(async (x) => ({
      ...x,
      imageList: await uploadToS3(userId, x.imageList),
    })),
  );
  return result;
};
