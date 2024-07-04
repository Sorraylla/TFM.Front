<template>
    <v-dialog v-model="show" class="d-flex" max-width="1000px" :scrollable="false">
        <v-card min-height="600px">
            <v-card-title class="d-flex py-2 px-6">
                Descriptores
                <v-spacer></v-spacer>
                <v-icon @click="close">mdi-close</v-icon>
            </v-card-title>
            <v-card-text class="py-0">
                <v-col cols="12" class="d-flex pa-0">
                    <v-col cols="11">
                        <v-text-field v-model="smileText" hide-details></v-text-field>
                    </v-col>
                    <v-col cols="1">
                        <v-btn color="secondary" @click="generateDescriptors" class="py-2 fill-height">
                            <font-awesome-icon icon="fa-solid fa-hammer" />
                        </v-btn>
                    </v-col>
                </v-col>

                <v-col v-if="moleculeData" cols="12" class="d-flex pa-4">
                    <v-spacer></v-spacer>
                    <v-col cols="6" class="pa-0">
                        <v-data-table
                        :headers="headers"
                            :items="tableData"
                            :items-per-page="5"
                            class="elevation-1"
                        ></v-data-table>
                    </v-col>
                    <v-spacer></v-spacer>
                </v-col>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import DescriptorServices from '@/services/DescriptorServices'
export default {
    data() {
        return {
            show: false,
            smileText: '',
            moleculeData: null
        }
    },
    methods: {
        open() {
            this.show = true
        },
        close() {
            this.show = false
            this.smileText = ''
            this.moleculeData = null
        },
        async generateDescriptors() {
            const result = await DescriptorServices.getDescriptors(this.smileText)
            if (result) {
                this.moleculeData = result
            }
        }
    },
    computed: {
        tableData() {
            if (!this.moleculeData) return [];
            return Object.entries(this.moleculeData).map(([property, value]) => ({ property, value }));
        },
        headers() {
            return [
                { title: 'Propiedad', value: 'property', align: 'center' },
                { title: 'Valor', value: 'value', align: 'center' },
            ];
        },
    },
}
</script>

<style scoped>
.elevation-1 {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
</style>
