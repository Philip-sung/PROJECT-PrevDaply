/* eslint-disable camelcase */
export const parseCategory = ({ location, groupList }) => {
  const { category_group_name, category_name } = location;
  const groupName = category_group_name;
  const sub = category_name;
  const removedWhiteSpace = sub.replace(/\s+/g, '');
  const splited = removedWhiteSpace.split('>');
  // 1. 대분류 찾기
  let targetGroup = groupList.find((x) => x.name === groupName);
  // 2. 대분류  못 찾은 경우
  if (!targetGroup) {
    const firstSegment = splited[0];
    if (firstSegment === '스포츠,레저') {
      targetGroup = groupList.find((x) => x.name === '스포츠/레저');
    }
    if (firstSegment === '여행') {
      targetGroup = groupList.find((x) => x.name === '여행');
    } else {
      targetGroup = groupList.find((x) => x.code === 'EX8');
    }
  }
  return targetGroup;
};

export const parseSubCategory = ({ location, subGroupList }) => {
  const { category_name } = location;
  const sub = category_name;

  let targetSubGroup = subGroupList.find((x) => {
    const splited = x.extractKey.split(',');
    return splited.some((el) => sub.includes(el));
  });

  if (!targetSubGroup) {
    targetSubGroup = subGroupList.find((x) => x.code === 'ETC');
  }

  return targetSubGroup;
};
