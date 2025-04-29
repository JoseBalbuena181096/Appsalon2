<script setup>
    import {formatCurrency} from '../helpers';

    const props = defineProps({
        service: {
            type: Object,
        }
    });
    console.log(props.service);
</script>

<template>
    <div
        class="p-5 space-y-5 rounded-lg cursor-pointer bg-white"
    >
        <p
            class="text-2xl font-light"
        >
            Desde el servicio {{service.name}}
        </p>
        <p
            class="text-4xl font-black text-blue-600"
        >

            {{formatCurrency(service.price)}}
        </p>
    </div>
</template>