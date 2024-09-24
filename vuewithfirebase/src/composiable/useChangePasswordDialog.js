import { sendPasswordResetEmail } from 'firebase/auth';
import { ref } from 'vue';

const  usePasswordChangeDialog=() =>{
  const dialog = ref(false);
  const email = ref('');

  const setDialogOpen = () => {
    dialog.value = !dialog?.value;
  };
  
  const sendPasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email.value);
      alertMessage.value = "Password reset email sent. Please check your inbox.";
    } catch (error) {
      message.value = `Error: ${error.message}`;
    }
  };

  return {
    dialog,
    email,
    setDialogOpen,
    sendPasswordReset,
  };

}
export { usePasswordChangeDialog}