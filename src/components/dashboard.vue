<script setup>

import { RouterLink } from 'vue-router';
import { ref } from 'vue';
import BarChart from "./BarChart.vue"
import NavBar from './NavBar.vue';
import { VuePDF, usePDF } from '@tato30/vue-pdf'
import Bar from './Bar.vue'
import Rounded from './Rounded.vue'

// 



const ventana = ref(false);
const ventana2 = ref(false);
const ventana3 = ref(false);
const ventanasoma = ref(false);


const tipo = ref("Calcular primero");

//IMC
const peso = ref();
const altura = ref();
const imc = ref(0);


//GLUCOSA

const militros = ref();
const azucar = ref();
const glucosa = ref(0)
const total = ref(0);

const contador = ref(0);

//AZUCAR EN LA SANGRE
const concentracion = ref();
const nivelAzucar = ref(0);


//SOMATOTIPO

const somaimg = ref(true);
const ectomorfo = ref(false);
const mesomorfo = ref(false);
const endomorfo = ref(false);



// PDF


function openventana() {
    ventana.value = true;
    ventana2.value = false;
    ventanasoma.value = false,
        console.log('Muestra');
}
function openventana2() {
    ventanasoma.value = false;
    ventana2.value = true;
    ventana.value = false;
}

function openventana3() {
    ventana3.value = true;
    ventanasoma.value = false;
    ventana2.value = false;
    ventana.value = false;
}

function closedventana2() {
    ventana2.value = false;

    glucosa.value = Math.round((militros.value / 100) * azucar.value);
    total.value += glucosa.value;

    if (azucar.value > 0) {
        militros.value = "";
        azucar.value = "";
    }
}

function closedventana3() {
    ventana3.value = false;

    if (concentracion.value === "") {
        nivelAzucar.value = "Ingrese primero su concentracion de azucar"
    }
    if (concentracion.value <= 140) {
        nivelAzucar.value = "Normal"

    }
    else if (concentracion.value > 140 && concentracion.value <= 199) {
        nivelAzucar.value = "Prediabetes"
    }
    if (concentracion.value >= 200) {
        nivelAzucar.value = "Diabetes"
    }


}
function closedventana() {
    ventana.value = false;

    imc.value = Math.round(peso.value / (altura.value * altura.value));

    if (peso.value === "") {
        imc.value = 0;
        tipo.value = "Calcule primero su IMC"

    }

    if (imc.value > 18.5 && imc.value < 24.9) {
        tipo.value = "Se encuentra en el promedio";
    }

    if (imc.value < 18.5 && imc.value != 0) {
        tipo.value = "Se encuenta debajo del promedio";
    }

    if (imc.value > 25 && imc.value < 29.9) {
        tipo.value = "Se encuentra en Sobre Peso"
    }

    if (imc.value > 30 && imc.value < 34.9) {
        tipo.value = "Se encuentra en Obesidad I"
    }

    if (imc.value > 35 && imc.value < 39.9) {
        tipo.value = "Se encuentra en Obesidad II"
    }

    if (imc.value > 40) {
        tipo.value = "Se encuentra en Obesidad III"
    }

    if (peso.value > 0) {
        peso.value = "";
        altura.value = "";

    }
}

function somatotipoOpen() {
    ventanasoma.value = true;
    ventana3.value = false;
    ventana2.value = false;
    ventana.value = false;
}

function somatotipoclose() {
    ventanasoma.value = false;
}

function calcularsoma(calculado) {
    if (calculado == "mesomorfo") {
        somaimg.value = false;
        mesomorfo.value = true;
        ectomorfo.value = false;
        endomorfo.value = false;
    }
    if (calculado == "ectomorfo") {
        somaimg.value = false;
        ectomorfo.value = true;
        mesomorfo.value = false;
        endomorfo.value = false;
    }
    if (calculado == "endomorfo") {
        somaimg.value = false;
        endomorfo.value = true;
        ectomorfo.value = false;
        mesomorfo.value = false;
    }

}
//Chart



