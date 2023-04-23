import { createStore } from 'vuex';

export default createStore({
	state: {
		users: [],
		isLoading: false,
		error: '',
		searchQuery: '',
		currentUser: {},
	},
	mutations: {
		setLoading(state, bool) {
			state.isLoading = bool;
		},
		setError(state, error) {
			state.error = error;
		},
		setUsers(state, users) {
			state.users = users;
		},
		setCurrentUser(state, currentUser) {
			state.currentUser =
				state.users.find(({ username }) => username === currentUser) || {};
		},
		setSearchQuery(state, searchQuery) {
			state.searchQuery = searchQuery
				.trim()
				.split(/\s+|,\s+|;\s+|,+|;+/)
				.map(
					(el) =>
						el &&
						(Number.isNaN(+el)
							? `username=${el[0].toUpperCase() + el.slice(1).toLowerCase()}`
							: `id=${el}`)
				)
				.join('&');
		},
	},
	actions: {
		getUsers({ state, commit }) {
			commit('setLoading', true);
			commit('setCurrentUser', '');
			fetch(`https://jsonplaceholder.typicode.com/users?${state.searchQuery}`)
				.then((res) =>
					res.ok
						? res.json()
						: Promise.reject(`Ошибка: ${res.status + ' - ' + res.statusText}`)
				)
				.then((data) => commit('setUsers', data))
				.catch((err) => commit('setError', err))
				.finally(() => commit('setLoading', false));
			commit('setSearchQuery', '');
		},
	},
});
