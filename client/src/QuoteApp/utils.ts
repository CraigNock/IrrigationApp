


export const checkIfInZone = ( currentLocation : DOMRect | null, zonesArray : DOMRect | null, dropZone : DOMRect | null ) : boolean => {
  if(!currentLocation || !dropZone) return true;
  // if(!checkOutOfMenuZone(currentLocation, menuZone)) return false;
  if((currentLocation.left >= dropZone.left 
    && currentLocation.right <= dropZone.right) 
    && (currentLocation.top >= dropZone.top 
    && currentLocation.bottom <= dropZone.bottom)
    ){
    return true
  }
  return false
}

export const checkEveryZone = (currentLocation : DOMRect | null, zonesArray : DOMRect | null, dropZone : DOMRect | null) => {

}