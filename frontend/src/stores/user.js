import { defineStore } from 'pinia';
import {ref, onMounted, computed} from 'vue';
import AuthAPI from '../api/AuthAPI'; 
import { useRouter } from 'vue-router';
import AppointmentAPI from '../api/AppointmentAPI';

export const useUserStore = defineStore('user', () => {
    const router = useRouter();
    const user = ref({});
    const userAppointments = ref([]);
    const loading = ref(true);

    onMounted(async () => {
        try {
            const {data} = await AuthAPI.auth();
            user.value = data;
            await getUserAppointments();
        } catch (error) {
            console.error(`Error: ${error.message}`);
        }
        finally{
            loading.value = false;
        }
    });

    async function getUserAppointments(){
        const {data} = await AppointmentAPI.getUserAppointments(user.value._id);
        userAppointments.value = data;
    }
    
    const getUserName = computed(() => {
        return user.value?.name ? user.value?.name : '';
    });
    
    function logout(){
        localStorage.removeItem('AUTH_TOKEN');
        router.push({name: 'login'});
    }

    const noAppointments = computed(() => {
        return userAppointments.value.length === 0;
    });
    
    return{
        user,
        getUserName,
        logout,
        userAppointments,
        noAppointments,
        loading
    }
});