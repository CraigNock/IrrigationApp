import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

interface props {

};
const Loading : React.FC<PropsWithChildren<props>> = () => {

  return (
    <Wrapper>
      Loading
    </Wrapper>
  )
}

export default Loading;

const Wrapper = styled.div`

`;