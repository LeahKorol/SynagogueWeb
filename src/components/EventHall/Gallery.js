
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth, storage } from '../../firebase';
import './Gallery.css';

function Gallery() {
  const [eventGallery, setEventGallery] = useState([]);
  let slideIndex = 1;

  const fetchEventGallery = async () => {
    const querySnapshot = await getDocs(collection(db, "eventGallery"));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setEventGallery(data);
  };

  useEffect(() => {
    fetchEventGallery();
    showSlides(slideIndex);
  }, []);

  const showSlides = (n) => {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    if (slides[slideIndex - 1]) {
      slides[slideIndex - 1].style.display = "block";
      dots[slideIndex - 1].className += " active";
    }
  };

  const plusSlides = (n) => {
    showSlides(slideIndex += n);
  };

  const currentSlide = (n) => {
    showSlides(slideIndex = n);
  };

  return (
    <main className='gallery-main'>
      <h1 className='heading'>אולם אירועים</h1>
      <section className="carousel">
        <div className="slideshow-container">
          {eventGallery.map((image, index) => (
            <div className="mySlides fade" key={image.id}>
              <div className="numbertext">{index + 1} / {eventGallery.length}</div>
              <img src={image.url} alt={`אירוע ${index + 1}`} />
            </div>
          ))}
          <a className="prev" onClick={() => plusSlides(-1)}>❮</a>
          <a className="next" onClick={() => plusSlides(1)}>❯</a>
        </div>
        <br />
        <div style={{ textAlign: 'center' }}>
          {eventGallery.map((_, index) => (
            <span className="dot" onClick={() => currentSlide(index + 1)} key={index}></span>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Gallery;
