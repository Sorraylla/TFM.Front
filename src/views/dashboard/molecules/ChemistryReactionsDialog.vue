<template>
    <v-dialog v-model="show" class="d-flex" max-width="1000px" :scrollable="false">
        <v-card>
            <v-card-title class="d-flex py-2 px-6">
                Reacciones químicas
                <v-spacer></v-spacer>
                <v-icon @click="close">mdi-close</v-icon>
            </v-card-title>
            <v-card-text class="py-0">
                <v-col cols="12" class="d-flex pa-0">
                    <v-col cols="11">
                        <v-text-field label="Reacción" v-model="reaction" hide-details></v-text-field>
                    </v-col>
                    <v-col cols="1">
                        <v-btn color="secondary" @click="generateImage" class="py-2 fill-height">
                            <font-awesome-icon icon="fa-solid fa-hammer" />
                        </v-btn>
                    </v-col>
                </v-col>
                <v-col cols="12" class="d-flex pa-0">
                    <v-col cols="12">
                        <div class="image-container2">
                            <img :src="imageUrl" alt="..." />
                        </div>

                    </v-col>
                </v-col>

                
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import ChemistryReactionServices from '@/services/ChemistryReactionsServices'


export default {
    data() {
        return {
            show: false,
            reaction: '',
            blobImg: null,
            imageUrl: null
        }
    },
    methods: {
        open() {
            this.show = true
        },
        close() {
            this.show = false
            this.reaction = ''
        },
        async generateImage() {
            const response = await ChemistryReactionServices.getReactionImage(this.reaction)
            if (response) {
                this.imageUrl = URL.createObjectURL(response);
                this.blobImg = response
            }
        }
    }
}
</script>

<style scoped>
.image-container2 {
    width: 100%;
    /* El ancho se adapta al contenedor padre */
    height: 340px;
    /* Altura fija para reservar espacio */
    background-color: #f6f6f6;
    /* Color de fondo para cuando no hay imagen */
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>