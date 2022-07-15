import React from 'react';
import Button from '../Button';

import { Overlay, Container, Footer } from './styles';

function Modal() {
  return (
    <Overlay>
      <Container>
        <h1>titulo do modal</h1>
        <p>corpo do modal</p>
        <Footer>
          <button type="button" className="cancel-button">
            Cancelar
          </button>
          <Button>Deletar</Button>
        </Footer>
      </Container>
    </Overlay>
  );
}

export default Modal;
