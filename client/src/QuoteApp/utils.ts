
interface dropZone {
  Rect : DOMRect,
  allowed : boolean,
}



export const checkEveryZone = ( currentLocation : DOMRect | null, dropZonesArray : dropZone[] ) : boolean => {
  if(!currentLocation || !dropZonesArray.length) return true;
  return dropZonesArray.every(dropZone => dropZone.allowed ? checkIfInZone(currentLocation, dropZone.Rect) : !checkIfInZone(currentLocation, dropZone.Rect))
  
}

export const  checkIfInZone = (currentLocation : DOMRect, dropZone : DOMRect) => {
  if((currentLocation.left >= dropZone.left 
    && currentLocation.right <= dropZone.right) 
    && (currentLocation.top >= dropZone.top 
    && currentLocation.bottom <= dropZone.bottom)
    ){
    return true
  }
  return false
}