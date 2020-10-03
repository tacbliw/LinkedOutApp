
export interface GlobalState {
  /**
   * User access token.
   */
  accessToken?: string;

}

export const defaultGlobalState: GlobalState = {
  accessToken: null
}
