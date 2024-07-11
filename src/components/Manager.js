// import React from 'react';
// import CongratForm from './CongratForm';
// import Congrats from './Congrats';


// function Manager() {
//   return (
//     <div className="manager-container">
//       <h2>עמוד מנהל</h2>
//       <p>ברוך הבא למערכת המנהל.</p>
//       <CongratForm/>
//       <Congrats/>
//     </div>
//   );
// }

// export default Manager;
import React from 'react';
import CongratForm from './CongratForm';
import LessonsForm from './LessonsForm';
import EventGalleryForm from './EventGalleryForm';
// import ImageUploader from './EventHall/ImageUploader';
// import Gallery from './EventHall/Gallery';

function Manager() {
  return (
    <div className="manager-container">
      <h2>עמוד מנהל</h2>
      <p>ברוך הבא למערכת המנהל.</p>
      <CongratForm />
      <LessonsForm />
      <EventGalleryForm />
      {/* <Gallery mode="admin" />
      <ImageUploader/> */}
    </div>
  );
}

export default Manager;


