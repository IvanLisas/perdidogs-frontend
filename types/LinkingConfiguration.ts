import * as Linking from 'expo-linking'
/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Chats: {
            screens: {
              Main: {
                screens: {
                  Chat: 'Chat'
                }
              }
            }
          },
          TabTwo: {
            screens: {
              TabTwoScreen: 'two'
            }
          }
        }
      },
      NotFound: '*'
    }
  }
}
