import { Timestamp } from "firebase/firestore";

export type Terme = {
  id: string;
  term: string;
  jour: string;
  createdAt?: Timestamp;
  posted: boolean;
};
