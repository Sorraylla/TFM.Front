<template>
    <v-dialog v-model='show' class="d-flex" max-width="900px" min-height="500px" :scrollable="false">
        <v-card min-height="700px">
            <v-card-title class="d-flex py-2 px-6">
                Transformaciones químicas
                <v-spacer></v-spacer>
                <!-- Botón para cerrar el diálogo -->

                <v-icon @click="close">mdi-close</v-icon>

            </v-card-title>
            <v-card-text class="py-0">
                <v-col cols="12" class="d-flex pa-0">
                    <v-radio-group inline v-model="type" @change="clear">
                        <v-radio label="Eliminar subestructuras" value="removeSub"></v-radio>
                        <v-radio label="Sustituir substructuras" value="replaceSub"></v-radio>
                        <v-radio label="Eliminar cadenas laterales" value="removeChains"></v-radio>
                        <v-radio label="Eliminar núcleos" value="removeCore"></v-radio>

                    </v-radio-group>
                </v-col>
                <div v-if="type == 'removeSub'">
                    <v-col cols="12" class="d-flex pa-0">
                        <v-col cols="5" class="py-0">
                            <v-select label="Molécula base" v-model="baseType" :items="types">
                            </v-select>
                        </v-col>
                        <v-col cols="7" class="py-0">
                            <v-text-field v-model="mol"></v-text-field>
                        </v-col>
                    </v-col>
                    <v-col cols="12" class="d-flex pa-0">
                        <v-col cols="5" class="py-0">
                            <v-select label="Subestructura" v-model="subType" :items="types">
                            </v-select>
                        </v-col>
                        <v-col cols="7" class="py-0">
                            <v-text-field v-model="sub"></v-text-field>
                        </v-col>
                    </v-col>
                </div>



                <div v-if="type == 'replaceSub'">
                    <v-col cols="12" class="d-flex pa-0">
                        <v-col cols="5" class="py-0">
                            <v-select label="Molécula base" v-model="baseType" :items="types">
                            </v-select>
                        </v-col>
                        <v-col cols="7" class="py-0">
                            <v-text-field v-model="mol"></v-text-field>
                        </v-col>
                    </v-col>
                    <v-col cols="12" class="d-flex pa-0">
                        <v-col cols="5" class="py-0">
                            <v-select label="Cadena a reemplazar" v-model="pattType" :items="types">
                            </v-select>
                        </v-col>
                        <v-col cols="7" class="py-0">
                            <v-text-field v-model="patt"></v-text-field>
                        </v-col>
                    </v-col>
                    <v-col cols="12" class="d-flex pa-0">
                        <v-col cols="5" class="py-0">
                            <v-select label="Cadena de reemplazo" v-model="replType" :items="types">
                            </v-select>
                        </v-col>
                        <v-col cols="7" class="py-0">
                            <v-text-field v-model="repl"></v-text-field>
                        </v-col>
                    </v-col>
                </div>



                <div v-if="type == 'removeChains' || type == 'removeCore'">
                    <v-col cols="12" class="d-flex pa-0">
                        <v-col cols="5" class="py-0">
                            <v-select label="Molécula base" v-model="baseType" :items="types">
                            </v-select>
                        </v-col>
                        <v-col cols="7" class="py-0">
                            <v-text-field v-model="mol"></v-text-field>
                        </v-col>
                    </v-col>
                    <v-col cols="12" class="d-flex pa-0">
                        <v-col cols="5" class="py-0">
                            <v-select label="Cadena a eliminar" v-model="coreType" :items="types">
                            </v-select>
                        </v-col>
                        <v-col cols="7" class="py-0">
                            <v-text-field v-model="core"></v-text-field>
                        </v-col>
                    </v-col>
                </div>
                <div v-if="type">
                    <v-col cols="12" class="text-right">
                        <v-btn  color="secondary" @click="chemistryTransformation" class="py-2">
                            <font-awesome-icon icon="fa-solid fa-hammer" />

                        </v-btn>
                    </v-col>
                </div>
                <v-col v-if="type" cols="12">
                        <div class="image-container">
                            <img :src="imageUrl" alt="..." />
                        </div>

                    </v-col>

            </v-card-text>
        </v-card>

    </v-dialog>
</template>



<script>
import ChemistryTransformationServices from '@/services/ChemistryTransformationServices'
export default {
    data() {
        return {
            show: false,
            type: null,
            imageUrl: null,
            types: ['SMARTS', 'SMILES'],
            baseType: null,
            mol: '',
            subType: null,
            sub: '',
            pattType: null,
            patt: '',
            replType: null,
            repl: '',
            coreType: null,
            core: ''
        }
    },
    methods: {
        open() {
            this.show = true
        },
        close() {
            this.clear()

            this.show = false
            
        },
        clear(){
            this.imageUrl = null
            this.baseType = null
            this.mol = ''
            this.pattType = null
            this.patt = ''
            this.replType = null
            this.repl = ''
            this.coreType = null
            this.core = ''
        },
        async chemistryTransformation() {
            if(this.type == 'removeSub') {
                const result = await ChemistryTransformationServices.removeSubstructure(this.baseType, this.mol, this.subType, this.sub)
                this.imageUrl = URL.createObjectURL(result);
            }else if(this.type == 'replaceSub'){
                const result = await ChemistryTransformationServices.replaceSubstructure(this.baseType, this.mol, this.pattType, this.patt, this.replType, this.repl)
                this.imageUrl = URL.createObjectURL(result);
            }else if(this.type == 'removeChains'){
                const result = await ChemistryTransformationServices.removeLateralChains(this.baseType, this.mol, this.coreType, this.core)
                this.imageUrl = URL.createObjectURL(result);
            }else if(this.type == 'removeCore'){
                const result = await ChemistryTransformationServices.removeCore(this.baseType, this.mol, this.coreType, this.core)
                this.imageUrl = URL.createObjectURL(result);
            }
        }
    }
}
</script>

<style>
.image-container {
    width: 100%;
    /* El ancho se adapta al contenedor padre */
    height: 250px;
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