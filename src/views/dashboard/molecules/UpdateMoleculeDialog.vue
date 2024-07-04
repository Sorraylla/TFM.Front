<template>
    <v-dialog v-model='show' class="d-flex" max-width="900px" :scrollable="false">      
        <v-card>    
            <v-card-title class="d-flex py-2 px-6">
                Actualizar molecula
                <v-spacer></v-spacer>
                <!-- Botón para cerrar el diálogo -->

                <v-icon @click="close">mdi-close</v-icon>
            </v-card-title>


            <v-card-text class="py-0">

                <v-col cols="12" class="d-flex pa-0">
                    <v-col cols="5">
                        <div class="image-container">
                            <img :src="mol.image" alt="..." />
                        </div>

                    </v-col>
                    <v-col cols="7">
                        <v-text-field label="Name" v-model="mol.name"></v-text-field>
                        <v-text-field disabled>{{ mol.smiles }}</v-text-field>
                        <v-text-field :value="formattedDate" @input="updateDate" disabled></v-text-field>

                    </v-col>

                </v-col>

            </v-card-text>
            <v-card-actions>
                <v-col cols="12" class="d-flex">
                    <v-spacer></v-spacer>
                    <v-btn flat variant="flat" color="secondary" @click="updateMolecule()">
                        <font-awesome-icon icon="fa-solid fa-atom" />
                        Actualizar
                    </v-btn>
                </v-col>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>


<script>
import DateFormatter from '@/utils/DateFormatter'
import MoleculeServices from '@/services/MoleculeServices'

export default {
    data() {
        return {
            mol: null,
            show: false,
            dateCreation: null
        }
    },

    methods: {
        open(mol){
            this.mol = mol
            this.dateCreation = new Date()
            this.show = true
        },
        close() {
            this.show = false
        },
        updateDate(value) {
            this.dateCreation = new Date(value);
        },
        convertToMs(date) {
            return DateFormatter.convertToMs(date)
        },
        async updateMolecule(){
            this.dateCreation = new Date()
            this.mol.date = this.convertToMs(this.dateCreation)

            const response = await MoleculeServices.updateMolecule(this.mol)
            if (response){
                this.$emit('update', this.mol)
                this.close()
            }
        }
    },
    computed: {
        formattedDate() {
            return DateFormatter.formatDate(this.dateCreation)

        }
    },
}

</script>