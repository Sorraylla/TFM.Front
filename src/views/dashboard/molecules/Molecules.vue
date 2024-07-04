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

                    <v-list-item class="pa-2" @click="openDescriptorDialog()">Descriptores</v-list-item>
                    <v-divider></v-divider>

                    <v-list-item class="pa-2" @click="openFingerprints()">Fingerprints y Similitud</v-list-item>
                    <v-divider></v-divider>

                    <v-list-item class="pa-2" @click="openSearchSubstructures()">Búsqueda de
                        subestructuras</v-list-item>
                    <v-divider></v-divider>

                    <v-list-item class="pa-2" @click="openChemistryTransformations()">Transformaciones
                        químicas</v-list-item>
                    <v-divider></v-divider>

                    <v-list-item class="pa-2" @click="openChemistryReactions()">Reacciones químicas</v-list-item>
                    <v-divider></v-divider>



                </v-list>

            </v-col>

            <v-col cols="10" class="d-flex flex-wrap py-0 px-0">

                <v-col v-for="m in moleculesInfo" :key="m.id" md="3" class="px-2 pt-0">
                    <v-card class="fill-height">

                        <v-card-title class="d-flex pb-0 pr-2">
                            {{ m.name ? m.name : '-' }}
                            <v-spacer></v-spacer>
                            <v-icon size="small" @click="updateMol(m)">mdi-pencil</v-icon>
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
        <UpdateMoleculeDialog ref="updateMolecule" @update="updateMolecule" />
        <ChangeTypeDialog ref="changeTypeMolecule" />
        <DescriptorDialog ref="descriptor" />
        <FingerprintsDialog ref="fingerprints" />
        <SearchSubstructuresDialog ref="searchSubstructures" />
        <ChemistryTransformationsDialog ref="chemistryTransformations" />
        <ChemistryReactions ref="chemistryReactions" />


    </v-container>


</template>

<script>
import NewMolecule from './NewMoleculeDialog'
import UpdateMoleculeDialog from './UpdateMoleculeDialog'
import ChangeTypeDialog from './ChangeTypeDialog'
import DescriptorDialog from './DescriptorDialog'
import FingerprintsDialog from './FingerprintsSimility.vue'
import SearchSubstructuresDialog from './SearchSubstructuresDialog'
import ChemistryTransformationsDialog from './ChemistryTransformationsDialog'
import ChemistryReactions from './ChemistryReactionsDialog.vue'


import MoleculeServices from '@/services/MoleculeServices'
import DateFormatter from '@/utils/DateFormatter'


export default {

    components: { NewMolecule, UpdateMoleculeDialog, ChangeTypeDialog, DescriptorDialog, FingerprintsDialog, SearchSubstructuresDialog, ChemistryTransformationsDialog, ChemistryReactions },
    data() {
        return {
            moleculesInfo: []
        }
    },
    methods: {
        openNewMoleculeDialog() {
            this.$refs.newMolecule.open()
        },
        openChangeType() {
            this.$refs.changeTypeMolecule.open()
        },
        openDescriptorDialog() {
            this.$refs.descriptor.open()
        },
        openFingerprints() {
            this.$refs.fingerprints.open()
        },
        openSearchSubstructures() {
            this.$refs.searchSubstructures.open()
        },
        openChemistryTransformations() {
            this.$refs.chemistryTransformations.open()
        },
        openChemistryReactions() {
            this.$refs.chemistryReactions.open()  
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
        async updateMolecule(mol) {

            this.moleculesInfo = this.moleculesInfo.filter(molInfo => molInfo.id !== mol.id)
            this.moleculesInfo.push(mol)

        },
        updateMol(mol) {
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