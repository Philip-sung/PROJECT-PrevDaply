import goodIcon from '../../../assets/icons/feeling/happy.png';
import happyIcon from '../../../assets/icons/feeling/in-love.png';
import sosoIcon from '../../../assets/icons/feeling/thinking.png';
import boredIcon from '../../../assets/icons/feeling/thinking-1-copy.png';
import excitedIcon from '../../../assets/icons/feeling/angel.png';
import gloomyIcon from '../../../assets/icons/feeling/crying.png';
import happyImage from '../../../assets/images/happy.jpg';
import stressImage from '../../../assets/icons/feeling/angry.png';
import restImage from '../../../assets/icons/feeling/disappointed.png';
import flexImage from '../../../assets/icons/feeling/cool.png';

const feelingConfig = [
  {
    id: 0,
    value: 'good',
    text: '기쁠 때',
    desc: '데플러들이 일상 속 행복과 좋은 일, 좋은 날에 간 곳을 최신순으로 모았어요!',
    path: goodIcon,
    img: happyImage,
  },
  {
    id: 1,
    value: 'happy',
    text: '행복할 때',
    desc: '기념일과 같은 특별한 날에 간 장소, 여행 또는 정말 행복한 순간을 모았어요!',
    path: happyIcon,
  },
  {
    id: 2,
    value: 'soso',
    text: '센치할 때',
    desc: '감정이 풍부한 날, 감상에 젖은 날 가기 좋은 곳들을 데플러들이 추천합니다!',
    path: sosoIcon,
  },
  {
    id: 3,
    value: 'bored',
    text: '심심할 때',
    desc: '반복되는 일상 속 단조로움을 깨기 위해, 심심함을 달래 줄 새로운 데이트들!',
    path: boredIcon,
  },
  {
    id: 4,
    value: 'excited',
    text: '설레일 때',
    desc: '새롭게 알아가는 연인들이 설레는 마음으로 하기 좋은 데이트를 데플러가 추천 또는 오래된 연인에게는 리프레쉬를!',
    path: excitedIcon,
  },
  {
    id: 5,
    value: 'gloomy',
    text: '우울할 때',
    desc: '힘들고 우울할때 연인과 함께 극복할 수 있는 다양한 방법을 소개합니다',
    path: gloomyIcon,
  },
  {
    id: 6,
    value: 'stress',
    text: '스트레스 받을 때',
    desc: '스트레스 폭발! 더는 못참을때 이 데이트 꼭 하고 만다!',
    path: stressImage,
  },
  {
    id: 7,
    value: 'rest',
    text: '쉬고 싶을 때',
    desc: '힐링이 필요해 난 니가 필요해',
    path: restImage,
  },
  {
    id: 8,
    value: 'flex',
    text: 'FLEX 하고 싶을 때',
    desc: '플렉스는 뭐야',
    path: flexImage,
  },
];

export default feelingConfig;
