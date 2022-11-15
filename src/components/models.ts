export interface IMessage {
  id: string;
  title: string;
  message: string;
  type: 'income' | 'outcome' | 'draft';
  file: string;
}
