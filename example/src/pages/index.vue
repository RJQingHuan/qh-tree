<script setup lang="ts">
import Tree from 'qh-tree/components/qh-tree/qh-tree.vue'
import { ref } from 'vue'
import type { TreeOption } from 'qh-tree'

const options = ref<TreeOption[]>([
  {
    label: '四川',
    value: 1,
    children: [
      { label: '成都', value: 11 },
      {
        label: '绵阳',
        value: 12,
        children: [
          { label: '平武县', value: 121 },
          { label: '三台县', value: 122 },
          { label: '江油市', value: 123 },
        ],
      },
      {
        label: '广安',
        value: 13,
        children: [
          { label: '广安区', value: 131 },
          { label: '前锋区', value: 132 },
          { label: '华蓥市', value: 133 },
        ],
      },
      { label: '宜宾', value: 14 },
    ],
  },
  {
    label: '重庆',
    value: 2,
    children: [
      { label: '渝北区', value: 21 },
      { label: '万州区', value: 22 },
      { label: '北碚区', value: 23 },
      { label: '九龙坡区', value: 24 },
      { label: '永川区', value: 25 },
    ],
  },
  { label: '湖南', value: 3 },
  { label: '湖北', value: 4 },
])

const treeRef = ref<InstanceType<typeof Tree> | null>(null)

function getCheckedKeys() {
  // console.log(treeRef?.value.getCheckedNodes(true))
  // treeRef.value.setChecked([121, 122, 123], true)
}
</script>

<template>
  <view class="px-2 pt-2">
    <Tree ref="treeRef" :options="options" :accordion="true" :show-checkbox="false" />
    <button @click="getCheckedKeys">
      获取已选中
    </button>
  </view>
</template>
