import React from 'react';
import { images } from '../../../../assets/images';

import { Container } from './styles';

export function EmptyList() {
  return (
    <Container>
      <img src={images.emptyBox} alt="emptyBox" />
      <p>
        Você ainda não tem nenhum contato cadastrado! Clique no botão
        <strong> ”Novo contato” </strong>à cima para cadastrar o seu primeiro!
      </p>
    </Container>
  );
}
