
interface dropZone {
  Rect : DOMRect,
  allowed : boolean,
}


/**
 * @description A function that checks if the current location of an item that is being dragged is "Safe" for drop
 * @param currentLocation { DOMRect } a DOM Rect element of the item that is being dragged
 * @param dropZonesArray { DOMRect[] } an Array of the DOM Rects that represent all the drop zones, and the "allowed" status
 * @return { boolean } 
 */
export const checkEveryZone = ( currentLocation : DOMRect | null, dropZonesArray : dropZone[] ) : boolean => {
  if(!currentLocation || !dropZonesArray.length) return true;
  return dropZonesArray.every(dropZone => dropZone.allowed ? checkIfInZone(currentLocation, dropZone.Rect) : !checkIfInZone(currentLocation, dropZone.Rect))
  
}

/**
 * @description A function that checks if the current location of an item that is being dragged is "Safe" for drop in relation to one drop zone
 * @param currentLocation { DOMRect } a DOM Rect element of the item that is being dragged
 * @param dropZone { DOMRect } the DOM Rect that represent the drop zones
 * @return { boolean } 
 */
export const checkIfInZone = (currentLocation : DOMRect, dropZone : DOMRect) => {
  if((currentLocation.left >= dropZone.left 
    && currentLocation.right <= dropZone.right) 
    && (currentLocation.top >= dropZone.top 
    && currentLocation.bottom <= dropZone.bottom)
    ){
    return true
  }
  return false
}