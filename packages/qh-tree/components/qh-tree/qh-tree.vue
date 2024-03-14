<script setup lang="ts">
import { provide, ref, watchEffect } from 'vue'
import QhTreeItem from '../qh-tree-item/qh-tree-item.vue'
import { DefaultItemHeight, QhTreeConfigKey, changeChildrenSelected, changeParentSelected, hasChildren } from './'
import type { DataTreeOption, TreeOption, TreeValue } from './'

const props = withDefaults(
  defineProps<{
    options: TreeOption[]
    labelKey?: string
    valueKey?: string
    childrenKey?: string
    leafKey?: string
    itemHeight?: number
    accordion?: boolean
    showCheckbox?: boolean
  }>(),
  {
    labelKey: 'label',
    valueKey: 'value',
    leafKey: 'leaf',
    childrenKey: 'children',
    itemHeight: DefaultItemHeight,
    accordion: false,
    showCheckbox: false,
  },
)

function formatterOptions(options: TreeOption[], level = 1, parent: DataTreeOption | null = null): DataTreeOption[] {
  return options.map((option) => {
    const _data: DataTreeOption = {
      label: option[props.labelKey],
      value: option[props.valueKey],
      leaf: option[props.leafKey] == null
        ? (option[props.childrenKey] == null || option[props.childrenKey].length === 0)
        : option[props.leafKey],
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

function toggleExpanded(option: DataTreeOption) {
  if (!hasChildren(option) || option.leaf)
    return

  if (props.accordion && !option.expanded) {
    const unexpandList = option.parent ? option.parent.children : data.value
    unexpandList.forEach(v => v.expanded = false)
  }

  option.expanded = !option.expanded
}

function toggleSelected(data: DataTreeOption) {
  const { selected } = data

  if (selected === 'half') {
    data.selected = 'all'
  }
  else if (selected === 'check' || selected === 'all') {
    data.selected = 'none'
  }
  else if (selected === 'none') {
    if (!data.leaf)
      data.selected = 'all'
    else
      data.selected = 'check'
  }

  changeChildrenSelected(data)

  changeParentSelected(data)
}

provide(QhTreeConfigKey, {
  itemHeight: props.itemHeight,
  showCheckbox: props.showCheckbox,
  toggleExpanded,
  toggleSelected,
})

function getCheckedNodes(leafOnly = false) {
  const result: TreeOption[] = []

  const travel = (options: DataTreeOption[]) => {
    options.forEach((option) => {
      if (option.selected === 'check' || (!leafOnly && option.selected === 'all'))
        result.push(option)
      if (!option.leaf && option.selected !== 'none')
        travel(option.children)
    })
  }
  if (props.showCheckbox)
    travel(data.value)
  return result
}

function getCheckedKeys(leafOnly = false) {
  return getCheckedNodes(leafOnly).map(data => data[props.valueKey])
}

function setChecked(values: TreeValue[], checked: boolean) {
  const travel = (options: DataTreeOption[]) => {
    options.forEach((option) => {
      if (values.includes(option.value)) {
        if (option.leaf)
          option.selected = checked ? 'check' : 'none'
        else
          option.selected = checked ? 'all' : 'none'
        changeChildrenSelected(option)
        changeParentSelected(option)
      }
      else if (hasChildren(option) && !option.leaf) {
        travel(option.children)
      }
    })
  }

  travel(data.value)
}

defineExpose({
  getCheckedKeys,
  getCheckedNodes,
  setChecked,
})
</script>

<template>
  <view class="qh-tree">
    <QhTreeItem v-for="item in data" :key="item.value" :data="item" />
  </view>
</template>

<style lang="scss">
@import './tree';
</style>
