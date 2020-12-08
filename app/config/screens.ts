// Using strings as screen names to navigate between screens is kinda
// bad practice. Defining consts for screen navigation.
export const screens = {
  basic: {
    splash: 'splash',
    introJobs: 'intro1',
    introCompany: 'intro2',
    navigator: 'basic-navigator',
    login: 'login',
    register: {
      main: 'register-main',
      company: 'register-company',
      user: 'register-user',
    },
  },
  authenticated: {
    company: {
      navigator: 'company-navigator',
      drawer: 'company-drawer',
      home: 'company-home-navigator',
      profile: 'company-profile',
      editprofile: 'company-edit-profile',
      jobs: 'company-jobs',
      messages: 'company-messages',
      settings: 'company-settings',
      jobcreate: 'create-job',
    },
    user: {
      navigator: 'user-navigator',
      drawer: 'user-drawer',
      home: 'user-home-navigator',
      profile: 'user-profile',
      editprofile: 'user-edit-profile',
      newsfeed: {
        navigator: 'user-newsfeed-navigator',
        main: 'user-newsfeed-main',
        write: 'user-newsfeed-write',
        show: 'user-newsfeed-show',
      },
      search: 'user-search',
      notification: 'user-notification',
      messages: 'user-messages',
      following: 'user-following',
      settings: 'user-settings',
      comment: 'user-comment',
    },
  },
}
