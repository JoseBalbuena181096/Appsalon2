<script setup>
    import SelectedService from '../../components/SelectedService.vue';
    import { useAppointmentsStore } from '../../stores/appointments';
    
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

    <div
        class="grid gap-5"
    >
        <SelectedService 
            v-for="service in appointments.services"
            :service="service"
        />
    </div>

</template>