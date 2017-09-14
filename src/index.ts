import * as assert from 'assert'
import * as config from 'config'
import * as fs from 'fs-extra-promise'
import * as fb from './functions'

const pages: Array<string> = config.get('pages')
const daysBack: number = config.get('daysBack')
const appId: string = config.get('appId')
const appSecret: string = config.get('appSecret')
const rootDir: string = config.get('rootDir')

assert.ok(pages.length && daysBack, "Please provide Facebook page(s) name and days back")
assert.ok(appId && appSecret && !appId.startsWith('YOUR') && !appSecret.startsWith('YOUR'), "Facebook appId and appSecret must be specified")

main()

async function main() {
  const fbGet = fb.get(fb.prepAccessToken(appId, appSecret), daysBack)
  pages.forEach(async page => {
    const doc = await fbGet.page(page).catch(err => console.error(err))
    if (doc && doc.data && doc.data.length) {
      await fs.ensureDirAsync(rootDir)
      const uniqDocs = fb.notAlreadyThere(rootDir, page)(doc.data)
      uniqDocs.forEach(async uniqDoc => await fs.writeJSONAsync(uniqDoc['filename'], uniqDoc))
    }
  })
}