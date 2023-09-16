export interface User {
  user_id: number;
  username: string;
  hash: string;
  role: 'master' | 'admin' | 'guest' | 'unset';
  last_seen: any;
}
