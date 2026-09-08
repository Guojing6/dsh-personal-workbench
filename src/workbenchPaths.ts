/**
 * Default local storage paths for dsh-workbench.
 *
 * Runtime data lives under the user's Documents folder:
 *   Documents/dsh-workbench/workbench.db
 * Task files live in:
 *   Documents/dsh-workbench/tasks/<taskId>
 */
import { spawnSync } from 'node:child_process'
import { homedir, platform } from 'node:os'
import { join } from 'node:path'

const WORKBENCH_FOLDER = 'dsh-workbench'
const TASKS_FOLDER = 'tasks'

function expandWindowsEnv(input: string): string {
  return input.replace(/%([^%]+)%/g, (_, name: string) => process.env[name] ?? `%${name}%`)
}

function windowsDocumentsDir(): string | undefined {
  if (platform() !== 'win32') return undefined
  const result = spawnSync('reg', [
    'query',
    'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\User Shell Folders',
    '/v',
    'Personal',
  ], { encoding: 'utf8', windowsHide: true })
  if (result.status !== 0) return undefined
  const line = result.stdout.split(/\r?\n/).find((item) => /\sPersonal\s+REG_/.test(item))
  const match = line?.match(/\sPersonal\s+REG_\w+\s+(.+)\s*$/)
  const value = match?.[1]?.trim()
  return value === undefined || value === '' ? undefined : expandWindowsEnv(value)
}

export function defaultDocumentsDir(): string {
  return windowsDocumentsDir() ?? join(homedir(), 'Documents')
}

export function defaultWorkbenchDataDir(): string {
  return join(defaultDocumentsDir(), WORKBENCH_FOLDER)
}

export function defaultDbPath(): string {
  return join(defaultWorkbenchDataDir(), 'workbench.db')
}

export function defaultTasksWorkspace(): string {
  return join(defaultWorkbenchDataDir(), TASKS_FOLDER)
}