// CALCULAR PDF
const file = ref('');
const recibido = ref(true);
const pdfLoaded = ref(false);

function files(src) {
    file.value = src.target.files[0].name;
    recibido.value = false;
    pdfLoaded.value = true;
    console.log('Archivo seleccionado:', file.value);
    onLoaded();
}
const { pdf, pages, info } = usePDF('/src/pdf/informe.pdf')

function onLoaded(value) {
    return console.log(value.textContent.items[0].str)
}

const pdfs = ref(false);

function leerpdf() {
    pdfs.value = true;
}
function closedpdf() {
    pdfs.value = false;
}






</script>



<template>
    <div class="fixed left-0 top-0 w-64 h-full bg-gray-900 p-4 z-50 transition-transform space-y-6">
        <a href="#" class="flex items-center pb-4 border-b border-b-gray-800">
            <img src="/src/img/logov2.png" alt="" class="w-8 h-8 rounded object-cover">
            <span class="text-lg font-bold text-white ml-3">Sugar Check</span>
        </a>
        <ul class="mt-4 space-y-4">
            <li class="mb-1 group active">
                <a
                    class="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5" />
                    </svg>

                    <span class="text-sm">Dashboard</span>
                </a>
            </li>
            <li class="mb-1 group">

                <button @click="openventana()"
                    class="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle">
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                        viewBox="0 0 24 24">
                        <path fill-rule="evenodd"
                            d="M12.512 8.72a2.46 2.46 0 0 1 3.479 0 2.461 2.461 0 0 1 0 3.479l-.004.005-1.094 1.08a.998.998 0 0 0-.194-.272l-3-3a1 1 0 0 0-.272-.193l1.085-1.1Zm-2.415 2.445L7.28 14.017a1 1 0 0 0-.289.702v2a1 1 0 0 0 1 1h2a1 1 0 0 0 .703-.288l2.851-2.816a.995.995 0 0 1-.26-.189l-3-3a.998.998 0 0 1-.19-.26Z"
                            clip-rule="evenodd" />
                        <path fill-rule="evenodd"
                            d="M7 3a1 1 0 0 1 1 1v1h3V4a1 1 0 1 1 2 0v1h3V4a1 1 0 1 1 2 0v1h1a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h1V4a1 1 0 0 1 1-1Zm10.67 8H19v8H5v-8h3.855l.53-.537a1 1 0 0 1 .87-.285c.097.015.233.13.277.087.045-.043-.073-.18-.09-.276a1 1 0 0 1 .274-.873l1.09-1.104a3.46 3.46 0 0 1 4.892 0l.001.002A3.461 3.461 0 0 1 17.67 11Z"
                            clip-rule="evenodd" />
                    </svg>

                    <button class="text-sm">Calcular IMC</button>

                </button>

            </li>

            <li class="mb-1 group">
                <button @click="leerpdf()"
                    class="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle">
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                        viewBox="0 0 24 24">
                        <path fill-rule="evenodd"
                            d="M9 7V2.221a2 2 0 0 0-.5.365L4.586 6.5a2 2 0 0 0-.365.5H9Zm2 0V2h7a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9h5a2 2 0 0 0 2-2Zm.5 5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm0 5c.47 0 .917-.092 1.326-.26l1.967 1.967a1 1 0 0 0 1.414-1.414l-1.817-1.818A3.5 3.5 0 1 0 11.5 17Z"
                            clip-rule="evenodd" />
                    </svg>

                    <button class="text-sm">Ingresar PDF</button>

                </button>

            </li>

            <li class="mb-1 group">
                <a href="#" @click="openventana2()"
                    class="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle">
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                        viewBox="0 0 24 24">
                        <path
                            d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
                    </svg>

                    <span class="text-sm">Calcular Azucar</span>

                </a>

            </li>

            <li class="mb-1 group">
                <a href="#" @click="openventana3()"
                    class="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle">
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-width="2"
                            d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z" />
                    </svg>

                    <span class="text-sm">Calcular Glucosa</span>

                </a>

            </li>

            <li class="mb-1 group">
                <a href="#" @click="somatotipoOpen()"
                    class="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle">
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 20a16.405 16.405 0 0 1-5.092-5.804A16.694 16.694 0 0 1 5 6.666L12 4l7 2.667a16.695 16.695 0 0 1-1.908 7.529A16.406 16.406 0 0 1 12 20Z" />
                    </svg>

                    <span class="text-sm">Somatotipo</span>

                </a>

            </li>

            <li class="mb-1 group">
                <RouterLink to="/"
                    class="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle">
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M3 9h13a5 5 0 0 1 0 10H7M3 9l4-4M3 9l4 4" />
                    </svg>

                    <span class="text-sm">Cerrar Sesion</span>

                </RouterLink>

            </li>
            <li class="mb-1 group">
                <a href="#"
                    class="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
                    <i class="ri-settings-2-line mr-3 text-lg"></i>

                </a>
            </li>
        </ul>
    </div>
    <div class="fixed top-0 left-0 w-full h-full bg-black/50 z-40 md:hidden sidebar-overlay"></div>
    <!-- end: Sidebar -->

    <!-- start: Main -->
    <main class="w-full md:w-[calc(100%-256px)] md:ml-64 bg-[#f3f4f6]  transition-all main"
        v-bind:class="{ 'bg-[rgba(0,0,0,0.51)]': ventana || ventana2 || ventana3 || ventanasoma }">

        <div class="p-6 bg-none">
            <NavBar />

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6   z-0 relative">

                <div class="   rounded-md border border-gray-100 bg-white p-12 shadow-md shadow-black/5 "
                    v-bind:class="{ ' border-none blur-sm': ventana || ventana2 || ventana3 || ventanasoma }">

                    <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                        <div class="bg-[#2d3688] text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full mb-8"
                            style="width: 45%"> 250</div>
                    </div>

                    <div class="flex justify-between mb-6">

                        <div>
                            <div class="text-2xl font-semibold mb-1">IMC Calculado = {{ imc }}</div>
                            <div class="text-sm font-medium text-gray-400">{{ tipo }}</div>
                        </div>

                    </div>
                    <button href="#" @click="openventana()"
                        class="text-blue-500 font-medium text-sm hover:text-blue-600 ">Calcular IMC</button>
                </div>
                <div class="  rounded-md border border-gray-100 p-12 shadow-md shadow-black/5 bg-white"
                    v-bind:class="{ ' border-none blur-sm': ventana || ventana2 || ventana3 || ventanasoma }">
                    <div class="flex justify-between mb-6">
                        <div>
                            <div class="text-2xl font-semibold mb-1">Azucar consumida <br> {{ total }}</div>
                            <div class="text-sm font-medium text-gray-400">{{ tipo }}</div>
                        </div>

                    </div>
                    <button @click="openventana2()" href="#"
                        class="text-blue-500 font-medium text-sm hover:text-blue-600">Calcular Glucosa</button>
                </div>

                <div class="  rounded-md border border-gray-100 p-12 shadow-md shadow-black/5 bg-white"
                    v-bind:class="{ ' border-none blur-sm': ventana || ventana2 || ventana3 || ventanasoma }">
                    <div class="flex justify-between mb-6">
                        <div>
                            <div class="text-2xl font-semibold mb-1">Nivel de azucar = {{ nivelAzucar }}</div>
                            <div class="text-sm font-medium text-gray-400">{{ tipo }}</div>
                        </div>

                    </div>
                    <button @click="openventana3()" href="#"
                        class="text-blue-500 font-medium text-sm hover:text-blue-600">Calcular azucar en la
                        sangre</button>
                </div>



            </div>


            <div class=" p-16  border border-blue-950 border-opacity-70 rounded-xl mx-auto w-[40rem] flex-col flex shadow-2xl mb-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-50"
                v-if="ventana">
                <div class=" cursor-pointer right-10 top-8 absolute" @click="closedventana()">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>

                </div>


                <p class="mx-auto mb-8 font-semibold text-2xl mt-4">INGRESE DATOS IMC</p>

                <label class="font-semibold " for="">Ingrese su peso: </label>
                <input type="text" name="" id="Peso" v-model="peso" placeholder="Peso(Kg)"
                    class=" mt-5 border-b-2 border-gray-200 p-1 outline-none rounded">
                <label for="" class="mt-3 font-semibold">Ingrese su altura: </label>
                <input type="text" name="" id="Altura" v-model="altura" placeholder="Altura (m)"
                    class=" mt-5 border-b-2 border-gray-200 p-1 outline-none rounded">
                <button class=" p-2 text-center rounded-md bg-[#2D3688] text-white mt-8 "
                    @click="closedventana()">Calcular</button>
            </div>

            <div class=" p-16 border border-blue-950 border-opacity-70 rounded-xl mx-auto w-[40rem] flex-col flex shadow-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-50  "
                v-if="ventana2">
                <div class=" cursor-pointer  right-10 top-8 absolute" @click="closedventana2()">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>

                </div>

                <p class="mx-auto mb-8 font-semibold text-2xl">INGRESE DATOS GLUCOSA</p>
                <form class="p-4 md:p-5">
                    <div class="grid gap-4 mb-4 grid-cols-2">
                        <div class="col-span-2">
                            <label for="name"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre del
                                Alimento</label>
                            <input type="text" name="name" id="name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Ingrese el nombre" required="">
                        </div>
                        <div class="col-span-2 sm:col-span-1">
                            <label for="price"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cantidad de
                                Azucar</label>
                            <input type="number" v-model="azucar" name="azucar" id="price"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="" required="">
                        </div>
                        <div class="col-span-2 sm:col-span-1">
                            <label for="category"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo</label>
                            <select id="category"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option selected="">Selecione tipo de producto</option>
                                <option value="Ml">Militros</option>
                                <option value="Gr">Gramos</option>

                            </select>
                        </div>
                        <div class="col-span-2 sm:col-span-1">
                            <label for="price"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cantidad</label>
                            <input type="number" v-model="militros" name="azucar" id="azucar"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="" required="">
                        </div>

                        <div class="col-span-2">
                            <label for="description"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Añadir
                                Detalles!</label>
                            <textarea id="description" rows="4"
                                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Detalles"></textarea>
                        </div>
                    </div>
                    <button type="submit"
                        class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        @click="closedventana2()">
                        <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                clip-rule="evenodd"></path>
                        </svg>
                        Añadir
                    </button>
                </form>



            </div>

            <div class=" p-16 border border-blue-950 border-opacity-70 rounded-xl mx-auto w-[40rem] flex-col flex shadow-2xl my-[-6rem] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-50  "
                v-if="ventana3">
                <div class=" cursor-pointer  right-10 top-8 absolute" @click="closedventana3()">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>

                </div>

                <p class="mx-auto mb-20 font-semibold text-2xl">INGRESE DATOS GLUCOMETRO</p>

                <label class="font-semibold " for="">Ingrese la concentracion de azucar en la sangre: </label>
                <input type="text" name="" id="Concentracion" v-model="concentracion" placeholder="mg/dl"
                    class=" mt-5 mb-3 border-b-2 border-gray-200 p-1 outline-none rounded">
                <button class=" p-2 text-center rounded-md bg-[#2D3688] text-white mt-12 "
                    @click="closedventana3()">Calcular</button>
            </div>

            <!-- //Somatotipo ventana -->

            <div class=" p-16 border border-blue-950 border-opacity-70 rounded-xl mx-auto w-[40rem] flex-col flex shadow-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-50  "
                v-if="ventanasoma">
                <div class=" cursor-pointer  right-10 top-8 absolute" @click="somatotipoclose()">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>

                </div>

                <p class="mx-auto mb-10 font-semibold text-2xl">CUAL ES SU SOMATOTIPO</p>

                <label class="font-semibold mx-auto text-gray-500" for="">Selecione uno para conocer sus
                    caracteristicas: </label>
                <div class=" flex space-x-6 mx-auto">
                    <button class=" p-2 text-center rounded-md bg-[#4365d6] text-white mt-12 "
                        @click="calcularsoma('ectomorfo')">Ectomorfo</button>
                    <button class=" p-2 text-center rounded-md bg-[#dd6e42] text-white mt-12 "
                        @click="calcularsoma('mesomorfo')">Mesomorfo</button>
                    <button class=" p-2 text-center rounded-md bg-[#b63737] text-white mt-12 "
                        @click="calcularsoma('endomorfo')">Endomorfo</button>

                </div>
                <div class=" mt-12 rounded-xl">
                    <img class="rounded-xl" src="/src/img/somatotipo.gif" alt="" v-if="somaimg">
                    <img class="rounded-xl" src="/src/img/mesomorfo.jpg" alt="" v-if="mesomorfo">
                    <img class="rounded-xl" src="/src/img/endomorfo.jpg" alt="" v-if="endomorfo">
                    <img class="rounded-xl" src="/src/img/ectomorfo.jpg" alt="" v-if="ectomorfo">


                </div>


            </div>


        </div>


        <!-- VENTANA PDF -->

        <div class=" p-16 border border-blue-950 border-opacity-70 rounded-xl mx-auto w-[40rem] overflow-hidden flex-col flex shadow-2xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-white z-50 absolute  "
            v-if="pdfs">
            <div class=" cursor-pointer  right-10 top-8 absolute" @click="closedpdf()">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>

            </div>

            <p class="mx-auto mb-10 font-semibold text-2xl">LECTOR DE PDF MEDICO</p>
            <label class="font-semibold mx-auto text-gray-500 mb-10" for="">Como funciona? Ingrese un PDF medico donde
                le haremos unas indicaciones segun la informacion proporcionada </label>
            <VuePDF v-if="pdfLoaded" :pdf="pdf" @text-loaded="onLoaded"
                class=" w-60 h-96 text-center items-center flex justify-center" />
            <div class="flex items-center justify-center w-full mb-7" v-if="recibido">
                <label for="dropzone-file"
                    class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Haz Click
                                para
                                Subir</span> o arrastra el archivo</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">PDF, .TXT, XML or CSV (MAX. 5.12MB)</p>
                    </div>
                    <input id="dropzone-file" @change="files($event)" type="file" class="hidden" />
                </label>
            </div>

            <button
                class=" p-2 text-center absolute rounded-md bg-[#2D3688] text-white mt-12 bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                @click="closedpdf()">Agregar</button>
        </div>

        <div class="flex w-full  ">
            <div class=" rounded-md border border-gray-100 p-6   flex z-2 w-[1200px] "
                v-bind:class="{ ' border-none blur-sm': ventana || ventana2 || ventana3 || ventanasoma }" v-if="true">
                <div class="flex  flex-col bg-white p-6 shadow-md shadow-black/5 rounded-md">
                    <label class="font-semibold mx-auto text-gray-500 mb-10" for="">Grafica Azucar Consumida </label>

                    <Bar />
                </div>
            </div>


            <div class=" rounded-md border border-gray-100 py-6    flex z-2 w-[600px]">
                <div class="flex  flex-col bg-white p-6 shadow-md shadow-black/5 rounded-md">
                    <label class="font-semibold mx-auto text-gray-500 mb-10" for="">Grafica Trigliceridos</label>

                    <Rounded />
                </div>
            </div>
        </div>
        
        

        





        <div class="bg-white pt-14 mx-auto ">
            <div class=" text-2xl text-center font-semibold">
                <span class="text-blue-600">Sugar</span><span class=""> Check</span>
            </div>
            <div class="text-center text-gray-600">
                A hearing aid is an electronic device worn inside or behind the ear. Amplifies certain sounds
            </div>
            <div class="bg-white h-14 flex items-center mt-5 ">
                <footer class="container max-w-6xl mx-auto flex justify-center">
                    <img src="/src/img/LogoufpsoMen17.png" class="h-10 w-40">
                </footer>
            </div>
        </div>


    </main>
    <!-- end: Main -->

</template>
