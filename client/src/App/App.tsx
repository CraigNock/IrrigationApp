import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import {RootState} from '../Store';

import GlobalStyle from '../Globalstyle';
import QuoteApp from '../QuoteApp';

interface props {
  
};

const App : React.FC<PropsWithChildren<props>> = () => {

  const { appStatus } = useSelector((state: RootState) => state.app);
  console.log('appStatus', appStatus);
  
  // fetch('http://localhost:4000/setup/env')
  //   .then(res=>{
  //     console.log('test')
  //     return res.json()})
  //   .then(res=>{
  //     console.log('start')
  //     if(res.status === 200){
  //       console.log('res', res)  
  //     } else {
  //       console.log('erroe')
  //     }
  //   })
  //   .catch(err => {
  //     console.log('err', err)
  //   })

  return (
    <Wrapper>
      <GlobalStyle/>
      App
      <QuoteApp />
    </Wrapper>
  )
}

export default App;

const Wrapper = styled.div`

`