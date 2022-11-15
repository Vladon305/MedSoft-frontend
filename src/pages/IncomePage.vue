<template>
  <div class="q-pa-md">
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>Входящие</q-toolbar-title>
    </q-toolbar>

    <q-list bordered>
      <q-item
        v-for="message in incomeMessagesStore.getIncomeMessages"
        :key="message.id"
        class="q-my-sm"
        clickable
        v-ripple
      >
        <message-item
          :message="message"
          @delete-func="incomeMessagesStore.deleteIncomeMessage"
        />
      </q-item>
    </q-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import MessageItem from 'src/components/MessageItem.vue';
import { useIncomeMessagesStore } from 'src/stores/incomeMessages-store';

export default defineComponent({
  name: 'IncomePage',
  components: { MessageItem },

  setup() {
    const incomeMessagesStore = useIncomeMessagesStore();

    onMounted(() => {
      incomeMessagesStore.fetchMessages();
    });

    return {
      incomeMessagesStore,
    };
  },
});
</script>
