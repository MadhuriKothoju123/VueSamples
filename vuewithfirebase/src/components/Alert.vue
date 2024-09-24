<template>
      <div class="snackbar">
    <v-snackbar
      v-model="showAlert"
      multi-line
      :location="'top right'"
      :color="alertProps?.color"
    >
      {{ alertProps?.alertMessage }}

      <template v-slot:actions>
        <v-btn color="white" variant="text" @click="closeAlert">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import { useAlertProperties } from '../composiable/alertProperties';
const {showAlert, alertProps, closeAlert, openAlert}= useAlertProperties()
console.log(alertProps);
console.log(showAlert)
onMounted(()=>
console.log("Hello")
)
// const props= defineProps({
//     alert:{
//         type: Boolean,
//         required: true
//     },
//     alertProps:{
//         color:{
//             type: String,
//             required: true
//         },
//         alertMessage: {
//             type: String,
//             required: true
//         }
//     }
// })
// const emit= defineEmits(['closeAlert'])
// const showAlert= ref(props?.alert);
// let AlertData= reactive({
//     color: props?.alertProps?.color,
//     alertMessage: props?.alertProps?.alertMessage
// });

// watch(()=>props?.alert,(newVal)=>{
//   showAlert.value= newVal
// })

// watch(()=>props?.alertProps,(newVal)=>{
//   AlertData= newVal
// })

// const closeAlertBar=()=>{
//   emit('closeAlert')
// }
</script>
