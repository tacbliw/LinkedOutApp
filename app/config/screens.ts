// Using strings as screen names to navigate between screens is kinda
// bad practice. Defining consts for screen navigation.
export const screens = {
  basic: {
    splash: 'splash',
    navigator: 'basic-navigator',
    login: 'login',
    register: 'register',
  },
  authenticated: {
    company: {
      navigator: 'company-navigator',
      home: 'company-home-navigator',
      profile: 'company-profile',
      jobs: 'company-jobs',
      messages: 'company-messages',
      settings: 'company-settings',
    },
    user: {
      navigator: 'user-navigator',
      home: 'user-home-navigator',
      profile: 'user-profile',
      editprofile: 'user-edit-profile',
      newsfeed: 'user-newsfeed',
      search: 'user-search',
      notification: 'user-notification',
      messages: 'user-messages',
      following: 'user-following',
      settings: 'user-settings',
    }
  }
}
