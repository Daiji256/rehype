#!/usr/bin/env node

/**
 * @typedef Pack
 * @property {string} name
 * @property {string} version
 * @property {string} description
 */

import fs from 'node:fs/promises'
import {resolve} from 'import-meta-resolve'
import {rehype} from 'rehype'
import {args} from 'unified-args'

/** @type {Pack} */
const proc = JSON.parse(
  String(
    // To do: this will break when we add export maps.
    await fs.readFile(new URL(resolve('rehype/package.json', import.meta.url)))
  )
)
/** @type {Pack} */
const cli = JSON.parse(
  String(await fs.readFile(new URL(resolve('./package.json', import.meta.url))))
)

args({
  processor: rehype,
  name: proc.name,
  description: cli.description,
  version: [
    proc.name + ': ' + proc.version,
    cli.name + ': ' + cli.version
  ].join(', '),
  pluginPrefix: proc.name,
  packageField: proc.name,
  rcName: '.' + proc.name + 'rc',
  ignoreName: '.' + proc.name + 'ignore',
  extensions: ['html', 'htm', 'xht', 'xhtml']
})
