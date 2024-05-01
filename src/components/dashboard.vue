<script setup>


import {  RouterLink } from 'vue-router'

</script>

<template>
      <div class="fixed left-0 top-0 w-64 h-full bg-gray-900 p-4 z-50 transition-transform">
        <a href="#" class="flex items-center pb-4 border-b border-b-gray-800">
            <img src="/src/img/logov2.png" alt="" class="w-8 h-8 rounded object-cover">
            <span class="text-lg font-bold text-white ml-3">Sugar Check</span>
        </a>
        <ul class="mt-4">
            <li class="mb-1 group active">
                <a href="#" class="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
                    <i class="ri-home-2-line mr-3 text-lg"></i>
                    <span class="text-sm">Dashboard</span>
                </a>
            </li>
            <li class="mb-1 group">
                <a href="#" class="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle">
                    <i class="ri-instance-line mr-3 text-lg"></i>
                    <span class="text-sm">Calcular IMC</span>
                    <i class="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-90"></i>
                </a>
                
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
                <a href="#" class="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
                    <i class="ri-settings-2-line mr-3 text-lg"></i>
                    <RouterLink to="/" class="text-sm">Cerrar Sesion</RouterLink>
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
                <div class="bg-white rounded-md border border-gray-100 p-12 shadow-md shadow-black/5">
                    <div class="flex justify-between mb-6">
                        <div>
                            <div class="text-2xl font-semibold mb-1">Dato Calculado</div>
                            <div class="text-sm font-medium text-gray-400">Sobrepeso/..</div>
                        </div>
                    
                    </div>
                    <a href="#" class="text-blue-500 font-medium text-sm hover:text-blue-600">Calcular IMC</a>
                </div>
                <div class="bg-white rounded-md border border-gray-100 p-12 shadow-md shadow-black/5">
                    <div class="flex justify-between mb-6">
                        <div>
                            <div class="text-2xl font-semibold mb-1">Dato Calculado</div>
                            <div class="text-sm font-medium text-gray-400">Azucar/..</div>
                        </div>
                    
                    </div>
                    <a href="#" class="text-blue-500 font-medium text-sm hover:text-blue-600">Calcular Glucosa</a>
                </div>
                
            </div>
            
            </div>
        
    </main>
    <!-- end: Main -->

</template>