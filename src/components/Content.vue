<template>
	<div class="content">
		<p v-if="!currentUser.id" class="content__hint">
			Выберите сотрудника, чтобы посмотреть его профиль
		</p>
		<div v-else class="user-details">
			<img
				class="user-details__photo"
				src=""
				alt=""
				@error="photoPlaceholder"
			/>
			<div class="user-description">
				<h2 class="user-description__heading">{{ currentUser.name }}</h2>
				<p class="user-description__text">
					<span class="user-description__caption">email: </span
					>{{ currentUser.email }}
				</p>
				<p class="user-description__text">
					<span class="user-description__caption">phone: </span
					>{{ currentUser.phone }}
				</p>
				<p class="user-description__about">О себе:</p>
				<p class="user-description__text">
					<LoremIpsum :key="currentUser.id" add="50-80w" />
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import LoremIpsum from 'vue-lorem-ipsum';
import placeholderImg from '../assets/placeholder-image.png';

export default {
	components: {
		LoremIpsum,
	},
	methods: {
		photoPlaceholder(e) {
			e.target.src = placeholderImg;
		},
	},
	computed: {
		...mapState({
			currentUser: (state) => state.currentUser,
		}),
	},
};
</script>

<style lang="scss" scoped>
.content {
	padding: 30px 25px;
	display: flex;
	min-width: 975px;
	min-height: 575px;
	background: #ffffff;
	border-radius: 0px 10px 10px 0px;

	&__hint {
		margin: auto;
		font-style: normal;
		font-weight: 400;
		font-size: 14px;
		line-height: 17px;
		color: #76787d;
	}
}

.user-details {
	display: flex;
	gap: 61px;

	&__photo {
		width: 424px;
		height: 286px;
		border: 1px solid #e0e0e0;
	}
}

.user-description {
	display: flex;
	flex-direction: column;

	&__heading {
		font-weight: 600;
		font-size: 16px;
		line-height: 140%;
		color: #000;
	}

	&__text {
		margin-top: 10px;
		font-weight: 400;
		font-size: 14px;
		line-height: 17px;
		color: #76787d;
	}

	&__caption {
		font-weight: 600;
		font-size: 14px;
		line-height: 140%;
		color: #333333;
	}

	&__about {
		margin: 20px 0 25px 0;
		font-weight: 600;
		font-size: 16px;
		line-height: 140%;
		color: #333333;
	}
}
</style>
