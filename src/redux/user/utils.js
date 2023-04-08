import _ from 'lodash';
export const getFollowingMerged = ({ contacts, followingList }) => {
  const result = contacts.map((x) => {
    const filtered = followingList.filter((y) => y.following.phone === x.phone);
    const hasFollowed = filtered.length > 0;
    const following = filtered[0] || null;
    return {
      ...x,
      hasFollowed,
      following,
    };
  });
  const sorted = _.sortBy(result, 'hasFollowed').reverse();
  return sorted;
};
