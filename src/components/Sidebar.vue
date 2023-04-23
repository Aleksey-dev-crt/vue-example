<template>
	<div class="sidebar">
		<h2 class="sidebar__search-title">Поиск сотрудников</h2>
		<input
			:value="searchQuery"
			@keyup="inputHandler"
			class="sidebar__search-input"
			type="text"
			placeholder="Введите id или имя"
		/>
		<div class="sidebar__results">
			<h3 class="sidebar__results-heading">Результаты</h3>
			<p
				v-if="!users.length && !isLoading && !error"
				class="sidebar__results-hint"
			>
				Начните поиск
			</p>
			<Preloader v-else-if="isLoading" color="#e31f24" scale="0.2" />
			<p v-else-if="error" class="sidebar__results-error">{{ error }}</p>
			<UserList v-else />
		</div>
	</div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import placeholderImg from '@/assets/placeholder-image.png';
import Preloader from '@/components/Preloader.vue';
import UserList from '@/components/UserList.vue';

export default {
	components: {
		UserList,
		Preloader,
	},
	methods: {
		...mapMutations({
			setUsers: 'setUsers',
			setSearchQuery: 'setSearchQuery',
		}),
		...mapActions({
			getUsers: 'getUsers',
		}),

		photoPlaceholder(e) {
			e.target.src = placeholderImg;
		},

		inputHandler(e) {
			if (e.key === 'Enter' && e.target.value) {
				this.$store.commit('setSearchQuery', e.target.value);
				this.getUsers();
			}
		},
	},
	computed: {
		...mapState({
			users: (state) => state.users,
			searchQuery: (state) => state.searchQuery,
			isLoading: (state) => state.isLoading,
			error: (state) => state.error,
		}),
	},
};
</script>

<style lang="scss" scoped>
.sidebar {
	display: flex;
	flex-direction: column;
	gap: 22px;
	padding: 27px 26px 27px 20px;
	min-width: 291px;
	background: #fdfdfd;
	border-right: 1px solid #dededd;

	&__search-title {
		font-weight: 600;
		font-size: 16px;
		line-height: 140%;
		color: #333333;
	}

	&__search-input {
		padding: 16px;
		background: #ffffff;
		border: 1.5px solid #e9ecef;
		border-radius: 8px;
	}

	&__search-input::placeholder {
		font-weight: 400;
		font-size: 14px;
		line-height: 17px;
		color: #76787d;
	}

	&__results {
		max-height: 405px;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	&__results-heading {
		font-weight: 600;
		font-size: 16px;
		line-height: 140%;
		color: #333333;
	}

	&__results-hint {
		font-weight: 400;
		font-size: 14px;
		line-height: 17px;
		color: #76787d;
	}

	&__results-error {
		font-weight: 400;
		font-size: 14px;
		line-height: 17px;
		color: #e31f24;
	}
}
</style>
