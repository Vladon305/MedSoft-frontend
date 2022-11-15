<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      style="margin-top: 50px"
    >
      <q-list>
        <EssentialLink
          v-for="link in layoutStore.getLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
      <div>
        <q-btn
          color="white"
          text-color="black"
          label="Отправить"
          @click="outcomeMessageStore.sendMessages"
        />
        <q-btn
          color="white"
          text-color="black"
          label="Получить"
          @click="incomeMessageStore.fetchMessages()"
        />
      </div>
    </q-drawer>
    <modal-form />
    <q-page-container>
      <div v-if="isFullMessage" v-bind="isFullMessage">
        <q-splitter v-model="splitterModel" horizontal style="height: 54rem">
          <template v-slot:before>
            <router-view />
          </template>

          <template v-slot:after>
            <div class="q-pa-md">
              <full-message />
            </div>
          </template>
        </q-splitter>
      </div>
      <div v-else>
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';
import ModalForm from '../components/ModalForm.vue';
import { useIncomeMessagesStore } from 'src/stores/incomeMessages-store';
import { useOutcomeMessagesStore } from 'src/stores/outcomeMessages-store';
import { useLayoutStore } from 'src/stores/layout-store';
import FullMessage from '../components/FullMessage.vue';
import { useDraftsStore } from 'src/stores/drafts-store';

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
    ModalForm,
    FullMessage,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    const incomeMessageStore = useIncomeMessagesStore();
    const outcomeMessageStore = useOutcomeMessagesStore();
    const draftsStore = useDraftsStore();
    const layoutStore = useLayoutStore();

    const isFullMessage = ref(false);
    layoutStore.$subscribe((_, state) => {
      isFullMessage.value = state.isFullMessage;
    });

    onMounted(() => {
      incomeMessageStore.fetchMessages();
      outcomeMessageStore.fetchMessages();
      draftsStore.fetchDrafts();
    });

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      incomeMessageStore,
      outcomeMessageStore,
      layoutStore,
      splitterModel: ref(50),
      isFullMessage,
      toggleSplitter: layoutStore.toggleSplitter,
    };
  },
});
</script>
