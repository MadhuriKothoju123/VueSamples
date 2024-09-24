<template>
  <!-- <div class="snackbar">
    <v-snackbar
      v-model="showAlert"
      multi-line
      :location="'top right'"
      :color="AlertProps?.color"
    >
      {{ AlertProps?.alertMessage }}

      <template v-slot:actions>
        <v-btn color="white" variant="text" @click="showAlert = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div> -->
  <Alert :alert="showAlert" :alertProps="alertProps" @closeAlert="closeAlert"/>

  <v-container>
    <v-sheet width="800" class="mx-auto">
      <v-card
        class="mx-auto pa-12 pb-8"
        style="margin-top: 170px"
        elevation="8"
      >
        <h2
          style="
            margin-top: 14px;
            margin-bottom: 45px;
            display: flex;
            justify-content: center;
          "
        >
          SIGN IN
        </h2>

        <form ref="form" @submit.prevent="loginUser()">
          <div class="text-subtitle-1 text-medium-emphasis">Email</div>

          <v-text-field
            v-model="userData.email"
            name="email"
            placeholder="Enter email address"
            type="text"
            variant="outlined"
            density="compact"
            prepend-inner-icon="mdi-email-outline"
            required
          ></v-text-field>

          <div class="text-subtitle-1 text-medium-emphasis">Password</div>

          <v-text-field
            v-model="userData.password"
            type="password"
            name="password"
            density="compact"
            variant="outlined"
            placeholder="Enter Password"
            required
          ></v-text-field>
          <v-btn
            type="submit"
            style="width: 100%"
            class="mt-4"
            color="primary"
            value="log in"
            >Login</v-btn
          >
        </form>

        <div
          style="
            margin-top: 2px;
            margin-bottom: 20px;
            display: flex;
            justify-content: right;
          "
        >
          <a
            style="color: #1867c0; cursor: pointer"
            @click="setDialogOpen"
            color="primary"
          >
            forget password?
          </a>
        </div>
        <v-divider></v-divider>

        <p style="margin-top: 20px; display: flex; justify-content: center">
          Do you want create an account ? <br />
          <router-link to="/register">
            <p style="color: #1867c0">Click here</p></router-link
          >
        </p>
      </v-card>
    </v-sheet>
  </v-container>

  <v-dialog v-model="dialog" @onblur="setDialogOpen" max-width="500">
    <v-card>
      <v-card-title>Change Password</v-card-title>
      <v-card-text>
        <v-text-field v-model="email" label="Email" outlined></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="setDialogOpen">Close</v-btn>
        <v-btn color="primary" @click="sendPasswordReset"
          >Send Password Reset Email</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/userRegister";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { storeToRefs } from "pinia";
import Alert from "./Alert.vue";
const router = useRouter();
const userData = reactive({
  email: "",
  password: "",
});

let alertProps = reactive({
  color: "",
  alertMessage: "",
});

const email = ref("");
const dialog = ref(false);
const message = ref("");
const authStore = useAuthStore();
const alertMessage = ref("");
const showAlert = ref(false);
const { user } = storeToRefs(authStore);
const { login } = authStore;
const setDialogOpen = () => {
  dialog.value = !dialog.value;
};

const sendPasswordReset = async () => {
  try {
    await sendPasswordResetEmail(auth, email.value);
    alertMessage.value = "Password reset email sent. Please check your inbox.";
  } catch (error) {
    message.value = `Error: ${error.message}`;
  }
};
const loginUser = async () => {
  try {
    const res = await login(userData);
    if (res) {
      alertProps = { alertMessage: "Successfull Login", color: "#43A047" };
      showAlert.value = true;
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    }
  } catch (err) {
    alertProps = { alertMessage: err.message, color: "#EF5350" };
    showAlert.value = true;
    console.error(err.message);
  }
};

const closeAlert=()=>{
  showAlert.value= false
}
onMounted(() => {
  if (user) {
    router.push("/dashboard");
  } else {
    router.push("/");
  }
});
</script>
