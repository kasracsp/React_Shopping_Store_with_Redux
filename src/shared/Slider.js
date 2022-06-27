import React,{ useState } from 'react'
import { useSelector } from 'react-redux'
import { getSelectedCategoryItems } from '../helper/functions'
import Card from './Card'
import styles from './Slider.module.css'
import {Link} from 'react-router-dom'

//swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const Slider = ({category,title,isShow}) => {
  const productsState=useSelector(state=>state.productsState)
  const [mySwiper, setMySwiper] = useState({});
  const [isEnd,setIsEnd]=useState(false)
  const categoryItems=getSelectedCategoryItems(productsState.products,category)

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.headerTitle}>{title}</h2>
        {!isEnd &&
          <div className={styles.buttons}>
            <button className={styles.swipperPrev} onClick={() => mySwiper.slidePrev()}>
              <span className="material-icons">chevron_left</span>
            </button>

            <button className={styles.swipperNext} onClick={() => mySwiper.slideNext()}>
              <span className="material-icons">chevron_right</span>
            </button>
          </div>
        }
      </div>
      <Swiper className={styles.slides}
        spaceBetween={12}
        slidesPerView={2}
        onInit={(ev) => {
          setMySwiper(ev)
          setIsEnd(ev.isEnd)
        }}
        breakpoints= {
          {
            768: {
              slidesPerView: 3
            },
            992:{
              slidesPerView: 4
            }
          }
        }
        >
        {
          categoryItems.map(item=>
          <SwiperSlide key={item.id} >
            <Card product={item} isShow={isShow}/>
          </SwiperSlide>
          )
        }
      </Swiper>
      <Link to={`/products?category=${category}`}className={styles.more} >see all</Link>
    </div>
  )
}

export default Slider