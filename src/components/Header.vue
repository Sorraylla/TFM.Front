<template>
    <v-app-bar app clipped-left outlined flat color="primary">

      

        <v-divider vertical class='mx-1' />

        <img class="ml-4" :src="require('@/assets/RDKitMinds-circle.png')" alt='logo' width="50px"/>
        <span  class='mt-4 text-button text--disabled'></span>

        <v-spacer />

        <div>
            <v-list-item>
                <v-list-item-avatar size='28' class='mr-2'>
                    
                </v-list-item-avatar>

                <v-list-item-content >
                    <span class='text--secondary text-button'>Sorraylla</span>
                </v-list-item-content>
            </v-list-item>
        </div>

    </v-app-bar>
</template>