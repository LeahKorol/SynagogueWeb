import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import './Announcements.css';

function Announcements() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [congrats, setCongrats] = useState([]);

  useEffect(() => {
    const fetchCongrats = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "congrats"));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCongrats(data);
      } catch (e) {
        console.error("Error fetching documents: ", e);
      }
    };

    fetchCongrats();
  }, []);

  useEffect(() => {
    const showSlides = () => {
      let slides = document.getElementsByClassName("mySlides");
      let dots = document.getElementsByClassName("dot");

      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      setSlideIndex((prevIndex) => (prevIndex + 1 >= slides.length ? 0 : prevIndex + 1));

      for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      if (slides[slideIndex]) {
        slides[slideIndex].style.display = "block";
      }
      if (dots[slideIndex]) {
        dots[slideIndex].className += " active";
      }
    };

    const interval = setInterval(showSlides, 5000);
    return () => clearInterval(interval);
  }, [slideIndex]);

  return (
    <section className="announcements">
      <h2>איחולים</h2>
      <div className="slideshow-container">
        {congrats.map((congrat, index) => (
          <div className="mySlides fade" key={congrat.id} style={{ display: index === slideIndex ? "block" : "none" }}>
            <div className="numbertext">{index + 1} / {congrats.length}</div>
            <p>{congrat.content}</p>
          </div>
        ))}
      </div>
      <br />
      <div style={{ textAlign: "center" }}>
        {congrats.map((_, index) => (
          <span
            className={`dot ${index === slideIndex ? "active" : ""}`}
            key={index}
            onClick={() => setSlideIndex(index)}
          ></span>
        ))}
      </div>
    </section>
  );
}

export default Announcements;

