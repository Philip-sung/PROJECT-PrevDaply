import useSWRNative from '@nandorojo/swr-react-native';
import { createAPI, kakaoFetcher } from '..';

export const useKakaoLocSearch = (query) => {
  const initialData = {
    document: [{ id: -1 }],
  };
  const url = createAPI(
    `https://dapi.kakao.com/v2/local/search/keyword.json?query=${query}`,
  );
  const { data, error, isValidating } = useSWRNative(url, kakaoFetcher, {
    initialData,
  });

  return {
    result: data,
    loading: isValidating,
    error,
  };
};
