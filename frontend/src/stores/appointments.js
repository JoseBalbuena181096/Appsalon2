import {defineStore} from 'pinia';
import {ref, computed, onMounted} from 'vue';
import AppointmentAPI from '../api/AppointmentAPI';


export const useAppointmentsStore = defineStore('appointments', () => {

    const services = ref([]);
    const date = ref('');
    const hours = ref([]);
    const time = ref('');
    
    onMounted(() => {
        const startHour =10;
        const endHour = 19;
        for(let hour = startHour; hour <= endHour; hour++){
            hours.value.push(hour + ':00');
        }
    });


    function onServicesSelected(service) {
        if(services.value.some(selectedService => selectedService._id === service._id)){
            services.value = services.value.filter(serviceSelected => serviceSelected._id !== service._id);
        }
        else{
            if(services.value.length === 2){
                alert('Maximo 2 servicios por cita');
                return;
            }
            services.value.push(service); 
        }
    }
    
    async function createAppointment(){
        const appointment = {
            services: services.value.map(service => service._id),
            date: date.value,
            time: time.value,
            totalAmount: totalAmount.value
        }
        // console.log(appointment);
        try {
            const {data} = await AppointmentAPI.create(appointment);
            // console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    const isServiceSelected = computed(() => {
        return id => services.value.some(service => service._id === id);
    });

    const noServicesSelected = computed(() => services.value.length === 0);
    
    const totalAmount = computed(() => services.value.reduce((total, service) => total + service.price, 0));

    const isValidReservation = computed(() => {
        return services.value.length && date.value.length && time.value.length;
    });

    return {  
        onServicesSelected,
        isServiceSelected,
        services,
        time,
        date,
        totalAmount,
        hours,
        noServicesSelected,
        isValidReservation,
        createAppointment    
    }    
});
