import React, {useEffect, useState} from 'react';
import hand1 from '../Assets/hand/hand1.png';
import hand2 from '../Assets/hand/hand2.png';
import hand3 from '../Assets/hand/hand3.png';

const CursorFollower = ({isPunching, isWindingUp, windingPosition} ) => {
  const [mousePosition, setMousePosition] = useState({ x: 500, y: 500 });
  // const [isPunching, setIsPunching] = useState(false);
  const [punchAnimating, setPunchAnimating] = useState(false);
  const [showHand1, setShowHand1] = useState(true);
  const [showHand2, setShowHand2] = useState(false);
  const [showHand3, setShowHand3] = useState(false);
  // const [windingPosition, setWindingPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    isPunching && performPunch()
  }, [isPunching]);

  const handleMouseMove = (e) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const performPunch = () => {
    if (!punchAnimating) {
      setPunchAnimating(true);
      setShowHand1(false);
      setShowHand2(true);
      setTimeout(() => {
        setShowHand2(false);
        setShowHand3(true);
      }, 100);
      setTimeout(() => {
        setShowHand3(false);
        setShowHand2(true);
      }, 200);
      setTimeout(() => {
        setShowHand2(false);
        setShowHand1(true);
        setPunchAnimating(false);
      }, 450);
    }
  }

  return (
    <div
      style={{ // Make hand area the same size as the parent (whole screen) to capture all mouse movement.
        position: 'relative',
        height: '100vh',
    }}
      onMouseMove={handleMouseMove}
    >
      { showHand1 && (
        <img
          style={{
            position: 'absolute',
            height: '358px',
            width: '990px',
            left: `${mousePosition.x - 620 + windingPosition}px`,
            top: `${mousePosition.y - 170 + windingPosition}px`,
          }}
          draggable="false"
          src={hand1}
          alt='hand1'

        />
      )}

      { showHand2 && (
        <img
          style={{
            position: 'absolute',
            height: '358px',
            width: '990px',
            left: `${mousePosition.x - 450}px`,
            top: `${mousePosition.y - 170}px`
          }}
          src={hand2}
          alt='hand2'
        />
      )}

      { showHand3 && (
        <img
          style={{
            position: 'absolute',
            height: '358px',
            width: '990px',
            left: `${mousePosition.x - 320}px`,
            top: `${mousePosition.y - 130}px`
          }}
          src={hand3}
          alt='hand3'
        />
      )}
    </div>
  );
};

export default CursorFollower;
