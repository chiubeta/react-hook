import React from 'react';
import { Button, Modal } from 'semantic-ui-react';

import FormUser from '../FormUser/FormUser';

const ModalUser = (props) => {

  return (
    <Modal
      trigger={<Button color={props.buttonColor}>{props.buttonTriggerTitle}</Button>}
      dimmer='inverted'
      size='tiny'
      closeIcon='close'
    >
      <Modal.Header>{props.headerTitle}</Modal.Header>
      <Modal.Content>
        <FormUser
          buttonSubmitTitle={props.buttonSubmitTitle}
          buttonColor={props.buttonColor}
          orderID={props.orderID}
          onUserAdded={props.onUserAdded}
          server={props.server}
          socket={props.socket}
        />
      </Modal.Content>
    </Modal>
  );
}

export default ModalUser;
