<script setup>
    import {displayDate} from '../helpers/date';
    import {formatCurrency} from '../helpers';

    defineProps({
        appointment: {
            type: Object,
            required: true
        }
    })
</script>

<template>
    <div class="bg-white p-5 space-y-3 rounded-lg">
        <p 
            class="text-gray-500 font-black"
        >
            Fecha: <span class="font-light">{{displayDate(appointment.date)}}</span>
            Hora: <span class="font-light">{{appointment.time}} Horas.</span>
        </p>
        <p class="text-lg font-black">
            Servicios solicitados en la cita
        </p>
        <div v-for="service in appointment.services">
            <p>
                {{service.name}}
            </p>
            <p class="text-blue-500 font-black text-2xl">
                {{formatCurrency(service.price)}}
            </p>
        </div>
        <p class="text-right font-black text-2xl">
            Total a pagar: 
            <span class="text-blue-600">{{formatCurrency(appointment.totalAmount)}}</span>
        </p>
        <div class="flex gap-2 items-center">
            <RouterLink 
                :to="{ name: 'edit-appointment', params: { id: appointment._id } }" 
                type="button" 
                class="bg-slate-600 hover:bg-slate-700 rounded-lg text-white p-3 text-sm font-black flex-1 md:flex-none"
            >
                Editar cita
            </RouterLink>
            <button 
                type="button" 
                class="bg-red-600 hover:bg-red-700 rounded-lg text-white p-3 text-sm font-black flex-1 md:flex-none"
            >
                Cancelar cita
            </button>
        </div>
    </div>
</template>

