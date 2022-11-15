<template>
  <div class="q-pa-md">
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>Отправленные</q-toolbar-title>
    </q-toolbar>

    <q-list bordered>
      <q-item
        v-for="message in outcomeMessagesStore.getOutcomeMessages"
        :key="message.id"
        class="q-my-sm"
        clickable
        v-ripple
      >
        <message-item
          :message="message"
          @delete-func="outcomeMessagesStore.deleteOutcomeMessage"
        />
      </q-item>
    </q-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import MessageItem from 'src/components/MessageItem.vue';
import { useOutcomeMessagesStore } from 'src/stores/outcomeMessages-store';

export default defineComponent({
  name: 'OutcomePage',
  components: { MessageItem },
  setup() {
    const outcomeMessagesStore = useOutcomeMessagesStore();

    onMounted(() => {
      outcomeMessagesStore.fetchMessages();
    });

    return {
      outcomeMessagesStore,
    };
  },
});
</script>

<style></style>
