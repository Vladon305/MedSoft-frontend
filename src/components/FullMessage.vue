<template>
  <q-card flat bordered class="my-card card">
    <div class="icon">
      <q-icon
        name="ion-close-circle"
        color="black"
        size="3rem"
        @click="toggleSplitter()"
      />
    </div>
    <q-card-section>
      <div class="text-h6">{{ currentMessage.title }}</div>
    </q-card-section>

    <q-card-section class="q-pt-none"
      >{{ currentMessage.message }}
    </q-card-section>

    <q-separator inset />

    <a :href="`http://localhost:5000/${currentMessage.file}`" target="_blank">
      <q-card-section>{{ currentMessage.file }} </q-card-section>
    </a>
  </q-card>
</template>

<script lang="ts">
import { useLayoutStore } from 'src/stores/layout-store';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const layoutStore = useLayoutStore();

    const currentMessage = ref(layoutStore.currentMessage);

    layoutStore.$subscribe((_, state) => {
      currentMessage.value = state.currentMessage;
    });

    return {
      currentMessage,
      toggleSplitter: layoutStore.toggleSplitter,
    };
  },
});
</script>

<style scoped>
.card {
  position: relative;
}
.icon {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
}
</style>
