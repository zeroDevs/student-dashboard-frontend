import { LOGIN, USER_PROFILE } from './types';

export const loginUser = (lData, handleRedirect) => dispatch => {
	fetch('http://54.213.184.110:5000/api/login', {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify(lData)
	})
		.then(res => res.json())
		.then(data => {
			console.log(data.loggedIn);
			if(data.loggedIn) {
				localStorage.setItem("token", JSON.stringify(data.token));
				dispatch({
					type: LOGIN,
					payload: data
				});
				handleRedirect('dashboard');
			} else {
				handleRedirect('login');
			}
		});
}

export const fetchProfile = (username, token) => dispatch => {
	const bearer = 'Bearer ' + token;
	fetch(`http://54.213.184.110:5000/api/${username}/profile`, {
		method: 'POST',
		headers: {
			'Authorization': bearer,
			'content-type': 'application/json'
		}
	})
		.then(res => res.json())
		.then(data => {
			dispatch({
				type: USER_PROFILE,
				payload: data
			})
		})
}