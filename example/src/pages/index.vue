<script setup lang="ts">
import Tree from 'qh-tree/components/tree/tree.vue'
import { ref } from 'vue'
import type { TreeOption } from 'qh-tree'

const options = ref<TreeOption[]>([
  { label: '四川', value: 1 },
  { label: '重庆', value: 2 },
  { label: '湖南', value: 3 },
  { label: '湖北', value: 4 },
])
</script>

<template>
  <view>
    <Tree :options="options" />
  </view>
</template>
