import { defineStore } from 'pinia';
import { IMessage } from 'src/components/models';
import { api } from '../boot/axios';
import { useDraftsStore } from './drafts-store';

export const useOutcomeMessagesStore = defineStore('outcomeMessages', {
  state: () => ({
    outcomeMessages: [] as IMessage[],
    outcomeMessagesQuantity: 0,
  }),
  getters: {
    getOutcomeMessages: (state) => {
      return state.outcomeMessages;
    },
  },
  actions: {
    async fetchMessages() {
      this.outcomeMessages = await api
        .get('messages/outcome')
        .then((res) => res.data);
      this.outcomeMessagesQuantity = this.outcomeMessages.length;
    },

    sendMessages() {
      const draftsStore = useDraftsStore();
      const drafts: IMessage[] = draftsStore.drafts?.map((draft) => ({
        ...draft,
        type: 'outcome',
      }));
      if (drafts.length >= 1) {
        api.post<IMessage[]>('messages/retyping', drafts);
        this.outcomeMessages = [...this.outcomeMessages, ...drafts];
        draftsStore.deleteDrafts();
      }
      this.outcomeMessagesQuantity = this.outcomeMessages.length;
    },
    deleteOutcomeMessage(messageId: string) {
      this.outcomeMessages = this.outcomeMessages.filter(
        (message) => message.id !== messageId
      );
      api.delete(`messages/${messageId}`);
      this.outcomeMessagesQuantity = this.outcomeMessagesQuantity - 1;
    },
  },
});
