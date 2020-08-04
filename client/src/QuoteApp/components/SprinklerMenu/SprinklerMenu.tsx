import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import DragNDrop from '../DragNDrop';
import Popup  from './assets/sprinkle-svgrepo-com.svg';
// import { ReactComponent as Popup } from './assets/sprinkle-svgrepo-com.svg';
// import { ReactComponent as Rotor } from './assets/sprinkler.svg';

interface props {
  menuRef: React.RefObject<HTMLUListElement>,
  dropZone: DOMRect | null,
  onDrag: any,
};

const SprinklerMenu : React.FC<PropsWithChildren<props>> = ({dropZone, menuRef, onDrag}) => {
  
  const sprinklerRef = React.useRef<any>(null)

  React.useEffect(()=>{
    console.log('dropZone', dropZone)

  }, [dropZone])

//creates initial draggable on mount
  // React.useEffect(()=>{
  //   onDrag(sprinklerRef);
  // }, [])

  //onmouseleave if mousedown onDrag(sprinklerRef)   ??to create new draggable when moving intial??
//or just let mousedown pass through when in menu
//or pass sprinklerRef to dragndrop, trigger respawn on mouseUp+canDrop
//or some listener that makes sure there is something in sprinkler bounds

  // const createNewDraggable = (e, reference) => {
  //   if(e.button)onDrag(reference);
  // }

  return (
    <Wrapper ref={menuRef} >
      <Sprinkler  >
        <img 
          draggable="false"
          ref={sprinklerRef}
          style={{width:'30px', height:'30px'}}
          src={Popup}
          onMouseDown={(e) => {
            console.log('storageUp');
            onDrag(sprinklerRef, e);
          }}
        />
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
  position:absolute;
  list-style-type: none;
  /* border: 1px green solid; */
  width: fit-content;
  height: fit-content;
  margin: 0;
  background: skyblue;
`;

const Sprinkler = styled.li`
  height: fit-content;
  width: fit-content;
  padding: 1rem;
  border: 1px green solid;
  box-sizing: border-box;
  &:hover {
    cursor: grab;
  }
`;