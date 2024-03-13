<script setup lang="ts">
import { computed, inject } from 'vue'
import { DefaultItemHeight, QhTreeConfigKey } from '../qh-tree'
import type { DataTreeOption } from '../qh-tree'

const props = defineProps<{
  data: DataTreeOption
}>()

defineEmits<{
  (e: 'toggleExpanded', data: DataTreeOption): void
}>()

const treeConfig = inject(QhTreeConfigKey)

const isLeaf = computed(() => props.data.children.length === 0)

const childrenHeight = computed(() => {
  if (!props.data.expanded)
    return 0

  let num = props.data.children.length
  const travel = (options: DataTreeOption[]) => {
    options.forEach((option) => {
      if (option.expanded && option.children.length) {
        num += option.children.length
        travel(option.children)
      }
    })
  }
  travel(props.data.children)
  return num * (treeConfig?.itemHeight || DefaultItemHeight)
})
</script>

<template>
  <view class="qh-tree-item" @touchstart.stop="$emit('toggleExpanded', data)">
    <view class="qh-tree-item__content" :style="{ height: `${treeConfig?.itemHeight || DefaultItemHeight}rpx` }">
      <view class="qh-tree-item__expand-icon" :class="{ 'is-leaf': isLeaf, 'is-expanded': data.expanded }">
        <image src="../static/arrow.png" />
      </view>
      <view class="qh-tree-item__label">
        {{ data.label }}
      </view>
      <view class="qh-tree-item__check" />
    </view>
    <view v-if="!isLeaf" class="qh-tree-item__children" :style="{ height: `${childrenHeight}rpx` }">
      <QhTreeItem
        v-for="item in data.children"
        :key="item.value"
        :data="item"
        @toggle-expanded="$emit('toggleExpanded', item)"
      />
    </view>
  </view>
</template>

<style lang="scss">
@import './tree';
</style>
