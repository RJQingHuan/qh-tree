import { execSync } from "child_process";
import { consola } from 'consola'
import { version } from '../package.json'
import fs from 'fs-extra'

fs.copyFileSync('README.md', 'packages/qh-tree/README.md')

const command = 'cd packages/qh-tree && npm publish'
execSync(command, { stdio: 'inherit' })

consola.success(`Published npm package version ${version}`)
