import React from 'react';
import styled from 'styled-components';
// import DragNDrop from './components/DragNDrop';
import DragStorage from './components/DragStorage';
import SprinklerMenu from './components/SprinklerMenu/SprinklerMenu';
import ResizeDrag from './ResizeDraggable/ResizeDrag';

interface props {
  
};

const QuoteApp : React.FC<props> = () => {

  const dragStorageRef = React.useRef<HTMLDivElement>(null);
  let [dropZone, setDropZone] = React.useState<DOMRect | null>(null);
  React.useEffect(()=>{
    if(dragStorageRef !== null && dragStorageRef.current !== null){
      setDropZone(dragStorageRef.current.getBoundingClientRect())
    }
  },[dragStorageRef])
  return (
    <Wrapper>
      QuoteApp
      <DragStorage
        // ref={dragStorageRef}
      >
        <ResizeDrag 
          startX={50}
          startY={50}
          startWidth={100}
          startHeight={100}
        />
        <ResizeDrag
          startX={200}
          startY={150}
          startWidth={150}
          startHeight={150}
        >
          <DragableContent>
            ResizeDrag
          </DragableContent>
        </ResizeDrag>
      </DragStorage>
      <SprinklerMenu 
        dropZone={dropZone}
      />
    </Wrapper>
  )
}

export default QuoteApp;

const Wrapper = styled.div`

`;
// const DragStorage = styled.div`
//   position: relative;
//   width: 500px;
//   height: 500px;
//   border: 1px solid red;
// `;

const DragableContent = styled.div`

`;