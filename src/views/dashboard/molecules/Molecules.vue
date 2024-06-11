<template>
    <v-container fluid class="fill-height py-2">
        <v-col cols="12" class="d-flex pa-0">
            <v-col cols="2" class="pa-0">
                <v-list class="pa-0">
                    <v-list-item color="purple" class="pa-2" @click="openNewMoleculeDialog()">Nueva
                        molécula</v-list-item>
                    <v-divider></v-divider>

                    <v-list-item class="pa-2" @click="openChangeType()">Conversión de tipos</v-list-item>
                    <v-divider></v-divider>

                    <v-list-item class="pa-2">Descriptores</v-list-item>
                    <v-divider></v-divider>

                    <v-list-item class="pa-2">Fingerprints</v-list-item>
                    <v-divider></v-divider>

                    <v-list-item class="pa-2">Coeficiente de Tanimoto</v-list-item>
                    <v-divider></v-divider>

                    <v-list-item class="pa-2" @click="openSearchSubstructures()">Búsqueda de
                        subestructuras</v-list-item>
                    <v-divider></v-divider>

                    <v-list-item class="pa-2" @click="openChemistryTransformations()">Transformaciones
                        químicas</v-list-item>
                    <v-divider></v-divider>

                    <v-list-item class="pa-2">Reacciones químicas</v-list-item>
                    <v-divider></v-divider>



                </v-list>

            </v-col>

            <v-col cols="10" class="d-flex flex-wrap py-0 px-0">

                <v-col v-for="m in moleculesInfo" :key="m.id" md="3" class="px-2 pt-0">
                    <v-card class="fill-height">

                        <v-card-title class="d-flex pb-0 pr-2">
                            {{ m.name ? m.name : '-' }}
                            <v-spacer></v-spacer>
                            <v-icon size="small" @click="updateMol(mol)">mdi-pencil</v-icon>
                            <v-icon size="small" @click="removeMol(m)">mdi-delete</v-icon>

                        </v-card-title>
                        <div class="text-right mr-2 text-grey-lighten-2" style="font-size: 10px;">
                            {{ format(m.date) }}

                        </div>
                        <v-card-text class="pa-2">
                            <div class="text-center">
                                <img :src="m.image" width="200" />
                                <br />
                                {{ m.smiles ? m.smiles : '-' }}
                                <br />

                            </div>


                        </v-card-text>
                    </v-card>
                </v-col>


            </v-col>

        </v-col>



        <NewMolecule ref="newMolecule" @add="addMolecule" />
        <ChangeTypeDialog ref="changeTypeMolecule" />
        <SearchSubstructuresDialog ref="searchSubstructures" />
        <ChemistryTransformationsDialog ref="chemistryTransformations" />


    </v-container>


</template>

<script>
import NewMolecule from './NewMoleculeDialog'
import ChangeTypeDialog from './ChangeTypeDialog'
import SearchSubstructuresDialog from './SearchSubstructuresDialog'
import ChemistryTransformationsDialog from './ChemistryTransformationsDialog'
import MoleculeServices from '@/services/MoleculeServices'
import DateFormatter from '@/utils/DateFormatter'


export default {

    components: { NewMolecule, ChangeTypeDialog, SearchSubstructuresDialog, ChemistryTransformationsDialog },
    data() {
        return {
            moleculesInfo: []
        }
    },
    methods: {
        openNewMoleculeDialog() {
            console.log("AAA")
            this.$refs.newMolecule.open()
        },
        openChangeType() {
            this.$refs.changeTypeMolecule.open()
        },
        openSearchSubstructures() {
            this.$refs.searchSubstructures.open()
        },
        openChemistryTransformations() {
            this.$refs.chemistryTransformations.open()
        },
        format(date) {
            return DateFormatter.format(date)
        },
        addMolecule(molInf) {
            console.log("PADRE")
            console.log(molInf)
            console.log(this.moleculesInfo)
            this.moleculesInfo.push(molInf)
            console.log(this.moleculesInfo)

        },
        async removeMol(mol) {
            const response = MoleculeServices.deleteMolecule(mol.id)
            if (response) {
                this.moleculesInfo = this.moleculesInfo.filter(molInfo => molInfo.id !== mol.id)

            }
        },
        updateMol(mol){
            this.$refs.updateMolecule.open(mol)
        }
    },
    async created() {

        const response = await MoleculeServices.getMoleculeSmilesInfo(33)
        if (response) {
            this.moleculesInfo = response
            console.log(this.moleculesInfo)
        }
    },



}
</script>