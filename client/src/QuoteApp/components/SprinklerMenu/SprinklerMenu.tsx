import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import DragNDrop from '../DragNDrop';
import Popup  from './assets/sprinkle-svgrepo-com.svg';
// import { ReactComponent as Popup } from './assets/sprinkle-svgrepo-com.svg';
// import { ReactComponent as Rotter } from './assets/sprinkler.svg';

interface props {
  dropZone: DOMRect | null,
  onDrag: any,
};

const SprinklerMenu : React.FC<PropsWithChildren<props>> = ({dropZone, onDrag}) => {
  // const arr = [Popup, Popup]
  const testRef = React.useRef<any>(null)

  React.useEffect(()=>{
    console.log('dropZone', dropZone)

  }, [dropZone])
  return (
    <Wrapper >
      <Sprinkler ref={testRef} >
        <img 
          // dropZone={dropZone}
          // ref={testRef}
          style={{width:'30px', height:'30px'}}
          src={Popup}
          onMouseDown={(e) => {
            console.log('storageUp');
            onDrag(testRef);
          }}
        />
          
        {/* </DragNDrop> */}
      </Sprinkler>
      {/* <Sprinkler>
        <DragNDrop
          // ref={testRef}
        >
          <img src={Popup} onMouseDown={clickHandler}
        style={{height:'30px'}}/>
        </DragNDrop>
      </Sprinkler>
      <Sprinkler>
        <DragNDrop>
        <img src={Popup} onMouseDown={clickHandler}
        style={{height:'30px'}}/>
        </DragNDrop>
      </Sprinkler> */}
    </Wrapper>
  )
}

export default SprinklerMenu;

const Wrapper = styled.ul`
  position:relative;
  list-style-type: none;
  /* border: 1px green solid; */
  width: fit-content;
  height: fit-content;
  padding: 0;
  margin: 0;
`;

const Sprinkler = styled.li`
  border: 1px green solid;
  height: fit-content;
  width: fit-content;
`;