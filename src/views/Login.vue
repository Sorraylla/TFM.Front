<template>
    <v-container fluid style='height: 100vh' class='d-flex align-center'>
        <v-row no-gutters>
            <v-col cols='12' class='d-flex justify-center'>
                <img height='200px' :src="require('@/assets/RDKitMinds.png')" />
            </v-col>
            
            <v-col cols='12' class='d-flex justify-center mb-2'>
                <span class='text-button text--disabled'>Knowledge Management System</span>
            </v-col>


            <v-col cols='12'>
                <v-form v-model='valid' lazy-validation>
                    <v-row no-gutters class='d-flex justify-center'>
                        <v-col cols='12' sm='6' md='4' lg='3' xl='2'>
                            <v-text-field v-model='username'  :counter='25'
                                :placeholder='$t("login.user")' required outlined dense :disabled='loading'>
                                <template #prepend-inner>
                                </template>

                            </v-text-field>
                        </v-col>

                        <v-col cols='12'></v-col>

                        <v-col cols='12' sm='6' md='4' lg='3' xl='2'>
                            <v-text-field v-model='pass' 
                                :placeholder='$t("login.password")' 
                                :type='showPass ? "text" : "password"' @click:append='showPass = !showPass' required
                                outlined dense :disabled='loading'>
                                <template #prepend-inner>
                                </template>

                            </v-text-field>
                        </v-col>

                        <v-col cols='12'></v-col>

                        <v-col cols='12' sm='6' md='4' lg='3' xl='2'>
                            <v-btn  color='primary' :loading='loading' block @click='login'>
                                <v-icon left small>fa-sign-in-alt</v-icon>
                                <span class='text-capitalize'>{{ $t('login.login') }}</span>
                            </v-btn>
                        </v-col>
                        <!--

                        <v-col cols='12'></v-col>

                        <v-scroll-x-transition>
                            <v-col cols='12' sm='6' md='4' lg='3' xl='2' v-show='showAlert' class='mt-4'>
                                <v-alert type='error' border='top' colored-border text dense dismissible
                                    v-model='showAlert'>
                                    <span>{{ $t('login.loginFailed') }}</span>
                                </v-alert>
                            </v-col>
                        </v-scroll-x-transition>
                        -->
                    </v-row>
                </v-form>
            </v-col>
        
        </v-row>

    </v-container>
</template>

<script>
import { useI18n } from 'vue-i18n';

export default {
    setup() {
        const { t } = useI18n();
        return { t };
    },
    methods:{
        login(){
            console.log("Login")
            this.$router.push('/dashboard')
        }
    }
};
</script>