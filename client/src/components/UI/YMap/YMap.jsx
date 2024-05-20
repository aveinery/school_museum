import React from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import styles from './YMap.module.css';

const YMap = () => {
  return (
    <section id="ymap" className={styles.map}>
      <YMaps>
        <Map
          width="100%"
          height="350px"
          defaultState={{ center: [56.339249, 37.520057], zoom: 17, controls: ['zoomControl', 'fullscreenControl'] }}
          modules={['control.ZoomControl', 'control.FullscreenControl']}
        >
          <Placemark geometry={[56.339249, 37.520057]} />
        </Map>
      </YMaps>
    </section>
  );
};

export default YMap;
