export const PAGES_MENU = [
  {
    path: 'user',
    children: [
      {
        path: 'strategies-list',
        data: {
          menu: {
            title: 'Strategy Board',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0,
            id: 'strategies-list'
          }
        }
      },
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
        path: 'my-strategies',
        data: {
          menu: {
            title: 'Strategies',
            icon: 'fa fa-list',
            selected: false,
            expanded: false,
            order: 0,
            id: 'my-strategies'
          }
        },children: [
          {
            path: 'recommended',
            data: {
              menu: {
                title: 'Recommended',
                icon: '',
                selected: false,
                expanded: false,
                order: 0,

              }
            }
          },
          {
            path: 'following',
            data: {
              menu: {
                title: 'Following',
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
        path: 'my-trades',
        data: {
          menu: {
            title: 'Trades',
            icon: 'fa fa-sitemap',
            selected: false,
            expanded: false,
            order: 0,
            id:"my-trades"
          }
        },children: [
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
          },
          {
            path: 'expiring',
            data: {
              menu: {
                title: 'Expired',
                icon: '',
                selected: false,
                expanded: false,
                order: 0
              }
            }
          },
          {
            path: 'favorite',
            data: {
              menu: {
                title: 'Favorite',
                icon: '',
                selected: false,
                expanded: false,
                order: 0
              }
            }
          }, 
          {
            path: 'free',
            data: {
              menu: {
                title: 'Free',
                icon: '',
                selected: false,
                expanded: false,
                order: 0
              }
            }
          },         
          {
            path: 'paid',
            data: {
              menu: {
                title: 'Paid',
                icon: '',
                selected: false,
                expanded: false,
                order: 0
              }
            }
          },
          {
            path: 'custom',
            data: {
              menu: {
                title: 'Custom',
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
        path: 'my-orders',
        data: {
          menu: {
            title: 'Orders',
            icon: 'fa fa-file-text',
            selected: false,
            expanded: false,
            order: 0,
            id:"my-orders"
          }
        },children: [
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
          }
        ]
      },{
        path: 'group-trades',
        data: {
          menu: {
            title: 'Group Trades',
            icon: 'fa fa-file-text',
            selected: false,
            expanded: false,
            order: 0,
            id:"group-trades"
          }
        },children: [
          {
            path: 'leader',
            data: {
              menu: {
                title: 'Leader',
                icon: '',
                selected: false,
                expanded: false,
                order: 0
              }
            }
          },
          {
            path: 'follower',
            data: {
              menu: {
                title: 'Follower',
                icon: '',
                selected: false,
                expanded: false,
                order: 0
              }
            }
          },
          {
            path: 'notifications',
            data: {
              menu: {
                title: 'Notifications',
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
        path: 'following',
        data: {
          menu: {
            title: 'Following',
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
        path: 'program-1000',
        data: {
          menu: {
            title: 'Program 1000',
            icon: 'fa fa-tasks',
            selected: false,
            expanded: false,
            order: 0,
            id:"program-1000"
          }
        }
      },
      {
        path: 'broker-information',
        data: {
          menu: {
            title: 'Broker Information',
            icon: 'fa fa-info-circle',
            selected: false,
            expanded: false,
            order: 0,
            id:"broker-information"
          }
        }
      },
      {
        path: 'analysts-list',
        data: {
          menu: {
            title: 'Analysts',
            icon: 'fa fa-user-secret',
            selected: false,
            expanded: false,
            order: 0,
            id:"analysts-list"
          }
        }
      },
      {
        path: 'notifications',
        data: {
          menu: {
            title: 'Notifications',
            icon: 'fa fa-bell',
            selected: false,
            expanded: false,
            order: 0,
            id:"notifications"
          }
        }
      },
      {
        path: 'lebar-payments',
        data: {
          menu: {
            title: 'LeBar Payments',
            icon: 'fa fa-file-text',
            selected: false,
            expanded: false,
            order: 0,
            id:"lebar-payments"
          }
        },children: [
          {
            path: 'move',
            data: {
              menu: {
                title: 'Move',
                icon: '',
                selected: false,
                expanded: false,
                order: 0
              }
            }
          },
          {
            path: 'history',
            data: {
              menu: {
                title: 'History',
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
        path: '',
        data: {
          menu: {
            title: 'Payments',
            icon: 'fa fa-usd',
            selected: false,
            expanded: false,
            order: 0,
            id:"payments"
          }
        },children: [
          {
            path: 'plans',
            data: {
              menu: {
                title: 'Plan and Credits',
                icon: '',
                selected: false,
                expanded: false,
                order: 0
              }
            }
          },
          {
            path: 'billing-info',
            data: {
              menu: {
                title: 'Billing Information',
                icon: '',
                selected: false,
                expanded: false,
                order: 0
              }
            }
          },
          {
            path: 'billing-history',
            data: {
              menu: {
                title: 'Billing History',
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
