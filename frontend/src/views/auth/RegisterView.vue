<script setup>
    import AuthAPI from "../../api/AuthAPI";
    
    const handleSubmit = async ({password_confirm, ...data}) => {
        try {
            const data_  = await AuthAPI.register(data);
            console.log(data_);
        } catch (error) {
            console.log(error.response.data);
        }
    }

    
</script>

<template>
    <h1 class="text-6xl font-extrabold text-white text-center mt-10">
        Crea una cuenta
    </h1>
    <p
        class="text-2xl text-white text-center my-5"
    >
        Crear una cuenta en AppSalon
    </p>
    <FormKit
        type="form"
        :actions="false"
        incomplete-message="No se pudo enviar, revisa las notificaciones"
        @submit="handleSubmit"
    >
        <FormKit
            type="text"
            label="Nombre"
            name="name"
            placeholder="Tu nombre"
            validation="required | length:3"
            :validation-messages="{
                required: 'El nombre es obligatorio',
                length: 'El nombre debe tener al menos 3 caracteres'
            }"
        />

        <FormKit
            type="email"
            label="Email"
            name="email"
            placeholder="Email de registro"
            validation="required | email"
            :validation-messages="{
                required: 'El email es obligatorio',
                email: 'El email debe ser valido'
            }"
        />

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
            type="password"
            label="Repite tu Password"
            name="password_confirm"
            placeholder="Repite el password"
            validation="required | confirm"
            :validation-messages="{
                required: 'El password de confirmación es obligatorio',
                confirm: 'Los passwords no coinciden'
            }"
        />
        

        <FormKit
            type="submit"
        >
            Crear Cuenta
        </FormKit>
    </FormKit>   
</template>