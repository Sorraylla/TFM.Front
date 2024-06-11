<template>
    <v-dialog v-model='show' class="d-flex" max-width="900px" :scrollable="false">
        <v-card>
            <v-card-title class="d-flex py-2 px-6">
                Buscar subestructuras
                <v-spacer></v-spacer>
                <!-- Botón para cerrar el diálogo -->

                <v-icon @click="show = false">mdi-close</v-icon>

            </v-card-title>
            <v-card-text class="py-0">
                <v-col cols="12" class="d-flex pa-0">
                    <v-col cols="5">
                        <v-select label="Molécula" v-model="typeMol" :items="types"></v-select>

                    </v-col>
                    <v-col cols="7">
                        <v-text-field v-model="mol"></v-text-field>
                    </v-col>
                </v-col>

                <v-col cols="12" class="d-flex pa-0">
                    <v-col cols="5">
                        <v-select label="Subestructura" v-model="typeSub" :items="types"></v-select>

                    </v-col>
                    <v-col cols="7">
                        <v-text-field v-model="sub"></v-text-field>
                    </v-col>
                    <!--
                    <v-col cols="3">
                        <v-switch label="Quiralidad"></v-switch>
                    </v-col>
                    -->

                    
                </v-col>
                <v-col cols="12" class="text-right">
                        <v-btn  color="secondary" @click="searchSubstructure" class="py-2">
                            <font-awesome-icon icon="fa-solid fa-hammer" />

                        </v-btn>
                </v-col>
                <v-col cols="12" class="container">
                    <span  v-if="arraySub.length >0">
                        Resultado: {{ arraySub }}
                    </span>
                </v-col>



            </v-card-text>

        </v-card>
    </v-dialog>
</template>


<script>
import SearchSubstructureService from '@/services/SearchSubstructuresServices'
export default {
    data() {
        return {
            show: false,
            types: ['SMARTS', 'SMILES'],
            typeMol: null,
            mol: '',
            typeSub: null,
            sub: '',
            arraySub:[]
        }
    },
    methods: {
        open() {
            this.show = true
        },
        close() {
            this.show = false
        },
        async searchSubstructure(){
            const response = await SearchSubstructureService.searchSubstructure(this.typeMol, this.mol, this.typeSub, this.sub)
            console.log(response)
            this.arraySub = response
        }
    }
}
</script>


<style scoped>
.container {
    height: 100px;
}
</style>