import React from "react";
import Navbar from "./Navbar";
import Logo from "./images/logo-1.webp";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useState, useEffect } from "react";
import axios from "axios";
import "swiper/swiper-bundle.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import carouseImage1 from "./images/whatsNew.webp";
import carouseImage2 from "./images/whatsNew.webp";
import carouseImage3 from "./images/whatsNew.webp";
import "./Events.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleRight } from "@fortawesome/free-solid-svg-icons";
import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";

function Events() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://timetable-backend-ce8b1adf3cf0.herokuapp.com/api/events/")
      .then((res) => setData(res.data));
  }, []);

  const slides = [
    {
      image: carouseImage1,
      title: data.map((event) => event.title)[0],
      body: data.map((event) => event.describe)[0],
    },
    {
      image: carouseImage2,
      title: data.map((event) => event.title)[1],
      body: data.map((event) => event.describe)[1],
    },
    {
      image: carouseImage3,
      title: data.map((event) => event.title)[2],
      body: data.map((event) => event.describe)[2],
    },
  ];
  return (
    <div className="Timetable">
      <div className="Logo">
        <img src={Logo} alt="Long Beach Place"></img>
      </div>
      <div className="App-Navbar">
        <Navbar />
      </div>
      <div className="rowB">
        <div>
          <div className="newsTitleEvent">
            <h1>Events</h1>
          </div>
          <div className="carousel-container">
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={50}
              slidesPreview={1}
              loop={true}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
            >
              {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                  <div className="carousel-slide">
                    <img src={slide.image} alt={`Slide ${index + 1}`} />
                    <div className="carousel-text">
                      <div className="carousel-title">{slide.title}</div>
                      <div className="carousel-body">{slide.body}</div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              <div className="swiper-button-prev">
                <FontAwesomeIcon
                  icon={faCircleLeft}
                  color="#fff"
                ></FontAwesomeIcon>
              </div>
              <div className="swiper-button-next">
                <FontAwesomeIcon
                  icon={faCircleRight}
                  color="#fff"
                ></FontAwesomeIcon>
              </div>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Events;
