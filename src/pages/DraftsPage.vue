<!-- eslint-disable vue/no-unused-vars -->
<template>
  <div class="q-pa-md">
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>Черновик</q-toolbar-title>
    </q-toolbar>

    <q-list bordered>
      <q-item
        v-for="message in draftsStore.getDrafts"
        class="q-my-sm"
        :key="message.id"
        clickable
        v-ripple
      >
        <message-item
          :message="message"
          @delete-func="draftsStore.deleteDraft"
        />
      </q-item>
    </q-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import MessageItem from 'src/components/MessageItem.vue';
import { useDraftsStore } from 'src/stores/drafts-store';

export default defineComponent({
  name: 'DraftsPage',
  components: { MessageItem },
  setup() {
    const draftsStore = useDraftsStore();

    onMounted(() => {
      draftsStore.fetchDrafts();
    });

    return {
      draftsStore,
    };
  },
});
</script>
