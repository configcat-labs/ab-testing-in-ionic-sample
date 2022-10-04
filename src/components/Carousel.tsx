import {
  IonCard,
  IonCardTitle,
  IonCardHeader,
  IonFooter,
  IonRow,
  IonCol,
} from "@ionic/react";
import { data } from "../assets/data";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "./carousel.css";

// import required modules
import { EffectCoverflow, Pagination } from "swiper";

const Carousel: React.FC = () => {
  return (
    <IonCard className="carousel">
      <Swiper
        effect={"coverflow"}
        centeredSlides={true}
        slidesPerView={"auto"}
        loop={true}
        breakpoints={{
          "@0.00": {
            slidesPerView: 1,
            spaceBetween: 5,
          },
          "@0.40": {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          "@0.80": {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="carousel"
      >
        {data.map((animal) => (
          <SwiperSlide className="slide" key={animal.id}>
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>{animal.name}</IonCardTitle>
              </IonCardHeader>
              <img className="img" src={animal.src} alt={animal.alt} />
              <IonFooter>
                <IonRow>
                  <IonCol>
                    {animal.type}
                    <br />
                    {animal.age}
                  </IonCol>
                </IonRow>
              </IonFooter>
            </IonCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </IonCard>
  );
};
export default Carousel;
