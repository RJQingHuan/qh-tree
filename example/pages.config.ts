import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  pages: [],
  globalStyle: {
    backgroundColor: '#FFFFFF',
    backgroundColorBottom: '#FFFFFF',
    backgroundColorTop: '#FFFFFF',
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#FFFFFF',
    navigationBarTextStyle: 'black',
    navigationBarTitleText: 'qh-tree',
    usingComponents: {
      'qh-tree-item': 'node-modules/qh-tree/components/qh-tree-item/qh-tree-item',
    },
  },
})
