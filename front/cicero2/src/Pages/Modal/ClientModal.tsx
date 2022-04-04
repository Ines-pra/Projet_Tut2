import React from "react";
import styled from 'styled-components';

import Box from "@mui/material/Box";
import { createPortal } from "react-dom";

const Wrapper = styled.div `
  position:absolute;
  top:0;
  left:0;
  display:flex;
  align-items:center;
  justify-content:center;
  position:absolute;
  width:100%;
  min-height:100%; 
  background-color: rgba(20,20,20,0.6);
`;

//  background-color: rgba(20,20,20,0.5);

type Props = {
    modalOpen : boolean
}

const ClientModal: React.FC<Props> = ({modalOpen,children}) => {

    if (!modalOpen) return null;
    return createPortal(
        <div>
            <Wrapper>
            {/* <Box> */}
                <div>
                    {children}
                </div>
            {/* </Box> */}
            </Wrapper>
        </div>
        ,
        document.body
    );

}

export default ClientModal;