<template>
  <div class="q-pa-md">
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>Корзина</q-toolbar-title>
    </q-toolbar>

    <q-list bordered>
      <q-item
        v-for="message in basketMessagesStore.getBasketMessages"
        :key="message.id"
        class="q-my-sm"
        clickable
        v-ripple
      >
        <message-item :message="message" :is-can-delete="false" />
      </q-item>
    </q-list>
    <q-btn
      style="background: #ff0080; color: white"
      label="Очистить корзину"
      @click="basketMessagesStore.deleteBasketMessages"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MessageItem from 'src/components/MessageItem.vue';
import { useBasketMessagesStore } from 'src/stores/basketMessages-store';

export default defineComponent({
  name: 'BasketPage',
  components: { MessageItem },
  setup() {
    const basketMessagesStore = useBasketMessagesStore();

    return {
      basketMessagesStore,
    };
  },
});
</script>

<style></style>
