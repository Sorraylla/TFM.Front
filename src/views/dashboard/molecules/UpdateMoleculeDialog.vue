<template>
    <v-dialog v-model='show' class="d-flex" max-width="900px" :scrollable="false">      
        <v-card>    
            <v-card-title class="d-flex py-2 px-6">
                Actualizar molecula
                <v-spacer></v-spacer>
                <!-- Botón para cerrar el diálogo -->

                <v-icon @click="close">mdi-close</v-icon>
            </v-card-title>
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
        close() {
            this.$emit('close')
        }
    }
}