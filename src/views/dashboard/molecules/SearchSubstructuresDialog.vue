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
                    <v-col cols="2">
                        <v-select label="Select" v-model="selectedItem"
                            :items="['Mis moléculas', 'SMART', 'SMILES']"></v-select>

                    </v-col>
                    <v-col cols="10">
                        <v-text-field v-model="smileText"></v-text-field>
                    </v-col>
                </v-col>

                <v-col cols="12" class="d-flex pa-0">
                    <v-col cols="2">
                        <v-select label="Select" v-model="selectedItem"
                            :items="[ 'SMART', 'SMILES']"></v-select>

                    </v-col>
                    <v-col cols="5">
                        <v-text-field v-model="smileText"></v-text-field>
                    </v-col>
                    <v-col cols="3">
                        <v-switch label="Quiralidad"></v-switch>
                    </v-col>
                    <v-col cols="2" class="text-right">
                        <v-btn :disabled="!selectedItem" color="secondary" @click="generateMolecule" class="py-2">
                            <font-awesome-icon icon="fa-solid fa-hammer" />

                        </v-btn>
                    </v-col>
                </v-col>



            </v-card-text>

        </v-card>
    </v-dialog>
</template>


<script>
export default {
    data() {
        return {
            show: false
        }
    },
    methods: {
        open() {
            this.show = true
        },
        close() {
            this.show = false
        }
    }
}
</script>