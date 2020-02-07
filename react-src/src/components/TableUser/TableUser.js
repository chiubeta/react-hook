import React, { useState, useEffect } from 'react';
import { Table } from 'semantic-ui-react';
import axios from 'axios';

import ModalUser from '../ModalUser/ModalUser';

const TableUser = (props) => {

  let [ users, setUsers ] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch data from the back-end
  const fetchUsers = () => {
    axios.get(`${props.server}/api/users/`)
    .then((response) => {
      setUsers(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  users = users.map((user) => 
    <Table.Row key={user._id}>
      <Table.Cell>{user.name}</Table.Cell>
      <Table.Cell>
        <ModalUser
          headerTitle='Edit Message'
          buttonTriggerTitle='Edit'
          buttonSubmitTitle='Save'
          buttonColor='blue'
          orderID={user.orderId}
          server={props.server}
          socket={props.socket}
        />
      </Table.Cell>
    </Table.Row>
  );

  return (
    <Table singleLine>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Actions</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {users}
      </Table.Body>
    </Table>
  );
}

export default TableUser;
