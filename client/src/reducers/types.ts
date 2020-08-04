export interface appState {
  [key: string]: string,
}
export interface quoteState {
  [key: string]: string,
}
export interface actionMan {
  type: string,
  payload: any,
}