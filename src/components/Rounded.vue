<script setup>
import { ref, onMounted, onUnmounted } from 'vue';


const props = defineProps({
    triglicerio: Number,
    triglivalue: String,


});



const color = ref('#dce2ff')

const calcular = ref("Calcular")
const valuetrigli = ref(props.triglivalue)
const valuecal = ref(props.triglicerio);



const refresh = ref(0);
const activado = ref(true);

if (props.triglivalue == 'Alto') {
    color.value = "#ff406a"
    calcular.value = props.triglivalue;
    valuecal.value = props.triglicerio
    refresh.value++;
}
if (props.triglivalue == 'Bajo') {
    color.value = "#21bf83"
    calcular.value = props.triglivalue;
    valuecal.value = props.triglicerio
    refresh.value++;

} if (props.triglivalue == 'Medio') {
    color.value = "#fc8919"
    calcular.value = props.triglivalue;
    valuecal.value = props.triglicerio
    refresh.value++;
}


if (refresh.value > 0) {
    activado.value = false;
    const getChartOptions = () => {
        return {
            series: [valuecal.value],
            colors: [color.value],
            chart: {
                height: 1200,
                width: "100%",
                type: "donut",
            },
            stroke: {
                colors: ["transparent"],
                lineCap: "",
            },
            plotOptions: {
                pie: {
                    donut: {
                        labels: {
                            show: true,
                            name: {
                                show: true,
                                fontFamily: "Inter, sans-serif",
                                offsetY: 20,
                            },
                            total: {
                                showAlways: true,
                                show: true,
                                label: "Trigliceridos",
                                fontFamily: "Inter, sans-serif",
                                formatter: function (w) {
                                    const sum = w.globals.seriesTotals.reduce((a, b) => {
                                        return a + b
                                    }, 0)


                                    return valuecal.value + ' / ' + calcular.value
                                },
                            },
                            value: {
                                show: true,
                                fontFamily: "Inter, sans-serif",
                                offsetY: -20,
                                formatter: function (value) {
                                    return value + "k"
                                },
                            },
                        },
                        size: "80%",
                    },
                },
            },
            grid: {
                padding: {
                    top: -2,
                },
            },
            labels: [`${calcular.value}`],
            dataLabels: {
                enabled: false,
            },
            legend: {
                position: "bottom",
                fontFamily: "Inter, sans-serif",
            },
            yaxis: {
                labels: {
                    formatter: function (value) {
                        return value + " Triglicerio"
                    },
                },
            },
            xaxis: {
                labels: {
                    formatter: function (value) {
                        return value + "k"
                    },
                },
                axisTicks: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                },
            },
        }
    }

    onMounted(() => {
        const donus = document.querySelector('#donut-chart')
        if (donus && typeof ApexCharts !== 'undefined') {
            const chart = new ApexCharts(donus, getChartOptions());
            chart.render();

        }
    })
}
console.log(valuecal.value);







</script>


<template>
    <div class="w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">

        <div class="flex justify-between">
            <div class="flex justify-center items-center">
                <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white pe-1">Trigliceridos Grafica</h5>
                <svg data-popover-target="chart-info" data-popover-placement="bottom"
                    class="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ms-1"
                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm0 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm1-5.034V12a1 1 0 0 1-2 0v-1.418a1 1 0 0 1 1.038-.999 1.436 1.436 0 0 0 1.488-1.441 1.501 1.501 0 1 0-3-.116.986.986 0 0 1-1.037.961 1 1 0 0 1-.96-1.037A3.5 3.5 0 1 1 11 11.466Z" />
                </svg>
                <div data-popover id="chart-info" role="tooltip"
                    class="absolute z-10 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">
                    <div class="p-3 space-y-2">
                        <h3 class="font-semibold text-gray-900 dark:text-white">Activity growth - Incremental</h3>
                        <p>Report helps navigate cumulative growth of community activities. Ideally, the chart should
                            have a growing trend, as stagnating chart signifies a significant decrease of community
                            activity.</p>
                        <h3 class="font-semibold text-gray-900 dark:text-white">Calculation</h3>
                        <p>For each date bucket, the all-time volume of activities is calculated. This means that
                            activities in period n contain all activities up to period n, plus the activities generated
                            by your community in period.</p>
                        <a href="#"
                            class="flex items-center font-medium text-blue-600 dark:text-blue-500 dark:hover:text-blue-600 hover:text-blue-700 hover:underline">Read
                            more <svg class="w-2 h-2 ms-1.5 rtl:rotate-180" aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" d="m1 9 4-4-4-4" />
                            </svg></a>
                    </div>
                    <div data-popper-arrow></div>
                </div>
            </div>
            <div>
                <button type="button" data-tooltip-target="data-tooltip" data-tooltip-placement="bottom"
                    class="hidden sm:inline-flex items-center justify-center text-gray-500 w-8 h-8 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm"><svg
                        class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 16 18">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3" />
                    </svg><span class="sr-only">Download data</span>
                </button>
                <div id="data-tooltip" role="tooltip"
                    class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                    Download CSV
                    <div class="tooltip-arrow" data-popper-arrow></div>
                </div>
            </div>
        </div>

        <div>

        </div>

        <!-- Donut Chart -->

        <div class=" py-6 " id="donut-chart">

            <div class=" mx-auto" v-if="activado">
                <label class=" text-slate-600 text-center mx-auto" for="">Ingresar PDF Medico </label>
                <svg viewBox="0 0 40 40" width="300px" height="220px">
                    <circle cx="20" cy="20" r="16" fill="transparent" stroke="#dce2ff" stroke-width="4" />
                    <circle cx="20" cy="20" r="16" fill="transparent" stroke="#dce2ff" stroke-width="4"
                        :stroke-dasharray="circumference" :stroke-dashoffset="progressOffset" />
                </svg>
            </div>

        </div>



        <div class="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
            <div class="flex justify-between items-center pt-5">

                <span class="flex items-center text-sm text-gray-400 dark:text-white me-3"><span
                        class="flex w-2.5 h-2.5 bg-[#21bf83] rounded-full me-1.5 flex-shrink-0"></span>Bajo</span>
                <span class="flex items-center text-sm text-gray-400 dark:text-white me-3"><span
                        class="flex w-2.5 h-2.5 bg-[#fcbc31] rounded-full me-1.5 flex-shrink-0"></span>Medio</span>
                <span class="flex items-center text-sm text-gray-400 dark:text-white me-3"><span
                        class="flex w-2.5 h-2.5 bg-[#fc3131] rounded-full me-1.5 flex-shrink-0"></span>Alto</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.foreign-object-container {
    display: inline-flex;
    overflow: hidden;
    position: sticky;
    position: -webkit-sticky;
}

foreignObject {
    display: none;

}
</style>
