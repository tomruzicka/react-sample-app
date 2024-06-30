import { IApiResult } from "@eway-crm/connector";

export type TContactsResopnse = IApiResult & {
  Data: TContact[];
};

export type TContact = {
  ItemGUID: string;
  FileAs: string | null;
  FirstName: string;
  LastName: string;
  Email1Address: string;
  TelephoneNumber1: string;
  Title: string;
  ProfilePicture: string;
  ItemCreated: string;
  LastActivity: string;
  BusinessAddressCity: string;
  BusinessAddressState: string;
  BusinessAddressStreet: string;
};
