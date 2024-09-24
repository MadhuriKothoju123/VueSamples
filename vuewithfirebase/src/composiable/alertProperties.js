import { sendPasswordResetEmail } from 'firebase/auth';
import { reactive, ref } from 'vue';

export const  useAlertProperties=() =>{
  const showAlert = ref(false);
  let alertProps= reactive({
    alertMessage: '',
    color: ''
  })

  const closeAlert = () => {
    alertProps=null;
    alert.value = false;
  };


  const openAlert=(alertProps)=>{
    alertProps=null;
   alertProps= alertProps;
   showAlert.value= true
  }
  
 

  return {
    showAlert,
    alertProps,
    closeAlert,
    openAlert
  };

}
