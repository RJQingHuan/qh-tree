<script setup lang="ts">
import { provide, ref, watchEffect } from 'vue'
import QhTreeItem from '../qh-tree-item/qh-tree-item.vue'
import { DefaultItemHeight, QhTreeConfigKey } from './'
import type { DataTreeOption, TreeOption } from './'

const props = withDefaults(
  defineProps<{
    options: TreeOption[]
    labelKey?: string
    valueKey?: string
    childrenKey?: string
    itemHeight?: number
  }>(),
  {
    labelKey: 'label',
    valueKey: 'value',
    childrenKey: 'children',
    itemHeight: DefaultItemHeight,
  },
)

provide(QhTreeConfigKey, {
  itemHeight: props.itemHeight,
})

function formatterOptions(options: TreeOption[]): DataTreeOption[] {
  return options.map(option => ({
    label: option[props.labelKey],
    value: option[props.valueKey],
    expanded: false,
    selected: 'none',
    children: option[props.childrenKey] ? formatterOptions(option[props.childrenKey]) : [],
  }))
}

const data = ref<DataTreeOption[]>([])
watchEffect(() => data.value = formatterOptions(props.options))

function handleToggleExpanded(data: DataTreeOption) {
  if (data.children.length)
    data.expanded = !data.expanded
}
</script>

<template>
  <view class="qh-tree">
    <QhTreeItem
      v-for="item in data"
      :key="item.value"
      :data="item"
      @toggle-expanded="handleToggleExpanded"
    />
  </view>
</template>

<style lang="scss">
@import './tree';
</style>...
