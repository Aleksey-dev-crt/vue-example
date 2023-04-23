<template>
	<ul class="user-list">
		<li
			class="user"
			@click="userClickHandler"
			v-for="{ id, username, email } in users"
			:key="id"
		>
			<img class="user__photo" src="" alt="" @error="photoPlaceholder" />
			<div class="user__description" :class="{ active: currentUser.id === id }">
				<p class="user__description-name">{{ username }}</p>
				<p class="user__description-email">{{ email }}</p>
			</div>
		</li>
	</ul>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import placeholderImg from '../assets/placeholder-image.png';

export default {
	methods: {
		...mapMutations({
			setCurrentUser: 'setCurrentUser',
		}),
		photoPlaceholder(e) {
			e.target.src = placeholderImg;
		},
		userClickHandler(e) {
			const currentUser = e.currentTarget.lastChild.firstChild.textContent;
			this.$store.commit('setCurrentUser', currentUser);
		},
	},
	computed: {
		...mapState({
			users: (state) => state.users,
			currentUser: (state) => state.currentUser,
		}),
	},
};
</script>

<style lang="scss" scoped>
.user-list {
	display: flex;
	flex-direction: column;
	gap: 18px;
	overflow-y: scroll;
}

.user-list::-webkit-scrollbar {
	display: none;
}

.user-list {
	scrollbar-width: none;
}

.user {
	all: unset;
	display: flex;
	background: #ffffff;

	&__photo {
		width: 70px;
		height: 70px;
		border-radius: 10px 0 0 10px;
		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
		border-right: 1px solid #e0e0e0;
		object-fit: cover;
	}
	&__description {
		width: 100%;
		border-radius: 0 10px 10px 0;
		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
		padding: 15px;
		overflow: hidden;
	}

	&__description-name {
		font-style: normal;
		font-weight: 600;
		font-size: 14px;
		line-height: 17px;
		color: #333333;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	&__description-email {
		font-style: normal;
		font-weight: 400;
		font-size: 14px;
		line-height: 17px;
		color: #76787d;
		overflow: hidden;
		text-overflow: ellipsis;
	}
}

.active {
	background-color: #e0e0e0;
}

.user:hover {
	cursor: pointer;
}
</style>
