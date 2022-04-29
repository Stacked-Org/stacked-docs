import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function CompanySlider() {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 7,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  //   List of company logo images
  const CompanyLogoList = [
    {
      companyName: "Google",
      url: "https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-google-sva-scholarship-20.png",
    },
    {
      companyName: "Spotify",
      url: "https://logodownload.org/wp-content/uploads/2016/09/Spotify-logo.png",
    },
    {
      companyName: "Netflix",
      url: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png",
    },
    {
      companyName: "Uber",
      url: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png",
    },
    {
      companyName: "Hulu",
      url: "https://logodownload.org/wp-content/uploads/2019/09/hulu-logo-4.png",
    },
    {
      companyName: "GitHub",
      url: "https://www.kindpng.com/picc/m/128-1280187_github-logo-png-github-transparent-png.png",
    },
    {
      companyName: "Twitch",
      url: "https://i.pinimg.com/originals/9e/a0/a4/9ea0a46a56d3f415abf37a67d1a055c3.png",
    },
  ];

  function Logos({ companyName, url }) {
    return (
      <div>
        <img
          src={url}
          alt={companyName}
          width="150"
          className="m-auto grayscale hover:grayscale-0 transition duration-700 ease-in-out"
        />
      </div>
    );
  }

  return (
    <div className="py-28">
      <Carousel
        swipeable={false}
        draggable={false}
        showDots={false}
        responsive={responsive}
        ssr={false}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="transform 900ms ease-in-out"
        transitionDuration={300}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-10-px"
        centerMode={true}
      >
        {CompanyLogoList.map((props, index) => (
          <Logos key={index} {...props} />
        ))}
      </Carousel>
    </div>
  );
}
