import PropTypes from 'prop-types';
import React from 'react';
import { images } from '../../../../assets/images';
import Button from '../../../../components/Button';

import { Container } from './styles';

export function ErrorStatus({ onTryAgain }) {
  return (
    <Container>
      <img src={images.sad} alt="sad" />
      <div className="details">
        <strong>Ocorreu um erro ao obter os seus contatos!</strong>
        <Button type="button" onClick={onTryAgain}>
          Tentar novamente
        </Button>
      </div>
    </Container>
  );
}

ErrorStatus.propTypes = {
  onTryAgain: PropTypes.func.isRequired,
};
