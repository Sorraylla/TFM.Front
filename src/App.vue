<template>
	<v-app style=" background-color: #eae9f1;">
		<Header/>
		<v-main>
			<router-view />
		</v-main>
	</v-app>
</template>

<script>
import Header from './components/Header.vue';
export default {
	name: "App",
	components: {Header},
	data: () => ({
		//
	}),
};
</script>

<style>
body {
    background-color: #eae9f1; 
}
</style>
