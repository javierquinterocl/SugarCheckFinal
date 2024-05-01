<script setup>

import { RouterLink } from 'vue-router';
import { ref } from 'vue';

const ventana = ref(false);
const ventana2 = ref(false);

//IMC
const peso = ref(0);
const altura = ref(0);
const imc = ref(0);

//GLUCOSA

const militros = ref(0);
const azucar = ref(0);
const glucosa = ref(0)
const total = ref(0);

function openventana() {
    ventana.value = true;
    console.log('Muestra');
}
function openventana2() {
    ventana2.value = true;
}

function closedventana2() {
    ventana2.value = false;
    glucosa.value = Math.round((militros.value / 100) * azucar.value);
    total.value += glucosa.value; 
}
function closedventana(){
    ventana.value =false;
    imc.value = Math.round(peso.value/ (altura.value * altura.value));
}



</script>

<template>
      <div class="fixed left-0 top-0 w-64 h-full bg-gray-900 p-4 z-50 transition-transform">
        <a href="#" class="flex items-center pb-4 border-b border-b-gray-800">
            <img src="/src/img/logov2.png" alt="" class="w-8 h-8 rounded object-cover">
            <span class="text-lg font-bold text-white ml-3">Sugar Check</span>
        </a>
        <ul class="mt-4">
            <li class="mb-1 group active">
                <a class="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
                    <i class="ri-home-2-line mr-3 text-lg"></i>
                    <span class="text-sm">Dashboard</span>
                </a>
            </li>
            <li class="mb-1 group">
                <button @click="openventana()"  class="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle">
                    <i class="ri-instance-line mr-3 text-lg"></i>
                    <button  class="text-sm">Calcular IMC</button>
                    <i class="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-90"></i>
                </button>
                
            </li>
            
            <li class="mb-1 group">
                <a href="#" class="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle">
                    <i class="ri-flashlight-line mr-3 text-lg"></i>
                    <span class="text-sm">Calcular Glucosa</span>
                    <i class="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-90"></i>
                </a>
                <ul class="pl-7 mt-2 hidden group-[.selected]:block">
                    <li class="mb-4">
                        <a href="#" class="text-gray-300 text-sm flex items-center hover:text-gray-100 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">Manage services</a>
                    </li>
                </ul>
            </li>
            <li class="mb-1 group">
                <RouterLink to="/" class="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle">
                    <i class="ri-instance-line mr-3 text-lg"></i>
                    <span class="text-sm">Cerrar Sesion</span>
                    <i class="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-90"></i>
                </RouterLink>
                
            </li>
            <li class="mb-1 group">
                <a href="#" class="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
                    <i class="ri-settings-2-line mr-3 text-lg"></i>
                    
                </a>
            </li>
        </ul>
    </div>
    <div class="fixed top-0 left-0 w-full h-full bg-black/50 z-40 md:hidden sidebar-overlay"></div>
    <!-- end: Sidebar -->

    <!-- start: Main -->
    <main class="w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-50 min-h-screen transition-all main">
        
        <div class="p-6 mt-16">
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                
                <div class="bg-white rounded-md border border-gray-100 p-12 shadow-md shadow-black/5" >
                    <div class="flex justify-between mb-6">
                        <div>
                            <div class="text-2xl font-semibold mb-1">IMC Calculado = {{ imc }}</div>
                            <div class="text-sm font-medium text-gray-400">Sobrepeso/..</div>
                        </div>
                    
                    </div>
                    <button href="#" @click="openventana()" class="text-blue-500 font-medium text-sm hover:text-blue-600">Calcular IMC</button>
                </div>
                <div class="bg-white rounded-md border border-gray-100 p-12 shadow-md shadow-black/5" >
                    <div class="flex justify-between mb-6">
                        <div>
                            <div class="text-2xl font-semibold mb-1">Su Glucosa es = {{ total }}</div>
                            <div class="text-sm font-medium text-gray-400">Azucar/..</div>
                        </div>
                    
                    </div>
                    <button @click="openventana2()" href="#" class="text-blue-500 font-medium text-sm hover:text-blue-600">Calcular Glucosa</button>
                </div>
                
                
            </div>
            <div class=" p-16 border border-blue-950 border-opacity-70 rounded-xl mx-auto w-[40rem] flex-col flex shadow-2xl " v-if="ventana">
                
                <p class="mx-auto mb-8 font-semibold text-2xl">INGRESE DATOS IMC</p>

                <label class="font-semibold " for="">Ingrese su peso</label>
                <input type="text" name="" id="Peso" v-model="peso" placeholder="Peso" class=" mt-5 border-b-2 border-gray-200 p-1 outline-none rounded"  >
                <label  for="" class="mt-3 font-semibold">Ingrese su altura</label>
				<input type="text" name="" id="Altura" v-model="altura" placeholder="Altura" class=" mt-5 border-b-2 border-gray-200 p-1 outline-none rounded" >
                <button class=" p-2 text-center rounded-md bg-[#2D3688] text-white mt-8 " @click="closedventana()"  >Calcular</button>
           </div>

           <div class=" p-16 border border-blue-950 border-opacity-70 rounded-xl mx-auto w-[40rem] flex-col flex shadow-2xl " v-if="ventana2">
                
                <p class="mx-auto mb-8 font-semibold text-2xl">INGRESE DATOS GLUCOSA</p>

                <label class="font-semibold " for="">Ingrese la azucar </label>
                <input type="text" name="" id="Gramos" v-model="azucar" placeholder="g" class=" mt-5 border-b-2 border-gray-200 p-1 outline-none rounded"  >
                <label  for="" class="mt-3 font-semibold">Ingrese los militros </label>
				<input type="text" name="" id="Altura" v-model="militros" placeholder="ml" class=" mt-5 border-b-2 border-gray-200 p-1 outline-none rounded" >
                <button class=" p-2 text-center rounded-md bg-[#2D3688] text-white mt-8 " @click="closedventana2()"  >Calcular</button>
           </div>

        </div>
               
            
        
        
    </main>
    <!-- end: Main -->

</template>
