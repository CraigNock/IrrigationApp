import React, { PropsWithChildren, useEffect } from 'react';
import styled from 'styled-components';
import { Coordinates } from './interfaces';
import { COLORS, DRAGSNAP } from '../../../constants';
import { roundToNum } from '../../../utils';
import Popup  from '../SprinklerMenu/assets/sprinkle-svgrepo-com.svg';

const checkOutOfMenuZone = (currentLocation : DOMRect | null, menuZone : DOMRect | null) : boolean => {
  if(!currentLocation || !menuZone) return true
  if((currentLocation.right >= menuZone.left 
    && currentLocation.left <= menuZone.right) 
    && (currentLocation.bottom >= menuZone.top 
    && currentLocation.top <= menuZone.bottom)){
    return false
  }
  return true
}
/**
 * @description check if we can drop the item in this current position
 * @param currentLocation {DOMRect} all the information of the current location of the dragged item
 * @param dropZone {DOMRect} 
 * @param menuZone {DOMRect}
 * @return {boolean} True - can drop, False - Can't drop
 */
const checkDropZone = (currentLocation : DOMRect | null, dropZone : DOMRect | null, menuZone : DOMRect | null) : boolean => {
  if(!currentLocation || !dropZone) return true;
  // if(!checkOutOfMenuZone(currentLocation, menuZone)) return false;
  if((currentLocation.left >= dropZone.left 
    && currentLocation.right <= dropZone.right) 
    && (currentLocation.top >= dropZone.top 
    && currentLocation.bottom <= dropZone.bottom)
    && (checkOutOfMenuZone(currentLocation, menuZone))
    ){
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
  menuZone: DOMRect | null,
  style?: React.CSSProperties,
  src: string,
  initialCoord: Coordinates,
  dragging : boolean,
  mouseCoords : Coordinates,
};


// the movement is not dependent on knowing the location.
// using transform: translate(Xpx, Ypx), means that the component
// will move, but in RELATION to the starting point.
// const DragNDrop : React.FC<PropsWithChildren<props>> = React.forwardRef({children}, ref) => { => { /********************** */
  const DragNDrop : React.FC<PropsWithChildren<props>> = ({children, dropZone, menuZone, src, initialCoord, dragging = false, mouseCoords}) => {

    // how much the component will move on each drag
  const [translateValues, setTranslateValues] = React.useState<Coordinates>({x:0, y:0})
  // all the translations that have happened up to each iteration
  // on mouse up we add up the translations of that current drag
  const [translateUpToNow, setTranslateUpToNow] = React.useState<Coordinates>({x:0, y:0})
  // where the mouse is
  const [mouseCoordinates, setMouseCoordinates] = React.useState<Coordinates>(mouseCoords)
  // flag to know if the mouse has been clicked
  const [isMouseDown, setIsMouseDown] = React.useState<boolean>(false);
  
  const [canDrop, setCanDrop] = React.useState<boolean>(false);

  const [dropState, setDropState] = React.useState<boolean>(true)

  const thisRef = React.useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    // console.log('effect DnD')
    const setMouseMove = (e : any) => {
      console.log('cursorX', e.clientX)
      console.log('cursorY', e.clientY)
    
      mouseDown(e)
      window.removeEventListener('mousemove', setMouseMove)
    }
    if(dragging) {
      setIsMouseDown(true)
      // window.addEventListener('mousemove', setMouseMove)
    }

    return () => {
      window.removeEventListener('mousemove', setMouseMove)
    }
  }, [])

  // setting the position of everything for the start of the drag
  const mouseDown = React.useCallback(({clientX, clientY}) : void => {
    // console.log('clientY - mouseDown', clientY)
    // console.log('clientX - mouseDown', clientX)
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
    console.log('clientX - mouseMove', mouseCoordinates.x)
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
    setCanDrop(checkDropZone(thisRect, dropZone, menuZone))
    // eslint-disable-next-line
  }, [translateValues, translateUpToNow, dropZone])

  // checking wether or not the item is currently in an area
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
    console.log('mouseUp')
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
    console.log('isMouseDown', canDrop)
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
  // console.log('initialCoord', initialCoord.top);
  return (
    <Wrapper
      data-css="dragNdrop"
      ref={thisRef}
    // the movement of the component is by translate
      style={{top: `${initialCoord.x}px`, left: `${initialCoord.y}px`, transform: `translate(${translateValues.x}px, ${translateValues.y}px)`, backgroundColor: dropState ? 'transparent' : COLORS.MAROON}}
      onMouseDown={(event)=>{
        event.preventDefault();
        event.stopPropagation();
        console.log('DOM')
        mouseDown(event);
      }}
    >
      <img src={src || Popup} draggable="false" style={{width:'30px', height:'30px', margin:'0px', padding:'0px'}} alt='spray'/>
      {children}
    </Wrapper>
  )
}

export default DragNDrop;

const Wrapper = styled.div`
  position: absolute;
  margin: 0px;
  padding: 0px;
  width: fit-content;
  height: fit-content;
  object-fit:contain;
  /* border: 1px blue solid; */

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