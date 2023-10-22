<script setup>
import { RouterLink, RouterView } from 'vue-router'
import ChatBox from './components/ChatBox.vue'
import Navbar from './components/Navbar.vue'
import TextArea from './components/TextArea.vue'
import { socket, state } from "./services/socket"
import { computed } from 'vue'

</script>

<template>
  <RouterView></RouterView>
</template>

<style scoped>

</style>
