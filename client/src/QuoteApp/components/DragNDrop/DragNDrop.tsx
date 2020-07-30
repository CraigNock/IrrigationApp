import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { Coordinates } from './interfaces';
import { COLORS, DRAGSNAP } from '../../../constants';
import { roundToNum } from '../../../utils';
import Popup  from '../SprinklerMenu/assets/sprinkle-svgrepo-com.svg';


const checkDropZone = (currentLocation : DOMRect | null, dropZone : DOMRect | null) : boolean => {
  if(!currentLocation || !dropZone) return true
  if((currentLocation.left >= dropZone.left && currentLocation.right <= dropZone.right) && (currentLocation.top >= dropZone.top && currentLocation.bottom <= dropZone.bottom)){
    return true
  }
  return false
}

interface stringObj {
  [key : string] : string
}

interface props {
  // ref?: React.MutableRefObject<null>
  dropZone: DOMRect | null,
  style?: React.CSSProperties,
  src: string,
  initialCoord: any,
};


// the movement is not dependent on knowing the location.
// using transform: translate(Xpx, Ypx), means that the component
// will move, but in RELATION to the starting point.
// const DragNDrop : React.FC<PropsWithChildren<props>> = React.forwardRef({children}, ref) => { => { /********************** */
  const DragNDrop : React.FC<PropsWithChildren<props>> = ({children, dropZone, src, initialCoord}) => {

    // how much the component will move on each drag
  const [translateValues, setTranslateValues] = React.useState<Coordinates>({x:0, y:0})
  // all the translations that have happened up to each iteration
  // on mouse up we add up the translations of that current drag
  const [translateUpToNow, setTranslateUpToNow] = React.useState<Coordinates>({x:0, y:0})
  // where the mouse is
  const [mouseCoordinates, setMouseCoordinates] = React.useState<Coordinates>({x:0, y:0})
  // flag to know if the mouse has been clicked
  const [isMouseDown, setIsMouseDown] = React.useState<boolean>(false);
  
  const [canDrop, setCanDrop] = React.useState<boolean>(false);

  const [dropState, setDropState] = React.useState<boolean>(true)

  const thisRef = React.useRef<HTMLDivElement | null>(null);

  // setting the position of everything for the start of the drag
  const mouseDown = React.useCallback(({clientX, clientY}) : void => {
    setTranslateUpToNow({
      x: translateValues.x,
      y: translateValues.y
    })
    setMouseCoordinates({
      x: clientX,
      y: clientY
    })
    setIsMouseDown(true)
    // eslint-disable-next-line
  }, [isMouseDown, translateUpToNow])

  // when the mouse moves the translations changes accordingly 
  const mouseMove = React.useCallback(({clientX, clientY}) : void =>{
    // only effective when the mouse is down
    if(isMouseDown){
      // each coordinate is set to be the value of the start of drag
      // plus the sum of the movement of the mouse in relation to where it was clicked
      setTranslateValues({
        x: roundToNum(translateUpToNow.x + (clientX - mouseCoordinates.x), DRAGSNAP),
        y: roundToNum(translateUpToNow.y + (clientY - mouseCoordinates.y), DRAGSNAP)  
      })
    }
    // eslint-disable-next-line
  }, [isMouseDown, mouseCoordinates])

  // check if we can drop the sprinkler in the zone
  React.useEffect(()=>{
    let thisRect : DOMRect | null = null;
    if(thisRef !==null && thisRef.current !== null) {
      thisRect = thisRef.current.getBoundingClientRect();
    }
    setCanDrop(checkDropZone(thisRect ,dropZone))
    // eslint-disable-next-line
  }, [translateValues, translateUpToNow, dropZone])

  // checking weather or not the item is currently in an area
  // it can be dropped at
  React.useEffect(()=>{
    if(isMouseDown){
      if(canDrop){
        setDropState(true)
      } else {
        setDropState(false)
      }
    } else {
      setDropState(true);
    }
    // eslint-disable-next-line
  },[canDrop, isMouseDown])

  // when the mouse is up, set flag to false 
  const mouseUp = React.useCallback((): void => {
    setIsMouseDown(false)
    if(!canDrop){
      setTranslateValues({
        x:0,
        y:0
      })
      setTranslateUpToNow({
        y:0,
        x:0,
      })
    }
    // eslint-disable-next-line
  }, [isMouseDown, canDrop])

  // on click we start a new listener
  React.useEffect(()=>{
    window.addEventListener('mousemove', mouseMove)
    window.addEventListener('mouseup', mouseUp)

    return () => {
      window.removeEventListener('mousemove', mouseMove)
      window.removeEventListener('mouseup', mouseUp)
    }
    // eslint-disable-next-line
  },[isMouseDown, mouseUp, canDrop])
  // console.log('isMousedown', isMouseDown);
  // console.log('canDrop', canDrop)
  // console.log('dropState', dropState)

  return (
    <Wrapper
      data-css="dragNdrop"
      ref={thisRef}
    // the movement of the component is by translate
      style={{top: initialCoord.top, left: initialCoord.left, transform: `translate(${translateValues.x}px, ${translateValues.y}px)`, backgroundColor: dropState ? 'transparent' : COLORS.MAROON}}
      onMouseDown={(event)=>{
        event.preventDefault();
        event.stopPropagation();
        mouseDown(event);
      }}
    >
      <img src={src || Popup} style={{width:'30px', height:'30px', margin:'0px', padding:'0px'}} alt='spray'/>
      {children}
    </Wrapper>
  )
}

export default DragNDrop;

const Wrapper = styled.div`
position: absolute;
  border: 1px blue solid;
  margin: 0px;
  padding: 0px;
  width: fit-content;
  height: fit-content;
  object-fit:contain;

  &:hover{
    cursor: grab;
  }
  &:active{
    cursor: grabbing;
  }
  /* img{
    border: 1px solid orange;
    margin: 0;
  } */
`;