import { List } from 'immutable';

const freeFeature = {
  question: '자유롭게 적어주세요!',
  content: '',
  imageList: [],
  isFree: true,
  textRequired: 0,
  imageRequired: 0,
};

export const updateFeatureList = ({ featureList, targetFeature }) => {
  const currentFeatureList = List(featureList).toJS();
  const featureIndex = currentFeatureList.findIndex(
    (x) => x.id === targetFeature.id,
  );
  if (featureIndex.id === -1) return featureList;
  const updatedFeature = {
    ...targetFeature,
  };
  currentFeatureList.splice(featureIndex, 1, updatedFeature);
  return currentFeatureList;
};

export const insertedFeatureList = ({ featureList, targetFeature }) => {
  const newFeature = {
    ...freeFeature,
    id: new Date().getTime(),
    order: targetFeature.order + 1,
  };
  const currentFeatureList = List(featureList).toJS();
  currentFeatureList.push(newFeature);
  return { currentFeatureList, newFeature };
};

export const getFeature = ({ targetFeature, featureList }) => {
  const featureContent = featureList.find((x) => x.id === targetFeature.id);
  return featureContent || freeFeature;
};

export const getNextFeature = ({ targetFeature, featureList }) => {
  const filtered = featureList.filter((x) => x.order > targetFeature.order);
  if (filtered.length === 0) return null;
  return filtered[0];
};
