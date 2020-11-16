
export interface GlobalState {
  /**
   * User access token.
   */
  accessToken?: string;
  accountId?: string;
  accountType?: string;
  accountName?: string;
}

export const defaultGlobalState: GlobalState = {
  accessToken: null,
  accountId: null,
  accountType: null,
  accountName: null,
}
