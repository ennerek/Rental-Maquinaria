import React from 'react';
import {
  EmailSubscribe,
  EmailTextInput,
  SubmitButton,
} from '@mui-treasury/components/EmailSubscribe';
import { useReadyEmailSubscribeStyles } from '@mui-treasury/styles/emailSubscribe/ready';
import { updateRolUser } from '../Services/users';
import { useNavigate } from 'react-router-dom'

export const ReadyEmailSubscribeStyle = React.memo(
  function ReadyEmailSubscribe() {

    const navigate = useNavigate();

  

    return (
      <EmailSubscribe
        onSubmit={email => {
            const token = localStorage.getItem('token');
            updateRolUser(token).then( res => {
                console.log(res.msg)
                navigate('/login')
            })
        }}
        useStyles={useReadyEmailSubscribeStyles}
        inputClearedAfterSubmit
      >
        <EmailTextInput placeholder="Enter your email" />
        <SubmitButton>Subscribe</SubmitButton>
    </EmailSubscribe>
    );
  }
);