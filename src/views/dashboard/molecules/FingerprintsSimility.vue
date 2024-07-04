<template><v-dialog v-model="show" class="d-flex" max-width="1000px" :scrollable="false">
        <v-card>
            <v-card-title class="d-flex py-2 px-6">
                Fingerprints y Similitud
                <v-spacer></v-spacer>
                <v-icon @click="close">mdi-close</v-icon>
            </v-card-title>
            <v-card-text class="py-0">
                <v-col cols="12" class="d-flex pa-0">
                    <v-col cols="12">
                        <v-text-field label="SMILES" v-model="smiles1" hide-details></v-text-field>
                    </v-col>
                </v-col>
                <v-col cols="12" class="d-flex pa-0">
                    <v-col cols="12">
                        <v-text-field label="SMILES" v-model="smiles2" hide-details></v-text-field>
                    </v-col>
                </v-col>



                <v-col cols="12" class="d-flex pa-0">
                    <v-col cols="5">
                        <v-select label="Tipo de fingerprint" v-model="fp_type" :items="fp_type_values">
                        </v-select>
                    </v-col>
                    <v-col cols="2">
                        <v-text-field v-if="fp_type == 'morgan'" label="Radio" v-model="radius"
                            hide-details></v-text-field>
                    </v-col>
                    <v-col cols="5">
                        <v-select label="Métrica" v-model="metric" :items="metric_values">
                        </v-select>
                    </v-col>
                </v-col>
                <v-col cols="12" class="d-flex">
                    <v-spacer></v-spacer>
                    <v-btn color="secondary" @click="calculateSimilarity" class="py-2 fill-height">
                        <font-awesome-icon icon="fa-solid fa-hammer" />

                    </v-btn>
                </v-col>
                <v-col cols="12" class="container">
                    <span v-if="similarity">Similitud: {{ similarity }}</span>

                </v-col>
            </v-card-text>
        </v-card>
    </v-dialog>

</template>


<script>
import FingerprintServices from '@/services/FingerprintsServices'
export default {
    data() {
        return {
            show: false,
            smiles1: '',
            smiles2: '',
            fp_type: '',
            metric: '',
            radius: 2,
            fp_type_values: ['morgan', 'topological'],
            metric_values: ['tanimoto', 'dice'],
            similarity: null


        }
    },
    methods: {
        open() {
            this.show = true
        },
        close() {
            this.show = false
            this.smiles1 = ''
            this.smiles2 = ''
            this.fp_type = ''
            this.metric = ''
            this.radius = 2
            this.similarity = null
        },
        async calculateSimilarity() {
            const result = await FingerprintServices.calculateSimilarity(this.smiles1, this.smiles2, this.fp_type, this.metric, this.radius)
            console.log(result)
            if (result) {
                this.similarity = result

            }
        }

    }
}


</script>

<style scoped>
.container {
    height: 100px;
}
</style>