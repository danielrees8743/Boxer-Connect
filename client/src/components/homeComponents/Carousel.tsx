import { Box, Image, Stack, Button, Flex } from '@chakra-ui/react';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper';

export default function Carousel() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className='mySwiper'>
        <SwiperSlide>
          <Image
            src='./src/assets/boxers-1.png'
            bg='white'
            w='100%'
            h='30rem'
            position='relative'
            overflow='hidden'
            sx={{ filter: 'grayscale(100%)', objectFit: 'cover' }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src='./src/assets/boxers-2.jpg'
            bg='white'
            w='100%'
            h='30rem'
            position='relative'
            overflow='hidden'
            sx={{ filter: 'grayscale(100%)', objectFit: 'cover' }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src='./src/assets/boxers-3.webp'
            bg='white'
            w='100%'
            h='30rem'
            position='relative'
            overflow='hidden'
            sx={{ filter: 'grayscale(100%)', objectFit: 'cover' }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src='./src/assets/boxers-4.jpg'
            bg='white'
            w='100%'
            h='30rem'
            position='relative'
            overflow='hidden'
            sx={{ filter: 'grayscale(100%)', objectFit: 'cover' }}
          />
        </SwiperSlide>
        {/* <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide> */}
      </Swiper>
    </>
  );
}
