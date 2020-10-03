
export interface LOGlobalState {
  /**
   * User access token.
   */
  accessToken?: string;

}

export const defaultGlobalState: LOGlobalState = {
  accessToken: null
}
