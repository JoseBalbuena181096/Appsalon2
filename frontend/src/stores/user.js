import { defineStore } from 'pinia';
import {ref, onMounted, computed} from 'vue';
import AuthAPI from '../api/AuthAPI'; 

export const useUserStore = defineStore('user', () => {
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
    
    return{
        user,
        getUserName
    }
});