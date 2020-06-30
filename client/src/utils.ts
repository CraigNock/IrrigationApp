
export const roundToNum = (input: number, modifier: number):number => {
  return Math.round(input/modifier) * modifier;
} 