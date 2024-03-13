<script setup lang="ts">
import type { TreeOption } from './tree'

defineProps<{
  options: TreeOption[]
}>()
</script>

<template>
  <view class="qh-tree">
    tree
  </view>
</template>

<style lang="scss">
@import './tree';
</style>
