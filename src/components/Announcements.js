import React, { useEffect, useState } from 'react';

function Announcements() {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const showSlides = () => {
      let slides = document.getElementsByClassName("mySlides");
      let dots = document.getElementsByClassName("dot");

      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      setSlideIndex((prevIndex) => (prevIndex + 1 > slides.length ? 1 : prevIndex + 1));

      for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].style.display = "block";
      }
      if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].className += " active";
      }
    };

    const interval = setInterval(showSlides, 2000);
    return () => clearInterval(interval);
  }, [slideIndex]);

  return (
    <section className="announcements">
      <h2>איחולים</h2>

      <div className="slideshow-container">
        <div className="mySlides fade">
          <div className="numbertext">1 / 3</div>
          <p>מזל טוב למשפחת כהן להולדת הבן</p>
        </div>

        <div className="mySlides fade">
          <div className="numbertext">2 / 3</div>
          <p>מזל טוב למשפחת לוי לאירוסי הבת</p>
        </div>

        <div className="mySlides fade">
          <div className="numbertext">3 / 3</div>
          <p>מזל טוב למשפחת משה לרגל בר המצווה של בנם יוסף</p>
        </div>
      </div>

      <br />

      <div style={{ textAlign: "center" }}>
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    </section>
  );
}

export default Announcements;