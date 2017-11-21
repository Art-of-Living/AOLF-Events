import fetch from 'isomorphic-fetch'
import { browserHistory } from 'react-router';

export function submitContactForm(name, email, tel, event, onSuccess, onError) {
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
		  var json = Array.isArray(json) ? json : [json];
          onError(json);
        });
      }
    });
  };
}
