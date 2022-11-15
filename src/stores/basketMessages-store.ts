import { defineStore } from 'pinia';
import { IMessage } from 'src/components/models';

export const useBasketMessagesStore = defineStore('basketMessages', {
  state: () => ({
    basketMessages: [] as IMessage[],
    basketMessagesQuantity: 0,
  }),
  getters: {
    getBasketMessages: (state) => {
      return state.basketMessages;
    },
  },
  actions: {
    addMessage(message: IMessage) {
      this.basketMessages.push(message);
      this.basketMessagesQuantity = this.basketMessagesQuantity + 1;
    },
    deleteBasketMessages() {
      this.basketMessages = [];
      this.basketMessagesQuantity = 0;
    },
  },
});
