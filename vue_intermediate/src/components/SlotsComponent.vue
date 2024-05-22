<template>
 
  <v-dialog  v-model="isModalOpen" :max-width=maxWidth >
    <v-card :style="{ height: cardHeight}">
      <v-card-title>
        <slot name="title"></slot>
      </v-card-title>
      <v-card-text>
        <slot name="content" :todoItem=todoItem :date=date :status=status :note=note ></slot>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <slot :setModalClose="setModalClose" name="actions"></slot>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script setup>
import {  ref } from 'vue';
import { useRouter } from 'vue-router';
console.log("child");

const {openModal, maxWidth, cardHeight }= defineProps({
  openModal: Boolean,
  maxWidth: {
    type: String,
    default: '500px'
  },
  cardHeight: {
    type: String,
    default: 'auto'
  }

});
const router= useRouter();
const isModalOpen = ref(openModal);

const setModalClose=()=>{
  isModalOpen.value= false;
  router.go(-1);
}

</script>
