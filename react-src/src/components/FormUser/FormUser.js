import React, { useState, useEffect } from 'react';
import { Message, Button, Form } from 'semantic-ui-react';
import axios from 'axios';

const FormUser = (props) => {

  const [ message, setMessage ] = useState('');
  const [ formClassName, setFormClassName ] = useState('');
  const [ formSuccessMessage, setFormSuccessMessage ] = useState('');
  const [ formErrorMessage, setFormErrorMessage ] = useState('');

  useEffect(() => {
    // Fill in the form with the appropriate data if message id is provided
    if (props.orderID) {
      axios.get(`${props.server}/api/message/${props.orderID}`)
      .then((response) => {
        if(response.data.length > 0) {
          setMessage(response.data[0].message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, []);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  }

  const handleSubmit = (e) => {
    // Prevent browser refresh
    e.preventDefault();

    const order = {
      orderId: props.orderID,
      message: message
    }

    axios({
      method: 'post',
      responseType: 'json',
      url: `${props.server}/api/message/${props.orderID}`,
      data: order
    })
    .then((response) => {
      setFormClassName('success');
      setFormSuccessMessage(response.data.msg);

      props.socket.emit('update', response.data.result);
      
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.data) {
          setFormClassName('warning');
          setFormErrorMessage(err.response.data.msg);
        }
      }
      else {
        setFormClassName('warning');
        setFormErrorMessage('Something went wrong. ' + err);
      }
    });
  }

  return (
    <Form className={formClassName} onSubmit={handleSubmit}>
      <Form.Input
        label='Message'
        type='text'
        placeholder='Message'
        name='message'
        required
        value={message || ''}
        onChange={handleInputChange}
      />
      <Message
        success
        color='green'
        header='Nice one!'
        content={formSuccessMessage}
      />
      <Message
        warning
        color='yellow'
        header='Woah!'
        content={formErrorMessage}
      />
      <Button color={props.buttonColor} floated='right'>{props.buttonSubmitTitle}</Button>
      <br /><br />
    </Form>
  );
}

export default FormUser;
