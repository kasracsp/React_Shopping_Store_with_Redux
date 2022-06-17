import React,{useState} from 'react'
import styles from './Carrousel.module.css'

//swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay} from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

//assets
import {carrouselList} from '../assets/carrouselItems'

const Carrousel = () => {
  const [mySwiper, setMySwiper] = useState({});
  const [currentIndex,setCurrentIndex]=useState(0)

  return (
    <div className={styles.container}>
      <Swiper className={styles.slides}
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
        onInit={(ev) => {
        setMySwiper(ev)
        }}
      >
        {
          carrouselList.map(item=>
            <SwiperSlide key={item.id} className={styles.slide}>
              <img src={item.image} alt={item.title} />
              <h2>{item.title}</h2>
            </SwiperSlide>
          )
        }

        {(currentIndex<carrouselList.length-1) && <button className={styles.swipperNext} onClick={() => mySwiper.slideNext()}>
          <span className="material-icons">chevron_right</span>
        </button>}
      
        {(currentIndex>0) && <button className={styles.swipperPrev} onClick={() => mySwiper.slidePrev()}>
          <span className="material-icons">chevron_left</span>
        </button>}
      </Swiper>
    </div>
  )
}

export default Carrousel