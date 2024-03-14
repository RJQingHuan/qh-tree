import type { InjectionKey } from 'vue'

export type TreeValue = string | number

export interface TreeOption {
  label?: string
  value?: TreeValue
  leaf?: boolean
  children?: TreeOption[]
  [k: string]: any
}

/**
 * @value none 未选中
 * @value all 全选,非叶子(children不为空)节点使用
 * @value half 半选,非叶子(children不为空)节点使用
 * @value check 选中,叶子(children为空)节点使用
 */
export type SelectType = 'none' | 'all' | 'half' | 'check'

export interface DataTreeOption {
  label: string
  value: TreeValue
  children: DataTreeOption[]
  expanded: boolean
  selected: SelectType
  level: number
  leaf: boolean
  parent: DataTreeOption | null
}

export const QhTreeConfigKey = 'QH_TREE_CONFIG_KEY' as any as InjectionKey<{
  itemHeight: number
  showCheckbox: boolean
  toggleExpanded: (data: DataTreeOption) => void
  toggleSelected: (data: DataTreeOption) => void
}>

export const DefaultItemHeight = 60

export function hasChildren(data: DataTreeOption) {
  return data.children && data.children.length !== 0
}

/**
 * 判断value是否是data的子节点
 */
export function isChildren(data: DataTreeOption, value: DataTreeOption['value']) {
  if (!hasChildren(data))
    return false

  const travel = (data: DataTreeOption): boolean => {
    return data.value === value || data.children.some(option => travel(option))
  }

  return travel(data)
}

/**
 * 获取指定层级的父节点
 * @param data 子节点
 * @param level 层级
 */
export function getParentData(data: DataTreeOption, level: number = 1) {
  if (data.parent == null || data.level === level)
    return data
  return getParentData(data.parent, level)
}

/**
 * 设置子节点的选中状态
 */
export function changeChildrenSelected(data: DataTreeOption) {
  if (!hasChildren(data))
    return

  const travel = (options: DataTreeOption[]) => {
    options.forEach((option) => {
      if (hasChildren(option) && !option.leaf) {
        option.selected = data.selected
        travel(option.children)
      }
      else {
        option.selected = data.selected === 'all' ? 'check' : 'none'
      }
    })
  }

  travel(data.children)
}

/**
 * 设置父节点的选中状态
 */
export function changeParentSelected(data: DataTreeOption) {
  if (data.parent == null)
    return

  const travel = (data: DataTreeOption) => {
    const { parent } = data
    if (data.parent == null)
      return
    const countMap: Record<SelectType, number> = parent!.children.reduce(
      (prev, pitem) => {
        prev[pitem.selected] += 1
        return prev
      },
      { none: 0, check: 0, all: 0, half: 0 },
    )

    const { none, check, all } = countMap

    if (none === parent!.children.length)
      parent!.selected = 'none'
    else if (check + all === parent!.children.length)
      parent!.selected = 'all'
    else
      parent!.selected = 'half'

    travel(data.parent)
  }

  travel(data)
}
