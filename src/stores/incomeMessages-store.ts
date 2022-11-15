import { defineStore } from 'pinia';
import { IMessage } from 'src/components/models';
import { api } from '../boot/axios';

export const useIncomeMessagesStore = defineStore('incomeMessages', {
  state: () => ({
    incomeMessages: [] as IMessage[],
    incomeMessagesQuantity: 0,
    page: 1,
  }),
  getters: {
    getIncomeMessages: (state) => {
      return state.incomeMessages;
    },
  },
  actions: {
    async fetchMessages() {
      const messages = await api
        .get(`messages/income?page=${this.page}`)
        .then((res) => res.data);
      this.incomeMessages = [...this.incomeMessages, ...messages];
      this.page = this.page + 1;
      this.incomeMessagesQuantity = this.incomeMessages.length;
    },
    deleteIncomeMessage(messageId: string) {
      this.incomeMessages = this.incomeMessages.filter(
        (message) => message.id !== messageId
      );
      api.delete(`messages/${messageId}`);

      this.incomeMessagesQuantity = this.incomeMessagesQuantity - 1;
    },
  },
});
