<template>
  <router-link :to="link">
    <q-item clickable tag="a" target="_blank" class="text-black">
      <q-item-section>
        <q-item-label>{{ title }}</q-item-label>
      </q-item-section>
      <div>{{ countMessages }}</div>
    </q-item>
  </router-link>
</template>

<script lang="ts">
import { useBasketMessagesStore } from 'src/stores/basketMessages-store';
import { useDraftsStore } from 'src/stores/drafts-store';
import { useIncomeMessagesStore } from 'src/stores/incomeMessages-store';
import { useLayoutStore } from 'src/stores/layout-store';
import { useOutcomeMessagesStore } from 'src/stores/outcomeMessages-store';
import { defineComponent, ref } from 'vue';
import { IMessage } from './models';

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      default: '/',
    },
    messageType: {
      type: String,
      required: true,
      validator: (val: IMessage['type'] | 'basket') =>
        ['income', 'outcome', 'draft', 'basket'].includes(val),
    },
  },
  setup(props) {
    const layoutStore = useLayoutStore();
    const countMessages = ref(
      layoutStore.getMessagesCount(
        props.messageType as IMessage['type'] | 'basket'
      )
    );
    if (props.messageType === 'income') {
      useIncomeMessagesStore().$subscribe((_, state) => {
        countMessages.value = state.incomeMessagesQuantity;
      });
    }
    if (props.messageType === 'outcome') {
      useOutcomeMessagesStore().$subscribe((_, state) => {
        countMessages.value = state.outcomeMessagesQuantity;
      });
    }
    if (props.messageType === 'draft') {
      useDraftsStore().$subscribe((_, state) => {
        countMessages.value = state.draftsQuantity;
      });
    }
    if (props.messageType === 'basket') {
      useBasketMessagesStore().$subscribe((_, state) => {
        countMessages.value = state.basketMessagesQuantity;
      });
    }
    return {
      countMessages,
    };
  },
});
</script>
