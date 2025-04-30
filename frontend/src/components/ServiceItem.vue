<script setup>
    import {formatCurrency} from '../helpers';
    import { useAppointmentsStore } from '../stores/appointments';

    const appointments = useAppointmentsStore();

    const props = defineProps({
        service: {
            type: Object,
        }
    });
    //console.log(props.service);
</script>

<template>
    <div
        class="p-5 space-y-5 rounded-lg cursor-pointer"
        :class="appointments.isServiceSelected(service._id) ? 'bg-blue-500 text-white' : 'bg-white'"
        @click="appointments.onServicesSelected(service)"
    >
        <p
            class="text-2xl font-light"
        >
        
            Desde el servicio {{service.name}}
        </p>
        <p
            class="text-4xl font-black"
            :class="appointments.isServiceSelected(service._id) ? 'text-white' : 'text-blue-600'"
        >

            {{formatCurrency(service.price)}}
        </p>
    </div>
</template>