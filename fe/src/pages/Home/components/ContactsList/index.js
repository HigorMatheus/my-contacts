import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { icons } from '../../../../assets/images';

import { Card, ListHeader } from './styles';

export function ContactsList({
  filteredContacts,
  orderBy,
  onToggleOrderBy,
  onDeleteContact,
}) {
  return (
    <>
      {filteredContacts.length > 0 && (
        <ListHeader orderBy={orderBy}>
          <button type="button" onClick={onToggleOrderBy}>
            <span>Nome</span> <img src={icons.arrow} alt="" srcSet="" />
          </button>
        </ListHeader>
      )}
      {filteredContacts.map((contact) => (
        <Card key={contact.id}>
          <div className="info">
            <div className="contact-name">
              <strong>{contact.name}</strong>
              {contact.category.name && <small>{contact.category.name}</small>}
            </div>
            <span>{contact.email}</span>
            <span>{contact.phone}</span>
          </div>
          <div className="actions">
            <Link to={`/edit/${contact.id}`}>
              <img src={icons.edit} alt="" />
            </Link>
            <button type="button" onClick={() => onDeleteContact(contact)}>
              <img src={icons.trash} alt="" />
            </button>
          </div>
        </Card>
      ))}
    </>
  );
}

ContactsList.propTypes = {
  filteredContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string,
      phone: PropTypes.string,
      category: PropTypes.shape({
        name: PropTypes.string,
      }),
    }),
  ).isRequired,
  orderBy: PropTypes.string.isRequired,
  onToggleOrderBy: PropTypes.func.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
