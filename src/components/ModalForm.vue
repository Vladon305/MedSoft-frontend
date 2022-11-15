<template>
  <div class="q-pa-md q-gutter-sm" style="display: flex; justify-content: end">
    <q-btn
      label="+"
      color="primary"
      @click="card = true"
      style="position: fixed; right: 15px; bottom: 10px; z-index: 10"
    />

    <q-dialog v-model="card">
      <q-card class="my-card">
        <div class="q-pa-md" style="max-width: 400px">
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-input
              filled
              v-model="title"
              label="Заголовок"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Пожалуйста заполните поля',
              ]"
            />

            <q-input
              v-model="message"
              filled
              type="textarea"
              label="Сообщение"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Пожалуйста заполните поля',
              ]"
            />

            <q-file
              v-model="file"
              label="Выберите файлы"
              filled
              style="max-width: 300px"
            />

            <div>
              <q-btn label="В черновик" type="submit" color="primary" />
              <q-btn
                label="Очистить"
                type="reset"
                color="primary"
                flat
                class="q-ml-sm"
              />
            </div>
          </q-form>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { useDraftsStore } from 'src/stores/drafts-store';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ModalForm',

  setup() {
    const title = ref('');
    const message = ref('');
    const card = ref(false);
    const file = ref<File | null>(null);

    const draftsStore = useDraftsStore();

    return {
      title,
      message,
      card,
      file,

      onSubmit() {
        draftsStore.addDraft({
          title: title.value,
          message: message.value,
          file: file.value,
        });
        title.value = '';
        message.value = '';
        file.value = null;
        card.value = false;
      },

      onReset() {
        title.value = '';
        message.value = '';
      },
    };
  },
});
</script>
