
export interface GlobalState {
  /**
   * User access token.
   */
  accessToken?: string;
  userId?: number;
}

export const defaultGlobalState: GlobalState = {
  accessToken: null,
  userId: null
}
