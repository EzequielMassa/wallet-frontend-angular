import {AuthStateInterface} from "../../pages/wallet/pages/auth/store/types/authState.interface";
import {HomeStateInterface} from "../../pages/wallet/pages/home/store/types/homeState.interface";

export interface AppStateInterface {
  auth: AuthStateInterface,
  home: HomeStateInterface,
}

