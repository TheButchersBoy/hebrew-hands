import React, {useEffect, useState} from 'react';
import cardboardWall from "../Assets/walls/cardboard.png";
// import cardboardWithHole from "../Assets/walls/cardboardWithHole.png"

const Wall = ({ isPunching, punchPower }) => {
  // const [wallHealth, setWallHealth] = useState(6);
  // const [wallBeaten, setWallBeaten] = useState(false);

  // useEffect(() => {
  //   console.log('power is ' + punchPower);
  //   console.log('wallHealth is ' + wallHealth);
  //   if (wallHealth - punchPower <= 0) {
  //     setTimeout(() => {
  //       setWallBeaten(true);
  //     }, 160);
  //     setWallHealth(0);
  //   } else {
  //     setWallHealth( wallHealth - punchPower);
  //   }
  // }, [isPunching]);

  // console.log('wall re-rendered');
  return (
    <div
      // style={{
      //   display: 'flex',
      //   justifyContent: 'center',
      //   alignItems: 'center',
      // }}
    >
      {/*{ !wallBeaten && (*/}
        <img
          style={{
            position: 'absolute',
            transform: 'translate(-50%, -50%)',
            top: '50%',
            left: '50%',
            maxWidth: '100%',
            maxHeight: '100%',
          }}
          src={cardboardWall}
          alt='cardboardWall'
        />
      {/*)}*/}
      {/*{ wallBeaten && (*/}
      {/*  <img*/}
      {/*    style={{*/}
      {/*      position: 'absolute',*/}
      {/*      transform: 'translate(-50%, -50%)',*/}
      {/*      top: '50%',*/}
      {/*      left: '50%',*/}
      {/*      maxWidth: '100%',*/}
      {/*      maxHeight: '100%',*/}
      {/*    }}*/}
      {/*    src={cardboardWithHole}*/}
      {/*    alt='cardboardWithHole'*/}
      {/*  />*/}
      {/*)}*/}
    </div>
  );
};

export default Wall;
