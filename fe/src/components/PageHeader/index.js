import { Link } from 'react-router-dom';
import PropsTypes from 'prop-types';
import { icons } from '../../assets/images/icons';
import { Container } from './styles';

function PageHeader({ title }) {
  return (
    <Container>
      <Link to="/">
        <img src={icons.arrow} alt="Back" />
        <span>Voltar</span>
      </Link>
      <h1>{title}</h1>
    </Container>
  );
}
PageHeader.propTypes = {
  title: PropsTypes.string.isRequired,
};
export default PageHeader;
