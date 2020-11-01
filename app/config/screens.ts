// Using strings as screen names to navigate between screens is kinda
// bad practice. Defining consts for screen navigation.
export const screens = {
  basic: {
    splash: 'splash',
    introJobs: 'intro1',
    introCompany: 'intro2',
    navigator: 'basic-navigator',
    login: 'login',
    register: 'register',
    register_company:'register-company',
    register_user:'register-user',
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
      newsfeed: 'user-newsfeed',
      search: 'user-search',
      notification: 'user-notification',
      messages: 'user-messages',
      following: 'user-following',
      settings: 'user-settings',
    }
  }
}
