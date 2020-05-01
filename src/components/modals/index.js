import React from 'react';
import { render } from 'react-dom';
import ModalDialog from './ModalDialog';

import ApolloClientProvider from '../../services/apollo-graphql';
import AuthContextProvider from '../../services/api-authentication';

export const showModal = ({
  onClose = () => {},
  renderTitle = () => {},
  renderContent = () => {},
  renderActions = () => {},
  width
}) => {
  const anchor = document.createElement('div');
  document.body.appendChild(anchor);

  const handleCloseModal = () => {
    onClose();
    document.body.removeChild(anchor);
  };

  render(
    <AuthContextProvider>
      <ApolloClientProvider>
        <ModalDialog
          width={width}
          onClose={handleCloseModal}
          renderTitle={() => renderTitle({ closeModal: handleCloseModal })}
          renderActions={() => renderActions({ closeModal: handleCloseModal })}
          renderContent={() => renderContent({ closeModal: handleCloseModal })}
        ></ModalDialog>
      </ApolloClientProvider>
    </AuthContextProvider>,
    anchor
  );
};
