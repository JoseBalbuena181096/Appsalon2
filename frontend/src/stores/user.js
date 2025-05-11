import { defineStore } from 'pinia';
import {ref, onMounted, computed} from 'vue';
import AuthAPI from '../api/AuthAPI'; 
import { useRouter } from 'vue-router';

export const useUserStore = defineStore('user', () => {
    const router = useRouter();
    const user = ref({});

    onMounted(async () => {
        try {
            const {data} = await AuthAPI.auth();
            user.value = data;
        } catch (error) {
            console.error(`Error: ${error.message}`);
        }
    });
    
    const getUserName = computed(() => {
        return user.value?.name ? user.value?.name : '';
    });
    
    function logout(){
        localStorage.removeItem('AUTH_TOKEN');
        router.push({name: 'login'});
    }

    return{
        user,
        getUserName,
        logout
    }
});