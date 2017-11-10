import fetch from 'isomorphic-fetch'
import { browserHistory } from 'react-router';

export function submitContactForm(name, email, tel, event, onSuccess) {
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_MESSAGES'
    });
    return fetch('/contact', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        email: email,
        tel: tel,
		event : event
      })
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          onSuccess();
        });
      } else {
        return response.json().then((json) => {
          dispatch({
            type: 'CONTACT_FORM_FAILURE',
            messages: Array.isArray(json) ? json : [json]
          });
        });
      }
    });
  };
}
