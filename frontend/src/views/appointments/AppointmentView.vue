<script setup>
    import SelectedService from '../../components/SelectedService.vue';
    import { useAppointmentsStore } from '../../stores/appointments';
    import { formatCurrency } from '../../helpers';
    
    const appointments = useAppointmentsStore();

</script>


<template>
     <h2  class="text-4xl font-extrabold text-white">
        Detalles cita y resumen
    </h2>
    <p class="text-white text-lg">
        A continuación verifica la información de la cita
    </p>
    <h3 class="text-3xl font-extrabold text-white">
        Servicios
    </h3>
    <p v-if="appointments.noServicesSelected" class="text-white text-2xl text-center">
        No hay servicios seleccionados
    </p>
    <div
        v-else
        class="grid gap-5"
    >
        <SelectedService 
            v-for="service in appointments.services"
            :service="service"
            :key="service._id"
        />
        <p class="text-right text-white text-2xl">
            Total a pagar:
            <span class="font-black text-blue-500">
                {{ formatCurrency(appointments.totalAmount) }}
            </span>
        </p>
    </div>

    <p class="text-2xl text-right text-white text-lg">
        Total a pagar:
        <span class="font-black text-blue-500">
            {{ formatCurrency(appointments.totalAmount) }}
        </span> 
    </p>

</template>