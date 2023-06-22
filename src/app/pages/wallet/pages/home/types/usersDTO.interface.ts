import {UserAccountInterface} from "./userAccount.interface";

export interface UsersDTOInterface {
 id: number;
 firstName: string;
 lastName: string;
 email: string;
 urlImg: string;
 accounts: UserAccountInterface[];
}
