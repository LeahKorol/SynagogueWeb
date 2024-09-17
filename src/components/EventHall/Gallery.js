import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import './Gallery.css';

function Gallery() {
  const [eventGallery, setEventGallery] = useState([]);
  const [slideIndex, setSlideIndex] = useState(1);

  const fetchEventGallery = async () => {
    const querySnapshot = await getDocs(collection(db, "eventGallery"));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setEventGallery(data);
  };

  useEffect(() => {
    fetchEventGallery();
  }, []);

  useEffect(() => {
    if (eventGallery.length > 0) {
      showSlides(1);
    }
  }, [eventGallery]);

  const showSlides = (n) => {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { n = 1 }
    if (n < 1) { n = slides.length }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    if (slides[n - 1]) {
      slides[n - 1].style.display = "block";
      dots[n - 1].className += " active";
    }
    setSlideIndex(n); // Update the slideIndex state
  };

  const plusSlides = (n) => {
    showSlides(slideIndex + n);
  };

  const currentSlide = (n) => {
    showSlides(n);
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
          <button className="next" onClick={() => plusSlides(-1)}>❮</button>
          <button className="prev" onClick={() => plusSlides(1)}>❯</button>
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
