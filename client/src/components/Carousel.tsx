import React, { useState, useEffect } from 'react';
import { Image, Button } from '@chakra-ui/react';

const Carousel = () => {
  const [index, setIndex] = useState(0);

  const images = [
    {
      src: 'https://multifiles.pressherald.com/uploads/sites/10/2019/11/20151110_Boxing002.jpg',
    },
    {
      src: 'https://media.licdn.com/dms/image/C5112AQG5EEodzFHyUA/article-cover_image-shrink_720_1280/0/1520149851007?e=1680134400&v=beta&t=EsQ0MFi4lsU83doHMRlT-ecC7KuU_PKU1VGhRBWZDKU',
    },
    { src: './src/assets/boxers-4.jpg' },
  ];

  const handleNextImage = () => {
    if (index === images.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };

  const handlePreviousImage = () => {
    if (index === 0) {
      setIndex(images.length - 1);
    } else {
      setIndex(index - 1);
    }
    setTimeout(() => {
      console.log('index', index);
    }, 1000);
  };

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setIndex((index + 1) % images.length);
  //   }, 8000);

  //   return () => clearInterval(timer);
  // }, [index]);

  return (
    <div>
      <Image src={images[index].src} />
      <Button onClick={handlePreviousImage}>Previous</Button>
      <Button onClick={handleNextImage}>Next</Button>
    </div>
  );
};
export default Carousel;
