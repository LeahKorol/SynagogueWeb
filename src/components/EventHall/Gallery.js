import React from 'react';
import './Gallery.css';

// Import images
import image1 from '../../images/3.jfif';
import image2 from '../../images/4.jfif';
import image3 from '../../images/5.jfif';

function Gallery() {
  let slideIndex = 1;

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
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
  };

  const plusSlides = (n) => {
    showSlides(slideIndex += n);
  };

  const currentSlide = (n) => {
    showSlides(slideIndex = n);
  };

  React.useEffect(() => {
    showSlides(slideIndex);
  }, []);

  return (
    <main className='gallery-main'>
      <h1 className='heading'>אולם אירועים</h1>
      <section className="carousel">
        <div className="slideshow-container">
          <div className="mySlides fade">
            <div className="numbertext">1 / 3</div>
            <img src={image1} alt="אולם מבט כללי"/>
            <div className="text">אולם מבט כללי</div>
          </div>
          <div className="mySlides fade">
            <div className="numbertext">2 / 3</div>
            <img src={image2} alt="מטבח"/>
            <div className="text">מטבח</div>
          </div>
          <div className="mySlides fade">
            <div className="numbertext">3 / 3</div>
            <img src={image3} alt="ציוד אולם"/>
            <div className="text">ציוד אולם</div>
          </div>
          <a className="next" onClick={() => plusSlides(-1)}>❮</a>
          <a className="prev" onClick={() => plusSlides(1)}>❯</a>
        </div>
        <br />
        <div style={{ textAlign: 'center' }}>
          <span className="dot" onClick={() => currentSlide(1)}></span>
          <span className="dot" onClick={() => currentSlide(2)}></span>
          <span className="dot" onClick={() => currentSlide(3)}></span>
        </div>
      </section>
    </main>
  );
}

export default Gallery;
