
import React, { useEffect, useState, PropsWithChildren } from 'react';
import styled from 'styled-components';
import DragNDrop from '../DragNDrop';
// import Popup  from '../SprinklerMenut/assets/sprinkle-svgrepo-com.svg';

interface props {

}

const DragStorage : React.FC<PropsWithChildren<props>> = ({children}) => {

  const [sprinklers, setSprinklers] = useState({});

  const dragStorageRef = React.useRef<HTMLDivElement>(null);
  let [dropZone, setDropZone] = React.useState<DOMRect | null>(null);

  useEffect(()=>{
    if(dragStorageRef !== null && dragStorageRef.current !== null){
      setDropZone(dragStorageRef.current.getBoundingClientRect())
    }
  },[dragStorageRef])

  const mouseUpHandle = () => {
    let id = Object.keys(sprinklers).length + 1;
    console.log(id);
    setSprinklers({
      ...sprinklers,
      [id]: `sprinkler${id}`,
    })
  }

  return (
    <Wrapper 
      ref={dragStorageRef}
      onMouseUp={(e) => {
        console.log('storageUp');
        mouseUpHandle();
      }}
    >
      {children}
      {(Object.keys(sprinklers).length)? Object.keys(sprinklers!).map((key:string) => {
        return (
          <DragNDrop 
            dropZone={dropZone}
            key={key}
            style={{width:'30px', height:'30px'}}
            src={''}
          >
            {key}
          </DragNDrop>
          
        )
      }) : ''}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  width: 500px;
  height: 500px;
  border: 1px solid red;
`;

export default DragStorage;