import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import CursorFollower from './Components/Hand';
import Wall from "./Components/wall";
import Damage from "./Components/damage";
import {DAMAGE_ANIMATION_TIME, PUNCH_ANIMATION_TIME} from './contants';
import smallGrunt1 from './Assets/audio/small-grunt-1.mp3';
import smallGrunt2 from './Assets/audio/small-grunt-2.mp3';
import smallGrunt3 from './Assets/audio/small-grunt-3.mp3';
import smallGrunt4 from './Assets/audio/small-grunt-4.mp3';
import bigGrunt1 from './Assets/audio/big-grunt-1.mp3';
import bigGrunt2 from './Assets/audio/big-grunt-2.mp3';
import bigGrunt3 from './Assets/audio/big-grunt-3.mp3';
import chargeUpGruntMP3 from './Assets/audio/charge-up-grunt-1.mp3';


// let chargeUpGrunt = new Audio(chargeUpGruntMP3);

function App() {
  const [isPunching, setIsPunching] = useState(false);
  const [isWindingUp, setIsWindingUp] = useState(false);
  const [isLongPunch, setIsLongPunch] = useState(false);
  const [windingPosition, setWindingPosition] = useState(0);
  const [punchPower, setPunchPower] = useState(0);
  const pressTimer = useRef(null);
  const moveInterval = useRef(null);
  const [damages, setDamages] = useState([]);
  const [chargeUpGrunt] = useState(new Audio(chargeUpGruntMP3));
  const smallGrunts = [smallGrunt1, smallGrunt2, smallGrunt3, smallGrunt4];
  const bigGrunts = [bigGrunt1, bigGrunt2, bigGrunt3];

  useEffect(() => {
    chargeUpGrunt.loop = true; // Enable looping
    chargeUpGrunt.onended = () => {
      // Set the audio to loop when it finishes
      // This is just to keep the state in sync, as the audio will automatically loop
      chargeUpGrunt.play();
    };
  }, [chargeUpGrunt]);

  useEffect(() => {
    const amount = 30;
    if (isWindingUp) {
      moveInterval.current = setInterval(() => {
        setPunchPower((existingPower) => existingPower + 0.5);
        console.log('punchPower ' + punchPower);
        setWindingPosition((windingPosition) => {
          if (windingPosition >= amount) {
            return windingPosition - amount; // Move the image back
          } else {
            return windingPosition + amount; // Move the image forward
          }
        });
      }, 200);
    } else {
      // Clean up and reset when long press is released
      // setPunchPower((existingPower) => existingPower + 1);
      console.log('punchPower2 ' + punchPower);
      setPunchPower(punchPower);
      clearInterval(moveInterval.current);
      setWindingPosition(0); // Optionally reset position when long press ends
    }

    return () => {
      clearInterval(moveInterval.current); // Cleanup interval on unmount
    };
  }, [isWindingUp]);


  // const handleMouseMove = (e) => {
  //   setMousePosition({
  //     x: e.clientX,
  //     y: e.clientY,
  //   });
  // };

  const calculateDistance = (x1, y1, x2, y2) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);  // Euclidean distance
  };
  const doDamageStuff = (e) => {
    const newDamage = { x: e.clientX, y: e.clientY, size: (punchPower || 1) };  // Default size is 50
    let closestDamageIndex = -1;
    let minDistance = Infinity;
    // Check if the new damage is too close to any existing damage
    damages.forEach((damage, index) => {
      const distance = calculateDistance(newDamage.x, newDamage.y, damage.x, damage.y);
      if (distance < 200 && distance < minDistance) {  // 100px threshold
        closestDamageIndex = index;
        minDistance = distance;
      }
    });
    // If a close damage is found, increase its size
    if (closestDamageIndex !== -1) {
      setDamages((prevDamages) =>
        prevDamages.map((damage, index) =>
          index === closestDamageIndex
            ? { ...damage, size: damage.size + (punchPower || 1) }  // Increase size by 10
            : damage
        )
      );
    } else {
      // Otherwise, add a new damage to the list
      setDamages((prevDamages) => [...prevDamages, newDamage]);
    }
  };

  const playSound = () => {
    let sound;
    if (isLongPunch) {
      const randomNumber = Math.floor(Math.random() * 3);
      sound = new Audio(bigGrunts[randomNumber]);
    } else {
      const randomNumber = Math.floor(Math.random() * 4);
      sound = new Audio(smallGrunts[randomNumber]);
    }
    sound.play();
    setTimeout(() => {

    }, 300)
  };

  const handlePunch = ( e ) => {
    chargeUpGrunt.pause();
    chargeUpGrunt.currentTime = 0;
    if (!isPunching) {
      console.log('isLongPunch = ' + isLongPunch);
      playSound();
      console.log('onClick triggered!');
      // console.log('punchPower ' + punchPower);
      const newDamage = {x: e.clientX, y: e.clientY};
      // setDamages((prevDamages) => [...prevDamages, newDamage]);
      // console.log(damages);
      if (punchPower > 1) {
        // console.log('punchPower > 1');
      }
      setIsPunching(true);
      setTimeout(() => {
        setIsPunching(false);
      }, PUNCH_ANIMATION_TIME);
      setTimeout(() => {
        doDamageStuff(e);
      }, DAMAGE_ANIMATION_TIME);
      setPunchPower(0);
      setIsLongPunch(false);
    }
  };

  const handleMouseDown = () => {
    // Start a timer on mouse down
    if (!isPunching) {
      console.log('handleMouseDown');
      pressTimer.current = setTimeout(() => {
        setIsWindingUp(true); // Trigger long press action
        console.log('Long press detected!');
        chargeUpGrunt.play();
      }, 200);
    }
  };


  const handleMouseUp = () => {
    chargeUpGrunt.pause();
    chargeUpGrunt.currentTime = 0;
    console.log('handleMouseUp');
    clearTimeout(pressTimer.current);
    if (!isWindingUp) {
      console.log('Normal click detected!');
    } else {
      setIsLongPunch(true);
    }
    setIsWindingUp(false);
    // setPunchPower(1);
  };

  return (
    <div className="App">
      <div
        style={{
          height: '100vh',
          position: 'relative',
          backgroundColor: '#222b3f',
      }}
        // onMouseMove={handleMouseMove}
        onClick={handlePunch}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <Wall punchPower={punchPower} isPunching={isPunching}/>
        {damages.map((damage, index) => (
          <Damage key={index} x={damage.x} y={damage.y} size={damage.size} punchPower={punchPower} />
        ))}
        <CursorFollower isPunching={isPunching} isWindingUp={isWindingUp} windingPosition={windingPosition}/>

      </div>
    </div>
  );
}

export default App;
