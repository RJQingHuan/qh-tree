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
}

export const QhTreeConfigKey = 'QH_TREE_CONFIG_KEY' as any as InjectionKey<{ itemHeight: number }>

export const DefaultItemHeight = 50
