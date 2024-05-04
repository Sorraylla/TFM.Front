<template>
    <v-dialog v-model='show' class="d-flex" max-width="900px" :scrollable="false">
        <v-card >
            <v-card-title class="d-flex py-2 px-6">
                Nueva molécula
                <v-spacer></v-spacer>
                <!-- Botón para cerrar el diálogo -->

                <v-icon @click="show = false">mdi-close</v-icon>

            </v-card-title>
            <v-card-text class="py-0">
                <v-col cols="12" class="d-flex pa-0">
                    <v-col cols="5">
                        <v-select label="Select" v-model="selectedItem" :items="['SMILES', 'Archivo .mol']"></v-select>

                    </v-col>
                    <v-col cols="6">
                        <v-text-field v-model="smileText" v-if="selectedItem == 'SMILES'"></v-text-field>
                        <v-file-input v-model="file" v-if="selectedItem == 'Archivo .mol'"></v-file-input>
                    </v-col>
                    <v-col cols="1">

                        <v-btn :disabled="!selectedItem" color="secondary" @click="generateMolecule" class="py-2">
                            <font-awesome-icon icon="fa-solid fa-hammer" />

                        </v-btn>
                    </v-col>
                </v-col>

                <v-col cols="12" class="d-flex pa-0">
                    <v-col cols="5">
                        <div class="image-container">
                            <img :src="imageUrl" alt="..." />
                        </div>

                    </v-col>
                    <v-col cols="7" v-if="imageUrl">
                        <v-text-field label="Name" v-model="name"></v-text-field>
                        <v-text-field disabled>{{ smileText }}</v-text-field>
                        <v-text-field :value="formattedDate" @input="updateDate" disabled></v-text-field>

                    </v-col>

                </v-col>

            </v-card-text>
            <v-card-actions>
                <v-col cols="12" class="d-flex">
                    <v-spacer></v-spacer>
                    <v-btn flat variant="flat" color="secondary" @click="saveMoleculeInfo()">
                        <font-awesome-icon icon="fa-solid fa-atom" />
                        Guardar
                    </v-btn>
                </v-col>
            </v-card-actions>

        </v-card>
    </v-dialog>
</template>



<script>
import MoleculeServices from '@/services/MoleculeServices'
import DateFormatter from '@/utils/DateFormatter'
export default {
    data() {
        return {
            show: false,
            selectedItem: null,
            smileText: null,
            imageUrl: null,
            blobImg: null,
            file: null,
            dateCreation: null,
            name: ''
        }
    },
    methods: {
        open() {
            console.log("BBB")
            this.show = true
        },
        async generateMolecule() {
            this.dateCreation = new Date()
            if (this.selectedItem == 'SMILES') {
                const response = await MoleculeServices.getMoleculeSmiles(this.smileText)
                this.imageUrl = URL.createObjectURL(response);
                this.blobImg = response
                console.log(response)
                console.log(this.smileText)
                console.log(this.imageUrl)
            }
            if (this.selectedItem == 'Archivo .mol') {
                console.log(this.file[0])
                const response = await MoleculeServices.postMoleculeFile(this.file[0])
                this.imageUrl = URL.createObjectURL(response);
                this.blobImg = response
                console.log(this.imageUrl)
            }
        },
        async saveMoleculeInfo() {
            var reader = new FileReader();
            console.log("AAAAAA")
            console.log(this.imageUrl)
            reader.readAsDataURL(this.blobImg);
            const name = this.name
            const smiles = this.smileText
            console.log("PPPPP")
            console.log(this.dateCreation)
            const date = this.convertToMs(this.dateCreation)
            reader.onloadend = async () => {
                var base64data = reader.result;
                const data = {
                    "name": name,
                    "userId": 33,
                    "image": base64data,
                    "smiles": smiles,
                    "date": date
                }
                console.log(data)
                const result = await MoleculeServices.postMoleculeInfo(data)
                

                if(result){
                    console.log("((((((((((((()))))))))))))")
                console.log(result)
                    this.$emit('add', result);
                    this.close()
                }
                
            }


        },
        convertToMs(date) {
            return DateFormatter.convertToMs(date)
        },
        close(){
            this.show = false
            this.selectedItem =null,
            this.smileText = null,
            this.imageUrl = null,
            this.blobImg = null,
            this.file = null,
            this.name = ''
        },
        saveImage(base64String) {
            console.log(base64String)
        },
        updateDate(value) {
            this.dateCreation = new Date(value);
        }
    },
    computed: {
        formattedDate() {
            return DateFormatter.formatDate(this.dateCreation)

        }
    },
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