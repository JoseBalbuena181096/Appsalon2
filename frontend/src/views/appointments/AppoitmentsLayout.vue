<script setup>
   import {useUserStore} from '../../stores/user';
   const user = useUserStore();     

</script>


<template>
    <div class="flex justify-between">
        <h1 class="text-2xl lg:text-6xl font-black text-white"> App Salón</h1>
        <div class="flex flex-col space-y-5">
            <div class="flex gap-2 items-center">
                <p class="text-white text-right">Hola: {{ user.getUserName }}</p>
                <button class="bg-red-600  hover:bg-red-700 py-2 px-4 rounded-lg text-white uppercase text-xs font-extrabold">Cerrar Sesión</button>
            </div>
            <nav 
                class="flex gap-2 items-center justify-center"
            >
                <RouterLink
                    class="p-3 text-gray-200 uppercase text-xs font-black rounded-lg"
                    :to="{ name: 'my-appointments'}"
                >
                    Mis Citas
                </RouterLink>
                <RouterLink
                    class="p-3 text-gray-200 uppercase text-xs font-black rounded-lg bg-blue-600 hover:bg-blue-700"
                    :to="{ name: 'new-appointment'}"
                >
                    Nueva Cita
                </RouterLink>
            </nav>
        </div>
    </div>
    <main>
        <RouterView/>
    </main>
</template>

