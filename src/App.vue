<template>
	<Header />
	<main class="main">
		<Sidebar />
		<Content />
	</main>
</template>

<script>
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';
import Content from '@/components/Content.vue';

export default {
	components: {
		Header,
		Sidebar,
		Content,
	},
};
</script>

<style lang="scss">
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

body {
	font-family: 'Montserrat';
}

#app {
	margin: 0 auto;
	width: 1266px;
}

.main {
	display: flex;
	width: 100%;
	box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
	border-radius: 10px;
}
</style>
