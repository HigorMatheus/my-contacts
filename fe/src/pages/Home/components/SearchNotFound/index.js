import PropTypes from 'prop-types';
import React from 'react';
import { images } from '../../../../assets/images';

import { Container } from './styles';

export function SearchNotFound({ searchTerm }) {
  return (
    <Container>
      <img src={images.magnifierQuestion} alt="magnifierQuestion" />
      <span>
        Nenhum resultado foi encontrado para
        <strong> ”{searchTerm}”</strong>.
      </span>
    </Container>
  );
}

SearchNotFound.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};
