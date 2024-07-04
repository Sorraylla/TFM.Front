<template>
    <v-dialog v-model='show' class="d-flex" max-width="900px" :scrollable="false">
        <v-card min-height="600px">
            <v-card-title class="d-flex pa-6" color="red">
                Conversión de tipos
                <v-spacer></v-spacer>
                <!-- Botón para cerrar el diálogo -->

                <v-icon @click="show = false">mdi-close</v-icon>

            </v-card-title>
            <v-card-text class="py-0">
                <v-col cols="12" class="d-flex pa-0">
                    <v-col cols="6" class="py-0">
                        <v-select label="De" v-model="from_type" :items="types">
                        </v-select>
                    </v-col>
                    <v-col cols="6" class="py-0">
                        <v-select label="A" v-model="to_type" :items="types"></v-select>
                    </v-col>
                </v-col>
                <v-col class="12">
                    <v-textarea v-model="value">

                    </v-textarea>
                </v-col>
                <v-col cols="12" class="text-right">
                    <v-btn color="secondary" @click="convert" class="py-2 fill-height">
                        <font-awesome-icon icon="fa-solid fa-hammer" />

                    </v-btn>
                </v-col>

                <v-col cols="12" class="container">
                    <span v-if="result">
                        Resultado:<br />

                        <v-textarea v-model="result">

                        </v-textarea>
                    </span>
                </v-col>

            </v-card-text>

        </v-card>
    </v-dialog>
</template>



<script>
import ConvertServices from '@/services/ConvertServices'
export default {
    data() {
        return {
            show: false,
            from_type: null,
            to_type: null,
            types: [
                'SMILES', 'MolBlock', 'Inchi', 'SMARTS'
            ],
            value: '',
            result: null
        }
    },
    methods: {
        open() {
            console.log("BBB")
            this.show = true
        },
        async convert() {
            const data = {
                "from_type": this.from_type,
                "to_type": this.to_type,
                "value": this.value
            }
            const result = await ConvertServices.convert(data)
            console.log(result)
            this.result = result
        }

    }
}
</script>



<style>
.image-container {
    width: 100%;
    /* El ancho se adapta al contenedor padre */
    height: 300px;
    /* Altura fija para reservar espacio */
    background-color: #f6f6f6;
    /* Color de fondo para cuando no hay imagen */
    display: flex;
    justify-content: center;
    align-items: center;
}

.image-container img {
    max-width: 100%;
    /* La imagen no supera el ancho del contenedor */
    max-height: 100%;
    /* La imagen no supera la altura del contenedor */
    object-fit: cover;
    /* La imagen cubre completamente el espacio reservado */
}
</style>

<style scoped>
.container {
    height: 200px;
}
</style>