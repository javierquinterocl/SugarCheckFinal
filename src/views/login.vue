<script setup>
import {  RouterView } from 'vue-router'
import { ref } from 'vue';

 const valor = ref(true);
 const rol = ref("");
 const valor2 = ref(false);
function toogleInicio(rolasignado) {
	valor.value = false;
    rol.value = " Como "+ rolasignado;
	valor2.value=true;
}
console.log(valor);


</script>

<template>
  <div class="bg-[#F2F5F6] h-screen mx-auto justify-center flex">
		<div class="flex h-[600px] bg-white p-10 m-auto rounded-xl shadow-md">
			<div class="flex">
				<div class="flex flex-col mx-auto px-28">
					<img class="h-36 w-40 mx-auto" src="../img/logov2.png" alt="" />

					<p class="text-[#102c57] mb-2 mt-2 text-center text-2xl font-bold ">
						Inicio de sesión 
					</p>
					<p class="text-[#102c57c4] mt-2 mb-2 text-center text-base font-semibold ">
					     {{ rol  }}
					</p>
					<a href="#" id="usuario" v-if="valor" @click="toogleInicio('Usuario')"
						class="bg-[#f0ebe3] hover:bg-[#f6f5f2] transition-colors m-2 text-[#102c57] p-4 rounded-xl shadow-md text-center">
						Usuario
					</a>
					<a href="#" v-if="valor" @click="toogleInicio('Profesional')"
						class="bg-[#f0ebe3] hover:bg-[#f6f5f2] transition-colors m-2 text-[#102c57] p-4 rounded-xl shadow-md text-center">
						Profesional
					</a>
					<a href="#" name="" v-if="valor" @click="toogleInicio('Admistrador')"
						class="bg-[#f0ebe3] hover:bg-[#f6f5f2] transition-colors m-2 text-[#102c57] p-4 rounded-xl shadow-md text-center">
						Administrador
					</a>

					

					<input type="email" name="" id="" placeholder="Correo" class=" mt-8 border-b-2 border-gray-200 p-1 outline-none" v-if="valor2">
					<input type="email" name="" id="" placeholder="Contraseña" class=" mt-8 border-b-2 border-gray-200 p-1 outline-none"  v-if="valor2">
					<RouterLink to="/dashboard"  class=" p-2 text-center rounded-md bg-[#2D3688] text-white mt-8"  v-if="valor2" >Iniciar Sesion</RouterLink>

				</div>
			</div>
			<div class="flex justify-center m-auto px-20">
				<img class="h-[400px] w-[400px]"
					src="https://img.freepik.com/vector-gratis/personas-sanas-llevando-diferentes-iconos_53876-66139.jpg?size=626&ext=jpg&ga=GA1.1.672697106.1713139200&semt=ais"
					alt="" />
			</div>
		</div>
	</div>
</template>