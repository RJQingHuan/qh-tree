<script setup lang="ts">
import { computed, inject } from 'vue'
import { DefaultItemHeight, QhTreeConfigKey, hasChildren } from '../qh-tree'
import type { DataTreeOption } from '../qh-tree'

const props = defineProps<{
  data: DataTreeOption
}>()

const treeConfig = inject(QhTreeConfigKey)

const childrenHeight = computed(() => {
  if (!props.data.expanded)
    return 0

  let num = props.data.children.length
  const travel = (options: DataTreeOption[]) => {
    options.forEach((option) => {
      if (option.expanded && hasChildren(option)) {
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
  <view class="qh-tree-item" @touchstart.stop="treeConfig?.toggleExpanded(data)">
    <view class="qh-tree-item__content" hover-class="qh-tree-item__content--hover" :style="{ height: `${treeConfig?.itemHeight || DefaultItemHeight}rpx` }">
      <view class="qh-tree-item__expand-icon" :class="{ 'is-leaf': data.leaf, 'is-expanded': data.expanded }">
        <image src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTM4NCAxOTJ2NjQwbDM4NC0zMjAuMDY0eiIvPjwvc3ZnPg==" />
      </view>
      <view
        v-if="treeConfig?.showCheckbox || false"
        class="qh-tree-item__checkbox"
        :class="[`qh-tree-item__checkbox--${data.selected}`]"
        @touchstart.stop="treeConfig?.toggleSelected(data)"
      />
      <view class="qh-tree-item__label">
        {{ data.label }}
      </view>
    </view>
    <view v-if="!data.leaf" class="qh-tree-item__children" :style="{ height: `${childrenHeight}rpx` }">
      <QhTreeItem v-for="item in data.children" :key="item.value" :data="item" />
    </view>
  </view>
</template>

<style lang="scss">
@import './tree';
</style>
