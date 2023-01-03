export const PAGES_MENU_AUTHOR = [
  {
    path: 'author',
    children: [
      {
        path: '',
        data: {
          menu: {
            title: 'Profile',
            icon: 'fa fa-user',
            selected: false,
            expanded: true,
            order: 0,
            id: 'profile'
          }
        },children: [
          {
            path: 'profile',
            data: {
              menu: {
                title: 'My Profile',
                icon: '',
                selected: false,
                expanded: false,
                order: 0
              }
            }
          },
          {
            path: 'edit-profile',
            data: {
              menu: {
                title: 'Edit Profile',
                icon: '',
                selected: false,
                expanded: false,
                order: 0
              }
            }
          },
          {
            path: 'change-password',
            data: {
              menu: {
                title: 'Change Password',
                icon: '',
                selected: false,
                expanded: false,
                order: 0
              }
            }
          }
        ]
      },
      {
        path: 'qualifications',
        data: {
          menu: {
            title: 'My Qualifications',
            icon: 'fa fa-graduation-cap',
            selected: false,
            expanded: false,
            order: 0,
            id: 'qualifications'
          }
        }
      },
      {
        path: 'customers',
        data: {
          menu: {
            title: 'My Customers',
            icon: 'fa fa-user-plus',
            selected: false,
            expanded: false,
            order: 0,
            id: 'customers'
          }
        }
      },
      {
        path: 'followers',
        data: {
          menu: {
            title: 'My Followers',
            icon: 'fa fa-dedent',
            selected: false,
            expanded: false,
            order: 0,
            id: 'followers'
          }
        }
      },
       {
        path: 'following',
        data: {
          menu: {
            title: 'My Following',
            icon: 'fa fa-dedent',
            selected: false,
            expanded: false,
            order: 0,
            id:"following"
          }
        },children: [
        {
          path: 'publications',
          data: {
            menu: {
              title: 'Publications',
              icon: '',
              selected: false,
              expanded: false,
              order: 0
            }
          }
        },
        {
          path: 'analysts',
          data: {
            menu: {
              title: 'Analysts',
              icon: '',
              selected: false,
              expanded: false,
              order: 0
            }
          }
        },
        {
          path: 'articles',
          data: {
            menu: {
              title: 'Articles',
              icon: '',
              selected: false,
              expanded: false,
              order: 0
            }
          }
        }]
      },
      {
        path: 'writings',
        data: {
          menu: {
            title: 'My Writings',
            icon: 'fa fa-file-text',
            selected: false,
            expanded: false,
            order: 0,
            id: 'writings'
          }
        },children: [
          {
            path: 'my-articles',
            data: {
              menu: {
                title: 'My Articles',
                icon: '',
                selected: false,
                expanded: false,
                order: 0
              }
            }
          }, {
            path: 'sambar-articles',
            data: {
              menu: {
                title: 'Sambar Articles',
                icon: '',
                selected: false,
                expanded: false,
                order: 0
              }
            }
          },{
            path: 'books',
            data: {
              menu: {
                title: 'Books',
                icon: '',
                selected: false,
                expanded: false,
                order: 0
              }
            }
          },
          {
            path: 'newsletters',
            data: {
              menu: {
                title: 'Newsletters',
                icon: '',
                selected: false,
                expanded: false,
                order: 0
              }
            }
          },{
            path: 'reports',
            data: {
              menu: {
                title: 'Reports',
                icon: '',
                selected: false,
                expanded: false,
                order: 0
              }
            }
          },
          {
            path: 'research',
            data: {
              menu: {
                title: 'Research',
                icon: '',
                selected: false,
                expanded: false,
                order: 0
              }
            }
          },
          {
            path: 'videos',
            data: {
              menu: {
                title: 'Videos',
                icon: '',
                selected: false,
                expanded: false,
                order: 0
              }
            }
          }
        ]
      },
      {
        path: 'trades',
        data: {
          menu: {
            title: 'My Trades',
            icon: 'fa fa-area-chart',
            selected: false,
            expanded: false,
            order: 0,
            id: 'trades'
          }
        }
      },
      {
        path: 'notifications',
        data: {
          menu: {
            title: 'My Notifications',
            icon: 'fa fa-bell',
            selected: false,
            expanded: false,
            order: 0,
            id: 'notifications'
          }
        }
      },
      {
        path: 'performance',
        data: {
          menu: {
            title: 'My Performance',
            icon: 'fa fa-line-chart',
            selected: false,
            expanded: false,
            order: 0,
            id: 'performance'
          }
        }, children: [
          {
            path: 'active',
            data: {
              menu: {
                title: 'Active',
                icon: '',
                selected: false,
                expanded: false,
                order: 0
              }
            }
          },{
            path: 'rollover',
            data: {
              menu: {
                title: 'Rollover',
                icon: '',
                selected: false,
                expanded: false,
                order: 0
              }
            }
          },
          {
            path: 'past',
            data: {
              menu: {
                title: 'Past',
                icon: '',
                selected: false,
                expanded: false,
                order: 0
              }
            }
          }]
      },
      {
        path: 'earnings',
        data: {
          menu: {
            title: 'My Earnings',
            icon: 'fa fa-usd',
            selected: false,
            expanded: false,
            order: 0,
            id: 'earnings'
          }
        }
      },
      {
        path: 'logout',
        data: {
          menu: {
            title: 'Logout',
            icon: 'fa fa-sign-out',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
    ]
  }
  
];
