import { inputText } from 'actions/dev';

export default {
  name: 'LogIn Email Success',
  actions: [
    ...inputText('login', 'email-sign-in-email', 'testuser@example.com', 100),
    ...inputText('login', 'email-sign-in-password', 'correctaccount', 100), {
      type: 'AUTH_CURRENT_ENDPOINT_KEY',
      payload: 'default'
    }, {
      type: 'AUTH_EMAIL_SIGN_IN_START'
    }, {
      type: 'AUTH_CURRENT_ENDPOINT_KEY',
      payload: 'default'
    }, {
      type: 'UI_SNACKBAR_SHOW',
      payload: 'You are now signed in.',
      meta: {
        variant: 'success',
        title: 'Success'
      }
    }, {
      type: 'AUTH_AUTHENTICATE_COMPLETE',
      payload: {
        user: [
          {
            email: 'testuser@example.com',
            id: '30000000-0000-0000-0000-000000000000',
            password: 'dummypassword',
            roles: [
              'user',
              'admin'
            ],
            updatedAt: [],
            uid: '30000000-0000-0000-0000-000000000000'
          }
        ],
        endpoints: {
          default: {
            auth: {
              logout: '/users/logout',
              login: '/users/login',
              register: '/users/register',
              passwordReset: '/users/password_reset',
              validateToken: '/users/validate_token',
              providers: {
                github: '/users/login/github',
                facebook: '/users/login/facebook',
                google: '/users/login/google_oauth2'
              }
            },
            help: {
              contactEmail: '/contact/email',
              contactLive: '/contact/live'
            },
            apiUrl: 'http://localhost:3000/api'
          },
          user: {
            users: {
              update: '/users/update',
              delete: '/users/delete',
              updatePassword: '/users/password_update'
            },
            songs: {
              update: '/songs/update',
              delete: '/songs/delete',
              add: '/songs/add'
            },
            fields: {
              update: '/fields/update',
              delete: '/fields/delete',
              add: '/fields/add'
            }
          },
          admin: {
            listModels: '/admin/list/models',
            listAll: '/admin/list/all'
          }
        }
      }
    }, {
      type: '@@redux-form/DESTROY',
      meta: {
        form: [
          'login'
        ]
      }
    }, {
      type: 'AUTH_EMAIL_SIGN_IN_COMPLETE',
      payload: {
        user: [
          {
            email: 'testuser@example.com',
            id: '30000000-0000-0000-0000-000000000000',
            password: 'dummypassword',
            roles: [
              'user',
              'admin'
            ],
            updatedAt: [],
            uid: '30000000-0000-0000-0000-000000000000'
          }
        ],
        endpoint: 'default'
      }
    }, {
      type: 'API_SONGS_FETCH_START'
    }, {
      type: '@@router/LOCATION_CHANGE',
      payload: {
        location: {
          pathname: '/songs',
          search: '',
          hash: '',
          key: '5rstep'
        },
        action: 'PUSH'
      }
    }, {
      type: 'ORM_LOAD_ARTISTS',
      payload: [
        {
          firstName: 'Frederic',
          id: '20000000-0000-0000-0000-000000000000',
          images: [
            {
              file: 'chopin.jpg',
              status: 'public',
              user: '0'
            }
          ],
          lastName: 'Chopin',
          status: 'public',
          updatedAt: [],
          user: '0'
        },
        {
          firstName: 'Ludwig van',
          id: '20000000-0000-0000-0000-000000000001',
          images: [
            {
              file: 'beethoven.jpg',
              status: 'public',
              user: '0'
            }
          ],
          lastName: 'Beethoven',
          status: 'public',
          updatedAt: [],
          user: '0'
        },
        {
          firstName: 'Nikolai',
          id: '20000000-0000-0000-0000-000000000002',
          images: [],
          lastName: 'Rimsky-Korsakov',
          status: 'public',
          updatedAt: [],
          user: '0'
        },
        {
          firstName: 'Johann',
          id: '20000000-0000-0000-0000-000000000003',
          images: [],
          lastName: 'Pachelbel',
          status: 'public',
          updatedAt: [],
          user: '0'
        },
        {
          firstName: 'Wolfgang Amadeus',
          id: '20000000-0000-0000-0000-000000000004',
          images: [
            {
              file: 'mozart.jpg',
              status: 'public',
              user: '0'
            }
          ],
          lastName: 'Mozart',
          status: 'public',
          updatedAt: [],
          user: '0'
        },
        {
          firstName: 'Antonio',
          id: '20000000-0000-0000-0000-000000000005',
          images: [],
          lastName: 'Vivaldi',
          status: 'public',
          updatedAt: [],
          user: '0'
        },
        {
          firstName: 'Johann Sebastian',
          id: '20000000-0000-0000-0000-000000000006',
          images: [
            {
              file: 'bach.jpg',
              status: 'public',
              user: '0'
            }
          ],
          lastName: 'Bach',
          status: 'public',
          updatedAt: [],
          user: '0'
        },
        {
          firstName: 'Pyotr Ilyich',
          id: '20000000-0000-0000-0000-000000000007',
          images: [
            {
              file: 'tchaikovsky.jpg',
              status: 'public',
              user: '0'
            }
          ],
          lastName: 'Tchaikovsky',
          status: 'public',
          updatedAt: [],
          user: '0'
        },
        {
          firstName: 'Richard',
          id: '20000000-0000-0000-0000-000000000008',
          images: [
            {
              file: 'wagner.jpg',
              status: 'public',
              user: '0'
            }
          ],
          lastName: 'Wagner',
          status: 'public',
          updatedAt: [],
          user: '0'
        },
        {
          firstName: 'Joseph',
          id: '20000000-0000-0000-0000-000000000009',
          images: [
            {
              file: 'haydn.jpg',
              status: 'public',
              user: '0'
            }
          ],
          lastName: 'Haydn',
          status: 'public',
          updatedAt: [],
          user: '0'
        },
        {
          firstName: 'Robert',
          id: '20000000-0000-0000-0000-000000000010',
          images: [
            {
              file: 'schumann.jpg',
              status: 'public',
              user: '0'
            }
          ],
          lastName: 'Schumann',
          status: 'public',
          updatedAt: [],
          user: '0'
        },
        {
          firstName: 'Felix',
          id: '20000000-0000-0000-0000-000000000011',
          images: [
            {
              file: 'mendelssohn.jpg',
              status: 'public',
              user: '0'
            }
          ],
          lastName: 'Mendelssohn',
          status: 'public',
          updatedAt: [],
          user: '0'
        },
        {
          firstName: 'Antonin',
          id: '20000000-0000-0000-0000-000000000012',
          images: [
            {
              file: 'dvorak.jpg',
              status: 'public',
              user: '0'
            }
          ],
          lastName: 'Dvorak',
          status: 'public',
          updatedAt: [],
          user: '0'
        },
        {
          firstName: 'Franz',
          id: '20000000-0000-0000-0000-000000000013',
          images: [
            {
              file: 'liszt.jpg',
              status: 'public',
              user: '0'
            }
          ],
          lastName: 'Liszt',
          status: 'public',
          updatedAt: [],
          user: '0'
        },
        {
          firstName: 'Igor',
          id: '20000000-0000-0000-0000-000000000014',
          images: [
            {
              file: 'stravinsky.jpg',
              status: 'public',
              user: '0'
            }
          ],
          lastName: 'Stravinsky',
          status: 'public',
          updatedAt: [],
          user: '0'
        },
        {
          firstName: 'Giuseppe',
          id: '20000000-0000-0000-0000-000000000015',
          images: [
            {
              file: 'verdi.jpg',
              status: 'public',
              user: '0'
            }
          ],
          lastName: 'Verdi',
          status: 'public',
          updatedAt: [],
          user: '0'
        },
        {
          firstName: 'Gustav',
          id: '20000000-0000-0000-0000-000000000016',
          images: [
            {
              file: 'mahler.jpg',
              status: 'public',
              user: '0'
            }
          ],
          lastName: 'Mahler',
          status: 'public',
          updatedAt: [],
          user: '0'
        },
        {
          firstName: 'Dmitri',
          id: '20000000-0000-0000-0000-000000000017',
          images: [
            {
              file: 'shostakovich.jpg',
              status: 'public',
              user: '0'
            }
          ],
          lastName: 'Shostakovich',
          status: 'public',
          updatedAt: [],
          user: '0'
        },
        {
          firstName: 'Richard',
          id: '20000000-0000-0000-0000-000000000018',
          images: [
            {
              file: 'strauss.jpg',
              status: 'public',
              user: '0'
            }
          ],
          lastName: 'Strauss',
          status: 'public',
          updatedAt: [],
          user: '0'
        },
        {
          firstName: 'Hector',
          id: '20000000-0000-0000-0000-000000000019',
          images: [
            {
              file: 'berlioz.jpg',
              status: 'public',
              user: '0'
            }
          ],
          lastName: 'Berlioz',
          status: 'public',
          updatedAt: [],
          user: '0'
        },
        {
          firstName: 'Claude',
          id: '20000000-0000-0000-0000-000000000020',
          images: [
            {
              file: 'debussy.jpg',
              status: 'public',
              user: '0'
            }
          ],
          lastName: 'Debussy',
          status: 'public',
          updatedAt: [],
          user: '0'
        },
        {
          firstName: 'Giacomo',
          id: '20000000-0000-0000-0000-000000000021',
          images: [
            {
              file: 'puccini.jpg',
              status: 'public',
              user: '0'
            }
          ],
          lastName: 'Puccini',
          status: 'public',
          updatedAt: [],
          user: '0'
        },
        {
          firstName: 'Giovanni Pierluigi da',
          id: '20000000-0000-0000-0000-000000000022',
          images: [
            {
              file: 'palestrina.jpg',
              status: 'public',
              user: '0'
            }
          ],
          lastName: 'Palestrina',
          status: 'public',
          updatedAt: [],
          user: '0'
        },
        {
          firstName: 'Anton',
          id: '20000000-0000-0000-0000-000000000023',
          images: [
            {
              file: 'bruckner.jpg',
              status: 'public',
              user: '0'
            }
          ],
          lastName: 'Bruckner',
          status: 'public',
          updatedAt: [],
          user: '0'
        },
        {
          firstName: 'Joseph',
          id: '20000000-0000-0000-0000-000000000024',
          images: [
            {
              file: 'brahms.jpg',
              status: 'public',
              user: '0'
            }
          ],
          lastName: 'Brahms',
          status: 'public',
          updatedAt: [],
          user: '0'
        },
        {
          firstName: 'Franz',
          id: '20000000-0000-0000-0000-000000000025',
          images: [
            {
              file: 'schubert.jpg',
              status: 'public',
              user: '0'
            }
          ],
          lastName: 'Schubert',
          status: 'public',
          updatedAt: [],
          user: '0'
        },
        {
          firstName: 'Georg Friedrich',
          id: '20000000-0000-0000-0000-000000000026',
          images: [
            {
              file: 'handel.jpg',
              status: 'public',
              user: '0'
            }
          ],
          lastName: 'Handel',
          status: 'public',
          updatedAt: [],
          user: '0'
        },
        {
          firstName: 'Carl Philipp Emanuel',
          id: '20000000-0000-0000-0000-000000000027',
          images: [],
          lastName: 'Bach',
          status: 'public',
          updatedAt: [],
          user: '0'
        },
        {
          firstName: 'Clara',
          id: '20000000-0000-0000-0000-000000000028',
          images: [],
          lastName: 'Schumann',
          status: 'public',
          updatedAt: [],
          user: '0'
        }
      ]
    }, {
      type: 'ORM_LOAD_INSTRUMENTS',
      payload: [
        {
          id: '40000000-0000-0000-0000-000000000000',
          images: [
            {
              file: 'piano.png',
              status: 'public',
              user: '0'
            }
          ],
          name: 'Piano',
          status: 'public',
          updatedAt: [],
          user: '30000000-0000-0000-0000-000000000000'
        },
        {
          id: '40000000-0000-0000-0000-000000000001',
          images: [
            {
              file: 'guitar.png',
              status: 'public',
              user: '0'
            }
          ],
          name: 'Guitar',
          status: 'public',
          updatedAt: [],
          user: '30000000-0000-0000-0000-000000000000'
        },
        {
          id: '40000000-0000-0000-0000-000000000002',
          images: [
            {
              file: 'voice.png',
              status: 'public',
              user: '0'
            }
          ],
          name: 'Voice',
          status: 'public',
          updatedAt: [],
          user: '30000000-0000-0000-0000-000000000000'
        },
        {
          id: '40000000-0000-0000-0000-000000000003',
          images: [
            {
              file: 'drums.png',
              status: 'public',
              user: '0'
            }
          ],
          name: 'Drums',
          status: 'public',
          updatedAt: [],
          user: '30000000-0000-0000-0000-000000000000'
        }
      ]
    }, {
      type: 'ORM_LOAD_GENRES',
      payload: [
        {
          id: '50000000-0000-0000-0000-000000000000',
          images: [
            {
              file: 'classical.png',
              status: 'public',
              user: '0'
            }
          ],
          name: 'Classical',
          status: 'public',
          updatedAt: [],
          user: '30000000-0000-0000-0000-000000000000'
        },
        {
          id: '50000000-0000-0000-0000-000000000001',
          images: [],
          name: 'Rock & Roll',
          status: 'public',
          updatedAt: [],
          user: '30000000-0000-0000-0000-000000000000'
        },
        {
          id: '50000000-0000-0000-0000-000000000002',
          images: [
            {
              file: 'jazz.png',
              status: 'public',
              user: '0'
            }
          ],
          name: 'Jazz',
          status: 'public',
          updatedAt: [],
          user: '30000000-0000-0000-0000-000000000000'
        },
        {
          id: '50000000-0000-0000-0000-000000000003',
          images: [
            {
              file: 'exercises.png',
              status: 'public',
              user: '0'
            }
          ],
          name: 'Technical Exercises',
          status: 'public',
          updatedAt: [],
          user: '30000000-0000-0000-0000-000000000000'
        }
      ]
    }, {
      type: 'ORM_LOAD_FIELDS',
      payload: [
        {
          id: '60000000-0000-0000-0000-000000000003',
          label: 'My Youtube Video',
          typeId: 7,
          updatedAt: [],
          user: '30000000-0000-0000-0000-000000000000'
        },
        {
          id: '60000000-0000-0000-0000-000000000007',
          label: 'My Checkbox',
          typeId: 4,
          updatedAt: [],
          user: '30000000-0000-0000-0000-000000000000'
        },
        {
          id: '60000000-0000-0000-0000-000000000000',
          label: 'My Year Composed',
          typeId: 0,
          updatedAt: [],
          user: '30000000-0000-0000-0000-000000000000'
        },
        {
          id: '60000000-0000-0000-0000-000000000008',
          label: 'My Checkbox 2',
          typeId: 4,
          updatedAt: [],
          user: '30000000-0000-0000-0000-000000000000'
        },
        {
          id: '60000000-0000-0000-0000-000000000011',
          label: 'My Metronome Goal',
          typeId: 11,
          updatedAt: [],
          user: '30000000-0000-0000-0000-000000000000'
        },
        {
          id: '60000000-0000-0000-0000-000000000004',
          label: 'My Example Slider',
          typeId: 9,
          updatedAt: [],
          user: '30000000-0000-0000-0000-000000000000'
        },
        {
          id: '60000000-0000-0000-0000-000000000002',
          label: 'My Associated Moods',
          options: [
            'Aggressive',
            'Cathartic',
            'Cerebral',
            'Energetic',
            'Gloomy',
            'Intense',
            'Marching',
            'Melancholy',
            'Mellow',
            'Playful',
            'Reflective',
            'Sensual',
            'Sentimental',
            'Spooky',
            'Theatrical',
            'Triumphant',
            'Turbulent',
            'Upbeat',
            'Uplifting'
          ],
          typeId: 3,
          updatedAt: [],
          user: '30000000-0000-0000-0000-000000000000'
        },
        {
          id: '60000000-0000-0000-0000-000000000006',
          label: 'My Radio Buttons',
          options: [
            'Silver',
            'Gold',
            'Platinum',
            'Jimmmy Buffet'
          ],
          typeId: 5,
          updatedAt: [],
          user: '30000000-0000-0000-0000-000000000000'
        },
        {
          id: '60000000-0000-0000-0000-000000000001',
          label: 'My Composition Key',
          options: [
            'C Major',
            'C Minor',
            'C# Major',
            'C# Minor',
            'D Major',
            'D Minor',
            'Eb Major',
            'Eb Minor',
            'F Major',
            'F Minor',
            'F# Major',
            'F# Minor',
            'G Major',
            'G Minor',
            'Ab Major',
            'G# Minor',
            'A Major',
            'A Minor',
            'Bb Major',
            'Bb Minor',
            'B Major',
            'B Minor'
          ],
          typeId: 2,
          updatedAt: [],
          user: '30000000-0000-0000-0000-000000000000'
        },
        {
          id: '60000000-0000-0000-0000-000000000009',
          label: 'My PDF Link',
          typeId: 8,
          updatedAt: [],
          user: '30000000-0000-0000-0000-000000000000'
        },
        {
          id: '60000000-0000-0000-0000-000000000010',
          label: 'My Metronome',
          typeId: 10,
          updatedAt: [],
          user: '30000000-0000-0000-0000-000000000000'
        },
        {
          id: '60000000-0000-0000-0000-000000000005',
          label: 'My Multi-Select',
          options: [
            'Theatrical',
            'Triumphant',
            'Turbulent',
            'Upbeat',
            'Uplifting'
          ],
          typeId: 3,
          updatedAt: [],
          user: '30000000-0000-0000-0000-000000000000'
        }
      ]
    }, {
      type: 'ORM_LOAD_FIELD_TABS',
      payload: [
        {
          fields: [
            '60000000-0000-0000-0000-000000000004',
            '60000000-0000-0000-0000-000000000005',
            '60000000-0000-0000-0000-000000000006',
            '60000000-0000-0000-0000-000000000007',
            '60000000-0000-0000-0000-000000000008'
          ],
          id: '61111111-0000-0000-0000-000000000002',
          name: 'My Other Silly Fields',
          updatedAt: [],
          user: '30000000-0000-0000-0000-000000000000'
        },
        {
          fields: [
            '60000000-0000-0000-0000-000000000000',
            '60000000-0000-0000-0000-000000000001'
          ],
          id: '61111111-0000-0000-0000-000000000000',
          name: 'Extra Fields',
          updatedAt: [],
          user: '30000000-0000-0000-0000-000000000000'
        },
        {
          fields: [
            '60000000-0000-0000-0000-000000000009',
            '60000000-0000-0000-0000-000000000010'
          ],
          id: '61111111-0000-0000-0000-000000000003',
          name: 'Metronome',
          updatedAt: [],
          user: '30000000-0000-0000-0000-000000000000'
        },
        {
          fields: [
            '60000000-0000-0000-0000-000000000002',
            '60000000-0000-0000-0000-000000000003'
          ],
          id: '61111111-0000-0000-0000-000000000001',
          name: 'My Media',
          updatedAt: [],
          user: '30000000-0000-0000-0000-000000000000'
        }
      ]
    }, {
      type: 'ORM_LOAD_SONGS',
      payload: [
        {
          artist: '20000000-0000-0000-0000-000000000000',
          difficulty: 6,
          genre: '50000000-0000-0000-0000-000000000000',
          id: '1569a8c3-331a-44c5-b2ae-1e17a6206e73',
          instrument: '40000000-0000-0000-0000-000000000000',
          progress: 4,
          title: 'Nocturne in B-flat minor Op.9 No.1',
          updatedAt: [],
          user: '30000000-0000-0000-0000-000000000000',
          userFields: [
            {
              id: '60000000-0000-0000-0000-000000000000',
              ref: 'cfield-0',
              value: 1838
            },
            {
              id: '60000000-0000-0000-0000-000000000001',
              ref: 'cfield-1',
              value: 'Bb Major'
            },
            {
              id: '60000000-0000-0000-0000-000000000002',
              ref: 'cfield-2',
              value: [
                'Intense',
                'Theatrical'
              ]
            },
            {
              id: '60000000-0000-0000-0000-000000000003',
              ref: 'cfield-3',
              value: 'gxXSlhO4a5A'
            }
          ]
        },
        {
          artist: '20000000-0000-0000-0000-000000000007',
          difficulty: 10,
          genre: '50000000-0000-0000-0000-000000000000',
          id: '71c7ab5e-e43e-426a-b1e0-f06d226ba354',
          instrument: '40000000-0000-0000-0000-000000000000',
          progress: 1,
          title: 'Dance of the Sugar Plum Fairy from "The Nutcracker"',
          updatedAt: [],
          user: '30000000-0000-0000-0000-000000000000',
          userFields: [
            {
              id: '60000000-0000-0000-0000-000000000000',
              ref: 'cfield-0',
              value: 1892
            },
            {
              id: '60000000-0000-0000-0000-000000000001',
              ref: 'cfield-1',
              value: 'D Minor'
            },
            {
              id: '60000000-0000-0000-0000-000000000002',
              ref: 'cfield-2',
              value: [
                'Cathartic',
                'Turbulent',
                'Intense'
              ]
            },
            {
              id: '60000000-0000-0000-0000-000000000003',
              ref: 'cfield-3',
              value: 'TPFFx3KRwEQ'
            }
          ]
        },
        {
          artist: '20000000-0000-0000-0000-000000000001',
          difficulty: 5,
          genre: '50000000-0000-0000-0000-000000000000',
          id: '86f7e249-06bf-4761-94d5-393c088a4b1b',
          instrument: '40000000-0000-0000-0000-000000000000',
          progress: 2,
          title: 'Bagatelle in A minor (Fur Elise)',
          updatedAt: [],
          user: '30000000-0000-0000-0000-000000000000',
          userFields: [
            {
              id: '60000000-0000-0000-0000-000000000000',
              ref: 'cfield-0',
              value: 1810
            },
            {
              id: '60000000-0000-0000-0000-000000000001',
              ref: 'cfield-1',
              value: 'A Minor'
            },
            {
              id: '60000000-0000-0000-0000-000000000002',
              ref: 'cfield-2',
              value: [
                'Cathartic',
                'Turbulent',
                'Intense'
              ]
            },
            {
              id: '60000000-0000-0000-0000-000000000003',
              ref: 'cfield-3',
              value: 'yAsDLGjMhFI'
            }
          ]
        },
        {
          artist: '20000000-0000-0000-0000-000000000001',
          difficulty: 7,
          genre: '50000000-0000-0000-0000-000000000000',
          id: 'e395eef8-21e3-47f0-93f8-de7b5bde3267',
          instrument: '40000000-0000-0000-0000-000000000000',
          progress: 2,
          title: 'Piano Sonata No.1 Op.2 in F minor',
          updatedAt: [],
          user: '30000000-0000-0000-0000-000000000000',
          userFields: [
            {
              id: '60000000-0000-0000-0000-000000000000',
              ref: 'cfield-0',
              value: 1795
            },
            {
              id: '60000000-0000-0000-0000-000000000001',
              ref: 'cfield-1',
              value: 'F Minor'
            },
            {
              id: '60000000-0000-0000-0000-000000000002',
              ref: 'cfield-2',
              value: [
                'Cathartic',
                'Turbulent',
                'Intense'
              ]
            },
            {
              id: '60000000-0000-0000-0000-000000000003',
              ref: 'cfield-3',
              value: '9oIdtq9E2ZU'
            }
          ]
        },
        {
          artist: '20000000-0000-0000-0000-000000000000',
          difficulty: 6,
          genre: '50000000-0000-0000-0000-000000000000',
          id: '4eff5dc3-c5f3-4cf7-8d34-04db74a0e935',
          instrument: '40000000-0000-0000-0000-000000000000',
          progress: 1,
          title: 'Nocturne in E-flat major Op.9 No.2',
          updatedAt: [],
          user: '30000000-0000-0000-0000-000000000000',
          userFields: [
            {
              id: '60000000-0000-0000-0000-000000000000',
              ref: 'cfield-0',
              value: 1830
            },
            {
              id: '60000000-0000-0000-0000-000000000001',
              ref: 'cfield-1',
              value: 'Eb Major'
            },
            {
              id: '60000000-0000-0000-0000-000000000002',
              ref: 'cfield-2',
              value: [
                'Reflective',
                'Sentimental'
              ]
            },
            {
              id: '60000000-0000-0000-0000-000000000003',
              ref: 'cfield-3',
              value: 'tV5U8kVYS88'
            }
          ]
        },
        {
          artist: '20000000-0000-0000-0000-000000000005',
          difficulty: 6,
          genre: '50000000-0000-0000-0000-000000000000',
          id: '8898a3db-b59e-49d7-8d97-4d2246e9e953',
          instrument: '40000000-0000-0000-0000-000000000000',
          progress: 0,
          title: 'Concerto No.1 in E major Spring from "The Four Seasons"',
          updatedAt: [],
          user: '30000000-0000-0000-0000-000000000000',
          userFields: [
            {
              id: '60000000-0000-0000-0000-000000000000',
              ref: 'cfield-0',
              value: 1723
            },
            {
              id: '60000000-0000-0000-0000-000000000001',
              ref: 'cfield-1',
              value: 'E Major'
            },
            {
              id: '60000000-0000-0000-0000-000000000002',
              ref: 'cfield-2',
              value: [
                'Cathartic',
                'Turbulent',
                'Intense'
              ]
            },
            {
              id: '60000000-0000-0000-0000-000000000003',
              ref: 'cfield-3',
              value: 'Ocd5MWydCzU'
            }
          ]
        },
        {
          artist: '20000000-0000-0000-0000-000000000004',
          difficulty: 5,
          genre: '50000000-0000-0000-0000-000000000000',
          id: 'f45528ce-aae0-4d94-9dd7-52fd67c37e70',
          instrument: '40000000-0000-0000-0000-000000000000',
          progress: 1,
          title: 'Eine Kleine Nachtmusik (Serenade for Strings in G Major)',
          updatedAt: [],
          user: '30000000-0000-0000-0000-000000000000',
          userFields: [
            {
              id: '60000000-0000-0000-0000-000000000000',
              ref: 'cfield-0',
              value: 1787
            },
            {
              id: '60000000-0000-0000-0000-000000000001',
              ref: 'cfield-1',
              value: 'G Major'
            },
            {
              id: '60000000-0000-0000-0000-000000000002',
              ref: 'cfield-2',
              value: [
                'Cathartic',
                'Turbulent',
                'Intense'
              ]
            },
            {
              id: '60000000-0000-0000-0000-000000000003',
              ref: 'cfield-3',
              value: 'ElCb0Ar1ee4'
            }
          ]
        },
        {
          artist: '20000000-0000-0000-0000-000000000002',
          difficulty: 14,
          genre: '50000000-0000-0000-0000-000000000000',
          id: '53f3e75f-b256-4678-9795-419218e32af4',
          instrument: '40000000-0000-0000-0000-000000000000',
          progress: 0,
          title: 'The Flight of the Bumblebee (The Tale of Tsar Saltan Act III)',
          updatedAt: [],
          user: '30000000-0000-0000-0000-000000000000',
          userFields: [
            {
              id: '60000000-0000-0000-0000-000000000000',
              ref: 'cfield-0',
              value: 1899
            },
            {
              id: '60000000-0000-0000-0000-000000000001',
              ref: 'cfield-1',
              value: 'A Minor'
            },
            {
              id: '60000000-0000-0000-0000-000000000002',
              ref: 'cfield-2',
              value: [
                'Cathartic',
                'Turbulent',
                'Intense'
              ]
            },
            {
              id: '60000000-0000-0000-0000-000000000003',
              ref: 'cfield-3',
              value: '8alxBofd_eQ'
            }
          ]
        },
        {
          artist: '20000000-0000-0000-0000-000000000000',
          difficulty: 10,
          genre: '50000000-0000-0000-0000-000000000000',
          id: 'cd1bec54-640d-4a1e-9c69-c917661017c3',
          instrument: '40000000-0000-0000-0000-000000000000',
          progress: 1,
          title: '12 Études Op. 10 No.1 in C major "Waterfall"',
          updatedAt: [],
          user: '30000000-0000-0000-0000-000000000000',
          userFields: [
            {
              id: '60000000-0000-0000-0000-000000000000',
              ref: 'cfield-0',
              value: 1830
            },
            {
              id: '60000000-0000-0000-0000-000000000001',
              ref: 'cfield-1',
              value: 'C Major'
            },
            {
              id: '60000000-0000-0000-0000-000000000002',
              ref: 'cfield-2',
              value: [
                'Intense'
              ]
            },
            {
              id: '60000000-0000-0000-0000-000000000003',
              ref: 'cfield-3',
              value: '9E82wwNc7r8'
            }
          ]
        },
        {
          artist: '20000000-0000-0000-0000-000000000004',
          difficulty: 8,
          genre: '50000000-0000-0000-0000-000000000000',
          id: 'cdff75a3-9171-47b9-a0b6-4af0485df8d8',
          instrument: '40000000-0000-0000-0000-000000000000',
          progress: 3,
          title: 'Piano Sonata No.11 in A major (Turkish March)',
          updatedAt: [],
          user: '30000000-0000-0000-0000-000000000000',
          userFields: [
            {
              id: '60000000-0000-0000-0000-000000000000',
              ref: 'cfield-0',
              value: 1783
            },
            {
              id: '60000000-0000-0000-0000-000000000001',
              ref: 'cfield-1',
              value: 'A Major'
            },
            {
              id: '60000000-0000-0000-0000-000000000002',
              ref: 'cfield-2',
              value: [
                'Cathartic',
                'Turbulent',
                'Intense'
              ]
            },
            {
              id: '60000000-0000-0000-0000-000000000003',
              ref: 'cfield-3',
              value: 'uWYmUZTYE78'
            }
          ]
        },
        {
          artist: '20000000-0000-0000-0000-000000000006',
          difficulty: 5,
          genre: '50000000-0000-0000-0000-000000000000',
          id: 'daf46881-1f87-4e75-ada8-28f973e0c527',
          instrument: '40000000-0000-0000-0000-000000000000',
          progress: 2,
          title: 'Orchestral Suite No.3 in D Major (Air on the G String)',
          updatedAt: [],
          user: '30000000-0000-0000-0000-000000000000',
          userFields: [
            {
              id: '60000000-0000-0000-0000-000000000000',
              ref: 'cfield-0',
              value: 1730
            },
            {
              id: '60000000-0000-0000-0000-000000000001',
              ref: 'cfield-1',
              value: 'D Major'
            },
            {
              id: '60000000-0000-0000-0000-000000000002',
              ref: 'cfield-2',
              value: [
                'Cathartic',
                'Turbulent',
                'Intense'
              ]
            },
            {
              id: '60000000-0000-0000-0000-000000000003',
              ref: 'cfield-3',
              value: 'vNkIj_BhHvY'
            }
          ]
        },
        {
          artist: '20000000-0000-0000-0000-000000000000',
          difficulty: 4,
          genre: '50000000-0000-0000-0000-000000000000',
          id: '3fe131cc-2e2b-4720-a122-e283e5fe3303',
          instrument: '40000000-0000-0000-0000-000000000000',
          progress: 3,
          title: 'Prelude in E minor Op.28 No.4',
          updatedAt: [],
          user: '30000000-0000-0000-0000-000000000000',
          userFields: [
            {
              id: '60000000-0000-0000-0000-000000000000',
              ref: 'cfield-0',
              value: 1838
            },
            {
              id: '60000000-0000-0000-0000-000000000001',
              ref: 'cfield-1',
              value: 'E Minor'
            },
            {
              id: '60000000-0000-0000-0000-000000000002',
              ref: 'cfield-2',
              value: [
                'Cerebral',
                'Energetic',
                'Intense',
                'Marching'
              ]
            },
            {
              id: '60000000-0000-0000-0000-000000000003',
              ref: 'cfield-3',
              value: 'https://www.youtube.com/watch?v=vYZS05S9qeI'
            }
          ]
        },
        {
          artist: '20000000-0000-0000-0000-000000000003',
          difficulty: 3,
          genre: '50000000-0000-0000-0000-000000000000',
          id: '48bdf054-3981-4521-8cd9-27ff275e1603',
          instrument: '40000000-0000-0000-0000-000000000000',
          progress: 1,
          title: 'Canon in D',
          updatedAt: [],
          user: '30000000-0000-0000-0000-000000000000',
          userFields: [
            {
              id: '60000000-0000-0000-0000-000000000000',
              ref: 'cfield-0',
              value: 1680
            },
            {
              id: '60000000-0000-0000-0000-000000000001',
              ref: 'cfield-1',
              value: 'D Major'
            },
            {
              id: '60000000-0000-0000-0000-000000000002',
              ref: 'cfield-2',
              value: [
                'Cathartic',
                'Turbulent',
                'Intense'
              ]
            },
            {
              id: '60000000-0000-0000-0000-000000000003',
              ref: 'cfield-3',
              value: 'pnpgDzDeTjc'
            }
          ]
        },
        {
          artist: '20000000-0000-0000-0000-000000000001',
          difficulty: 2,
          genre: '50000000-0000-0000-0000-000000000000',
          id: '0797d46e-44c6-48d1-90e8-699cdc7eb80d',
          instrument: '40000000-0000-0000-0000-000000000000',
          progress: 4,
          title: 'Piano Sonata No.14 Op.27 (Moonlight) in C# Minor',
          updatedAt: [],
          user: '30000000-0000-0000-0000-000000000000',
          userFields: [
            {
              id: '60000000-0000-0000-0000-000000000000',
              ref: 'cfield-0',
              value: 1801
            },
            {
              id: '60000000-0000-0000-0000-000000000001',
              ref: 'cfield-1',
              value: 'C# Minor'
            },
            {
              id: '60000000-0000-0000-0000-000000000002',
              ref: 'cfield-2',
              value: [
                'Cathartic',
                'Turbulent',
                'Intense'
              ]
            },
            {
              id: '60000000-0000-0000-0000-000000000003',
              ref: 'cfield-3',
              value: 'SqciMXaABjA'
            }
          ]
        },
        {
          artist: '20000000-0000-0000-0000-000000000000',
          difficulty: 10,
          genre: '50000000-0000-0000-0000-000000000000',
          id: '2128e86d-7edc-456c-af41-eee90230cca0',
          instrument: '40000000-0000-0000-0000-000000000000',
          progress: 4,
          title: '12 Études Op. 10 No.4 in C-sharp minor "Torrent"',
          updatedAt: [],
          user: '30000000-0000-0000-0000-000000000000',
          userFields: [
            {
              id: '60000000-0000-0000-0000-000000000000',
              ref: 'cfield-0',
              value: 1832
            },
            {
              id: '60000000-0000-0000-0000-000000000001',
              ref: 'cfield-1',
              value: 'C# Minor'
            },
            {
              id: '60000000-0000-0000-0000-000000000002',
              ref: 'cfield-2',
              value: [
                'Cathartic',
                'Turbulent',
                'Intense'
              ]
            },
            {
              id: '60000000-0000-0000-0000-000000000003',
              ref: 'cfield-3',
              value: 'mUVCGsWhwHU'
            }
          ]
        },
        {
          artist: '20000000-0000-0000-0000-000000000000',
          difficulty: 10,
          genre: '50000000-0000-0000-0000-000000000000',
          id: '35705de0-194f-4b60-8808-bbc923ebf1a0',
          instrument: '40000000-0000-0000-0000-000000000000',
          progress: 4,
          title: '12 Études Op.10 No.12 in C minor "Revolutionary"',
          updatedAt: [],
          user: '30000000-0000-0000-0000-000000000000',
          userFields: [
            {
              id: '60000000-0000-0000-0000-000000000000',
              ref: 'cfield-0',
              value: 1838
            },
            {
              id: '60000000-0000-0000-0000-000000000001',
              ref: 'cfield-1',
              value: 'C Minor'
            },
            {
              id: '60000000-0000-0000-0000-000000000002',
              ref: 'cfield-2',
              value: [
                'Cerebral',
                'Energetic',
                'Intense',
                'Marching'
              ]
            },
            {
              id: '60000000-0000-0000-0000-000000000003',
              ref: 'cfield-3',
              value: 'Gi5VTBdKbFM'
            }
          ],
          year: 1831
        }
      ]
    }, {
      type: 'UI_INIT_VIEW_COMPLETE',
      payload: 'Songs',
      meta: {
        pathname: '/login',
        actionSets: {
          common: {
            submitHelp: {
              name: 'Submit Help',
              actions: [
                {}
              ]
            },
            EmailLogin: {
              name: 'LogIn - Email',
              actions: [
                {
                  type: 'UI_DRAWER_MENU_TOGGLE'
                },
                {
                  type: 'AUTH_SIGN_OUT_START',
                  endpoint: 'default'
                },
                {
                  type: 'UI_SNACKBAR_SHOW',
                  payload: 'You have successfully logged out of your account.',
                  meta: {
                    variant: 'success'
                  }
                },
                {
                  type: 'AUTH_SIGN_OUT_COMPLETE',
                  user: {
                    status: 200,
                    success: true,
                    records: [
                      {
                        email: 'testuser@example.com',
                        id: '30000000-0000-0000-0000-000000000000',
                        roles: [
                          'user',
                          'admin'
                        ],
                        updatedAt: []
                      }
                    ]
                  },
                  endpoint: 'default'
                },
                {
                  type: '@@router/LOCATION_CHANGE',
                  payload: {
                    location: {
                      pathname: '/login',
                      hash: '',
                      search: '?redirect=%2Fsongs',
                      key: 'p4s8r1'
                    },
                    action: 'REPLACE'
                  }
                },
                {
                  type: 'UI_INIT_VIEW_START',
                  payload: 'Login'
                },
                {
                  type: 'UI_INIT_VIEW_COMPLETE',
                  payload: 'Login',
                  meta: {
                    pathname: '/login'
                  }
                },
                {
                  type: 'AUTH_CURRENT_ENDPOINT_KEY',
                  payload: 'default'
                },
                {
                  type: 'UI_DRAWER_MENU_HIDE'
                }
              ]
            }
          }
        }
      }
    }, {
      type: '@@redux-form/INITIALIZE',
      meta: {
        form: 'songEdit',
        keepDirty: false,
        updateUnregisteredFields: false
      },
      payload: {}
    }, {
      type: 'UI_SNACKBAR_HIDE'
    }, {
      type: 'UI_SNACKBAR_EXIT'
    }
  ]
};
