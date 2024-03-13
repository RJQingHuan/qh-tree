import { execSync } from 'node:child_process'
import { consola } from 'consola'
import fs from 'fs-extra'
import { version } from '../package.json'

fs.copyFileSync('README.md', 'packages/qh-tree/README.md')

const command = 'cd packages/qh-tree && npm publish'
execSync(command, { stdio: 'inherit' })

consola.success(`Published npm package version ${version}`)
