<script setup lang="ts">
import { provide, ref, watchEffect } from 'vue'
import QhTreeItem from '../qh-tree-item/qh-tree-item.vue'
import { DefaultItemHeight, QhTreeConfigKey, hasChildren } from './'
import type { DataTreeOption, TreeOption } from './'

const props = withDefaults(
  defineProps<{
    options: TreeOption[]
    labelKey?: string
    valueKey?: string
    childrenKey?: string
    itemHeight?: number
    accordion?: boolean
  }>(),
  {
    labelKey: 'label',
    valueKey: 'value',
    childrenKey: 'children',
    itemHeight: DefaultItemHeight,
    accordion: false,
  },
)

provide(QhTreeConfigKey, {
  itemHeight: props.itemHeight,
})

function formatterOptions(options: TreeOption[], level = 1, parent: DataTreeOption | null = null): DataTreeOption[] {
  return options.map((option) => {
    const _data: DataTreeOption = {
      label: option[props.labelKey],
      value: option[props.valueKey],
      expanded: false,
      selected: 'none',
      level,
      children: [],
      parent,
    }
    _data.children = option[props.childrenKey] ? formatterOptions(option[props.childrenKey], level + 1, _data) : []
    return _data
  })
}

const data = ref<DataTreeOption[]>([])
watchEffect(() => data.value = formatterOptions(props.options))

function handleToggleExpanded(option: DataTreeOption) {
  if (!hasChildren(option))
    return

  if (props.accordion && !option.expanded) {
    const unexpandList = option.parent ? option.parent.children : data.value
    unexpandList.forEach(v => v.expanded = false)
  }

  option.expanded = !option.expanded
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
</style>
