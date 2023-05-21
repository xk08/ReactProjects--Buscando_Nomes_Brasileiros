import styled from "styled-components"
import SimpleButtonComponent from "./SimpleButtonComponent";

const SimpleButtonStyledComponent = styled(SimpleButtonComponent)`

/* estados do button -> button:di */
&&& {
    &:disabled {
      color: #fff;
      background: #ba2456;
    }

    &:hover {
      color: #fff;
      background: #ba6024;
    }
  }
`;


export default SimpleButtonStyledComponent;
