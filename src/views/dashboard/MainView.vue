<template>
	<div>
		<Molecules></Molecules>
		
		<!-- <v-tabs v-model="tab" color="secondary">
			<v-tab v-for="item in items" :key="item.tab" >
				{{ item.tab }}
			</v-tab>
		</v-tabs>
		<v-tabs-items v-model="tab">
			<v-tab-item v-for="(item, idx) in items" :key="item.tab">

				<component v-if="tab === idx" :is="item.component"></component>

			</v-tab-item>
		</v-tabs-items> -->
	</div>
</template>

<script>
import Molecules from '@/views/dashboard/molecules/Molecules';

export default {
	components: { Molecules },
	data() {
		return {
			tab: null,
			moleculesInfo: [],
			items: [
				{ tab: 'Molecules', component: 'Molecules' }


			]
		};
	},
	
}
</script>
