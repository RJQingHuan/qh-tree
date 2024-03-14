import type { InjectionKey } from 'vue'

export interface TreeOption {
  label: string
  value: string | number
  children?: TreeOption[]
  [k: string]: any
}

export type SelectType = 'none' | 'all' | 'half' | 'check'

export interface DataTreeOption {
  label: string
  value: string | number
  children: DataTreeOption[]
  expanded: boolean
  selected: SelectType
  level: number
  parent: DataTreeOption | null
}

export const QhTreeConfigKey = 'QH_TREE_CONFIG_KEY' as any as InjectionKey<{ itemHeight: number }>

export const DefaultItemHeight = 50

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
