import React from 'react';
import MainSectionHeader from '../UI/MainSectionHeader/MainSectionHeader';
import MainInfoItem from '../UI/MainInfoItem/MainInfoItem';
import info from '../../assets/images/info-1.jpg';

const Main = () => {
  return (
    <div>
      <MainSectionHeader />
      <MainInfoItem title="sscsc" src={info} alt="sdsd" />
    </div>
  );
};

export default Main;
