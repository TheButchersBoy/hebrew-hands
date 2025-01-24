import React, { useState } from 'react';
import crease1 from "../Assets/walls/effects/crease1.png"
import crease2 from "../Assets/walls/effects/crease2.png"
import crease3 from "../Assets/walls/effects/crease3.png"
import hole from "../Assets/walls/effects/cardboard-hole3.png"


const Damage = ({ x, y, size }) => {

  const getImage = () => {
    switch (true) {
      case (size >= 0 && size <= 1):
        return crease1;
      case (size >= 1 && size <= 2):
        return crease2;
      case (size > 2):
      default: return crease3;
    }
  }

  return (
    <div
      style={{

      }}
    >
      {size < 4 && (
        <img
          src={getImage()}
          alt="Damage"
          style={{
            position: 'absolute',
            left: `${x - 350}px`,
            top: `${y -120 }px`,
            width: '400px',
            height: '200px',
          }}
        />
      )}
      {size >= 4 && (
        <img
          src={hole}
          alt="Damage"
          style={{
            position: 'absolute',
            left: `${x - 480}px`,
            top: `${y -240 }px`,
            width: '612px',
            height: '493px'
          }}
        />
      )}
    </div>
  );
};

export default Damage;
