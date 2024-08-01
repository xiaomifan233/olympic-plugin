import path from 'path'

const _path = process.cwd().replace(/\\/g, '/')

const pluginName = path.basename(path.join(import.meta.url, '../../'))
const pluginRoot = path.join(_path, 'plugins', pluginName)
const pluginData = path.join(pluginRoot, 'data')
const pluginApplications = path.join(pluginRoot, 'apps')

export {
  _path,
  pluginName,
  pluginRoot,
  pluginData,
  pluginApplications
}
