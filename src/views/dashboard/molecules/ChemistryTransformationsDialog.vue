<template>
    <v-dialog v-model='show' class="d-flex" max-width="900px" min-height="500px" :scrollable="false">
        <v-card min-height="500px">
            <v-card-title class="d-flex py-2 px-6">
                Transformaciones químicas
                <v-spacer></v-spacer>
                <!-- Botón para cerrar el diálogo -->

                <v-icon @click="show = false">mdi-close</v-icon>

            </v-card-title>
            <v-card-text class="py-0">
                <v-col cols="12" class="d-flex pa-0">
                    <v-radio-group inline v-model="type">
                        <v-radio label="Eliminar subestructuras" value="removeSub"></v-radio>
                        <v-radio label="Sustituir substructuras" value="replaceSub"></v-radio>
                        <v-radio label="Eliminar cadenas laterales" value="removeChains"></v-radio>
                        <v-radio label="Eliminar núcleos" value="removeCore"></v-radio>

                    </v-radio-group>
                </v-col>
                <div v-if="type == 'removeSub'">
                    <v-col cols="12" class="d-flex pa-0">
                        <v-col cols="5" class="py-0">
                            <v-select label="Base" v-model="baseType" :items="types">
                            </v-select>
                        </v-col>
                        <v-col cols="7" class="py-0">
                            <v-text-field v-model="mol"></v-text-field>
                        </v-col>
                    </v-col>
                    <v-col cols="12" class="d-flex pa-0">
                        <v-col cols="5" class="py-0">
                            <v-select label="Sub" v-model="subType" :items="types">
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
                            <v-select label="Base" v-model="baseType" :items="types">
                            </v-select>
                        </v-col>
                        <v-col cols="7" class="py-0">
                            <v-text-field v-model="mol"></v-text-field>
                        </v-col>
                    </v-col>
                    <v-col cols="12" class="d-flex pa-0">
                        <v-col cols="5" class="py-0">
                            <v-select label="Patt" v-model="pattType" :items="types">
                            </v-select>
                        </v-col>
                        <v-col cols="7" class="py-0">
                            <v-text-field v-model="patt"></v-text-field>
                        </v-col>
                    </v-col>
                    <v-col cols="12" class="d-flex pa-0">
                        <v-col cols="5" class="py-0">
                            <v-select label="Repl" v-model="replType" :items="types">
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
                            <v-select label="Base" v-model="baseType" :items="types">
                            </v-select>
                        </v-col>
                        <v-col cols="7" class="py-0">
                            <v-text-field v-model="mol"></v-text-field>
                        </v-col>
                    </v-col>
                    <v-col cols="12" class="d-flex pa-0">
                        <v-col cols="5" class="py-0">
                            <v-select label="Core" v-model="coreType" :items="types">
                            </v-select>
                        </v-col>
                        <v-col cols="7" class="py-0">
                            <v-text-field v-model="core"></v-text-field>
                        </v-col>
                    </v-col>
                </div>

            </v-card-text>
        </v-card>

    </v-dialog>
</template>



<script>
export default {
    data() {
        return {
            show: true,
            type: null,
            types: ['SMARTS', 'SMILES'],
            baseType: null,
            mol: '',
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
            this.show = false
            this.type = null
            this.baseType = null
            this.mol = ''
            this.pattType = null
            this.patt = ''
            this.replType = null
            this.repl = ''
            this.coreType = null
            this.core = ''
        }
    }
}
</script>