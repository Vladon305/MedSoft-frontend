import { defineStore } from 'pinia';
import { IMessage } from 'src/components/models';
import { api } from '../boot/axios';
import { useBasketMessagesStore } from './basketMessages-store';

interface INewMessage {
  title: string;
  message: string;
  file: File | null;
}

export const useDraftsStore = defineStore('drafts', {
  state: () => ({
    drafts: [] as IMessage[],
    draftsQuantity: 0,
    draggable: {
      options: {},
      dragging: false,
    },
  }),
  getters: {
    getDrafts: (state) => {
      return state.drafts;
    },
  },
  actions: {
    async fetchDrafts() {
      this.drafts = await api.get('messages/draft').then((res) => res.data);
      this.draftsQuantity = this.drafts.length;
    },
    async addDraft(message: INewMessage) {
      const formData = new FormData();
      formData.append('title', message.title);
      formData.append('message', message.message);
      formData.append('type', 'draft');
      if (message.file) formData.append('file', message.file);
      const newMessage = await api
        .post<IMessage>('messages', formData)
        .then((res) => res.data);
      this.drafts.push(newMessage);
      this.draftsQuantity = this.draftsQuantity + 1;
    },
    deleteDraft(draftId: string) {
      const basketMessagesStore = useBasketMessagesStore();
      const draft = this.drafts.find((draft) => draft.id === draftId);
      this.drafts = this.drafts.filter((draft) => draft.id !== draftId);
      if (draft) basketMessagesStore.addMessage(draft);
      api.delete(`messages/${draftId}`);
      this.draftsQuantity = this.draftsQuantity - 1;
      basketMessagesStore.basketMessagesQuantity =
        basketMessagesStore.basketMessagesQuantity++;
    },
    deleteDrafts() {
      this.drafts = [];
      this.draftsQuantity = 0;
    },
  },
});
