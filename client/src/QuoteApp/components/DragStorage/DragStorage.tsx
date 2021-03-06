
import React, { useEffect, useState, PropsWithChildren } from 'react';
import styled from 'styled-components';
import DragNDrop from '../DragNDrop';
import SprinklerMenu from '../SprinklerMenu';
// import Popup  from '../SprinklerMenut/assets/sprinkle-svgrepo-com.svg';

interface props {
  dragStorageRef: React.RefObject<HTMLDivElement>,
}

const DragStorage : React.FC<PropsWithChildren<props>> = ({dragStorageRef, children}) => {

  const [sprinklers, setSprinklers] = useState<any>({});

  // const dragStorageRef = React.useRef<HTMLDivElement>(null);
  let [dropZone, setDropZone] = React.useState<DOMRect | null>(null);

  const menuRef = React.useRef<HTMLUListElement>(null);
  let [menuZone, setMenuZone] = React.useState<DOMRect | null>(null);

  useEffect(()=>{
    if(dragStorageRef !== null && dragStorageRef.current !== null){
      setDropZone(dragStorageRef.current.getBoundingClientRect())
    }
  },[dragStorageRef])

  useEffect(()=>{
    if(menuRef !== null && menuRef.current !== null){
      setMenuZone(menuRef.current.getBoundingClientRect())
    }
  },[menuRef])

//creates a new instance of draggable, positioned based on provided ref
  const onDrag = (testRef : any, e : any) => {
    let id = (new Date()).getTime().toString();
    console.log('testRef?.src', testRef?.current?.src)
    setSprinklers({
      ...sprinklers,
      [id]: {
        top: testRef?.current?.getBoundingClientRect().top,
        left: testRef?.current?.getBoundingClientRect().left,
        mouseCoords: {
          x: e.clientX, 
          y: e.clientY,
        },
        src: testRef?.current?.src
      },
    })
  }

  const deleteSelf = (id: number) => {
    const newSprinklers = {...sprinklers}
    delete newSprinklers[id];
    setSprinklers({
      ...newSprinklers,
    })
  }

  return (
    <Wrapper 
      ref={dragStorageRef}
    >
      {children}
      <SprinklerMenu
        menuRef={menuRef}
        dropZone={dropZone}
        onDrag={onDrag}
      />
      {(Object.keys(sprinklers).length)? Object.keys(sprinklers).map((id:string) => {
        return (
          <DragNDrop 
            dropZone={dropZone}
            menuZone={menuZone}
            key={id}
            initialCoord={{x: sprinklers[id].top, y: sprinklers[id].left}}
            mouseCoords={sprinklers[id].mouseCoords}
            imgSrc={sprinklers[id].src}
            dragging={true}
            id={id}
            deleteSelf={deleteSelf}
          >
          </DragNDrop>
          
        )
      }) : ''}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  /* position: relative; */
  width: 500px;
  height: 500px;
  border: 1px solid red;
  background: green;
`;

export default DragStorage;