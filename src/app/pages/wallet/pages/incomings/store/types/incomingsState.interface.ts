import {IncomingsMonthResponseInterface} from "../../../../../../shared/types/incomingsMonthResponse.interface";

export interface IncomingsStateInterface {
  isLoading: boolean;
  currentYearIncomings: IncomingsMonthResponseInterface[];
}
