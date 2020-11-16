
export interface GlobalState {
  /**
   * Account access token.
   */
  accessToken?: string;

  /**
   * Account Metadata
   */
  accountId?: string; // PLEASE MAKE SURE TO CONVERT THIS TO NUMBER :'(
  accountType?: string;
  accountName?: string;
}

export const defaultGlobalState: GlobalState = {
  accessToken: null,
  accountId: null,
  accountType: null,
  accountName: null,
}
