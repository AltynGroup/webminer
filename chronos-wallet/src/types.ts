export type ViewType = 'landing' | 'wallet';
export type SubViewType = 'none' | 'send' | 'swap' | 'history' | 'seed';

export interface Transaction {
  id: string;
  type: 'SEND' | 'SWAP';
  amount?: number;
  address?: string;
  fromAmount?: number;
  toAmount?: number;
  fromAsset?: string;
  toAsset?: string;
  date: Date;
}
