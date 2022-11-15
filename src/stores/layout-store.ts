import { defineStore } from 'pinia';
import { IMessage } from 'src/components/models';
import { useBasketMessagesStore } from './basketMessages-store';
import { useDraftsStore } from './drafts-store';
import { useIncomeMessagesStore } from './incomeMessages-store';
import { useOutcomeMessagesStore } from './outcomeMessages-store';

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    linksList: [
      {
        title: 'Входящие',
        link: '/income',
        messageType: 'income',
      },
      {
        title: 'Черновик',
        link: '/drafts',
        messageType: 'draft',
      },
      {
        title: 'Отправленные',
        link: '/outcome',
        messageType: 'outcome',
      },
      {
        title: 'Корзина',
        link: '/basket',
        messageType: 'basket',
      },
    ] as {
      title: string;
      link: string;
      messageType: IMessage['type'] | 'basket';
    }[],
    isFullMessage: false,
    currentMessage: null as unknown as IMessage,
  }),
  getters: {
    getMessagesCount: () => {
      const incomeMessagesStore = useIncomeMessagesStore();
      const outcomeMessagesStore = useOutcomeMessagesStore();
      const draftsStore = useDraftsStore();
      const basketMessagesStore = useBasketMessagesStore();
      return (messageType: IMessage['type'] | 'basket') => {
        if (messageType === 'income') {
          return incomeMessagesStore.incomeMessagesQuantity;
        }
        if (messageType === 'outcome') {
          return outcomeMessagesStore.outcomeMessagesQuantity;
        }
        if (messageType === 'draft') {
          return draftsStore.draftsQuantity;
        }
        if (messageType === 'basket') {
          return basketMessagesStore.basketMessagesQuantity;
        } else {
          return 0;
        }
      };
    },
    getLinks: (store) => {
      return store.linksList;
    },
  },
  actions: {
    toggleSplitter(message?: IMessage) {
      if (!this.currentMessage && message) {
        this.isFullMessage = !this.isFullMessage;
        this.currentMessage = message;
      }
      if (message && this.isFullMessage) {
        this.currentMessage = message;
      } else {
        this.isFullMessage = !this.isFullMessage;
      }
    },
  },
});
