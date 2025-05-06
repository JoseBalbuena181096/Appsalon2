<script setup>
    import {onMounted} from 'vue';
    import {useRoute} from 'vue-router';
    import AuthAPI from '../../api/AuthAPI';

    const route = useRoute();
    const {token} = route.params;

    onMounted(async () => {
        try {
            const {data} = await AuthAPI.verifyAccount(token);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    });

</script>

<template>
    <div>
        <h1>Desde ConfirmAccountView</h1>

    </div>
</template>