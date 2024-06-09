<template>
	<div>
		
		<v-tabs v-model="tab" color="secondary">
			<v-tab v-for="item in items" :key="item.tab" >
				{{ item.tab }}
			</v-tab>
		</v-tabs>
		<v-tabs-items v-model="tab">
			<v-tab-item v-for="(item, idx) in items" :key="item.tab">

				<!-- Renderiza solo el componente correspondiente a la pestaña activa -->
				<component v-if="tab === idx" :is="item.component"></component>

			</v-tab-item>
		</v-tabs-items>
	</div>
</template>

<script>
import Molecules from '@/views/dashboard/molecules/Molecules';
import Substructures from '@/views/dashboard/substructures/Substructures'
import Others from './Others.vue';

export default {
	components: { Molecules, Substructures, Others },
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
