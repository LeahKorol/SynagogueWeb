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

function Manager() {
  return (
    <div className="manager-container">
      <h2>עמוד מנהל</h2>
      <p>ברוך הבא למערכת המנהל.</p>
      <CongratForm />
      <LessonsForm />
    </div>
  );
}

export default Manager;


