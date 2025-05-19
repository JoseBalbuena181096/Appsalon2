import {defineStore} from 'pinia';
import {ref, computed, onMounted, inject, watch} from 'vue';
import AppointmentAPI from '../api/AppointmentAPI';
import { converToISO, convertToDDMMYYYY } from '../helpers/date';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/user';


export const useAppointmentsStore = defineStore('appointments', () => {

    const services = ref([]);
    const date = ref('');
    const hours = ref([]);
    const time = ref('');
    const appointmentsByDate = ref([]);
    const appointmentId = ref('');
    const user = useUserStore();

    const toast = inject('toast');
    const router = useRouter();    

    onMounted(() => {
        const startHour =10;
        const endHour = 19;
        for(let hour = startHour; hour <= endHour; hour++){
            hours.value.push(hour + ':00');
        }
    });

    watch(date, async () => {
        time.value = '';
        if(date.value === '') return;
        const {data} = await AppointmentAPI.getByDate(date.value);
        appointmentsByDate.value = data.appointments;
        if(appointmentId.value){
            console.log("editando");
            appointmentsByDate.value = data.appointments.filter(
                appointment => appointment._id !== appointmentId.value
            );
            const currentAppointment = data.appointments.filter(
                appointment => appointment._id === appointmentId.value
            )[0].time;
            time.value = currentAppointment;
            //console.log(currentAppointment);
        }
        else{
            //console.log("creando");
            appointmentsByDate.value = data.appointments;
        }
    });

    function setSelectedAppointment(appointment){
        services.value = appointment.services;
        date.value = convertToDDMMYYYY(appointment.date);
        time.value = appointment.time;
        appointmentId.value = appointment._id;
        console.log(appointmentId.value);
    }

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
    
    async function saveAppointment(){
        const appointment = {
            services: services.value.map(service => service._id),
            date: converToISO(date.value),
            time: time.value,
            totalAmount: totalAmount.value
        }
        // console.log(appointment);
        if(appointmentId.value){
            try{
                const {data} = await AppointmentAPI.update(appointmentId.value, appointment);
                toast.open({
                    message: data.msg,
                    type: 'success'
                });
            }catch(error){
                toast.open({
                    message: error.response.data.msg,
                    type: 'error'
                });
            }

        }else{
            try{
                const {data} = await AppointmentAPI.create(appointment);
                // console.log(data.msg);
                toast.open({
                    message: data.msg,
                    type: 'success'
                });
            }catch(error){
                toast.open({
                    message: error.response.data.msg,
                    type: 'error'
                });
            }
        }
        clearAppointmentData();
        user.getUserAppointments();
        router.push({name: 'my-appointments'});
    }

    function clearAppointmentData(){
        services.value = [];
        date.value = '';
        time.value = '';
        appointmentId.value = '';
    }

    const isServiceSelected = computed(() => {
        return id => services.value.some(service => service._id === id);
    });

    const noServicesSelected = computed(() => services.value.length === 0);
    
    const totalAmount = computed(() => services.value.reduce((total, service) => total + service.price, 0));

    const isValidReservation = computed(() => {
        return services.value.length && date.value.length && time.value.length;
    });

    const isDateSelected = computed(() => {
        return date.value ? true : false;
    });

    const disableTime = computed(() => {
        return (hour) => {
            return appointmentsByDate.value.find(appointment => appointment.time === hour);
        }
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
        saveAppointment,
        isDateSelected,
        disableTime,
        setSelectedAppointment
    }    
});

