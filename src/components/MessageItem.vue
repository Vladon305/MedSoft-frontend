<template>
  <q-item-section @click="layoutStore.toggleSplitter(message)">
    <q-item-label>{{ props.message.title }}</q-item-label>
    <q-item-label caption lines="1">{{ props.message.message }}</q-item-label>
  </q-item-section>

  <q-item-section side v-if="props.isCanDelete">
    <q-icon name="ion-trash" color="black" size="3rem" @click="deleteFn" />
  </q-item-section>
</template>

<script setup lang="ts">
import { defineProps, withDefaults, defineEmits } from 'vue';
import { IMessage } from 'components/models';
import { useLayoutStore } from 'src/stores/layout-store';

const props = withDefaults(
  defineProps<{
    message: IMessage;
    isCanDelete?: boolean;
  }>(),
  {
    isCanDelete: true,
  }
);

const layoutStore = useLayoutStore();

const emits = defineEmits(['deleteFunc']);

const deleteFn = () => {
  emits('deleteFunc', props.message.id);
};
</script>
