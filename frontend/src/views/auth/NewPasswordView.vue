<script setup>
    import {onMounted, inject, ref} from 'vue';
    import {useRoute} from 'vue-router';
    import AuthAPI from '../../api/AuthAPI';

    const toast = inject('toast');
    const route = useRoute();
    const {token} = route.params;

    const validToken = ref(false);
    
    onMounted(async () => {
        try {
            const {data} = await AuthAPI.verifyPasswordResetToken(token);
            validToken.value = true;
        } catch (error) {
            toast.open({
                message: error.response.data.msg,
                type: 'error'
            });
        }
    });
    
</script>

<template>
    <div v-if="validToken"> 
    <h1 class="text-6xl font-extrabold text-white text-center mt-10">
        Nuevo Password
    </h1>
    <p
        class="text-2xl text-white text-center my-5"
    >
    Coloca tu nuevo password
   </p>
   <FormKit
    id="newPasswordForm"
    type="form"
    :actions="false"
    incomplete-message="No se pudo enviar, revisa las notificaciones"
    @submit=""
   >
    
    <FormKit
            type="password"
            label="Password"
            name="password"
            placeholder="Password de Usuario -  Min 8 Caracteres"
            validation="required | length:8"
            :validation-messages="{
                required: 'El password es obligatorio',
                length: 'El password debe tener al menos 8 caracteres'
            }"
        />

    <FormKit
        type="submit"
    >
        Guardar Password
    </FormKit>
   </FormKit>
</div>
<div v-else>
    <h1 class="text-6xl font-extrabold text-white text-center mt-10">
        Token no válido
    </h1>
    <p
        class="text-2xl text-white text-center my-5"
    >
    El token no es válido o ha expirado
   </p>
</div>
</template>
