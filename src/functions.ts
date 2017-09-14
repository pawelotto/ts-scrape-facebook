import * as url from 'url'
import * as moment from 'moment'
import * as request from 'request-promise'
import * as fs from 'fs-extra-promise'
import * as path from 'path'

/** Get to the fb resource */
export function get(accessToken: string, daysBack: number = 10, apiVersion: string = 'v2.10') {
  let baseUrl: url.Url = url.parse('https://graph.facebook.com/')
  baseUrl.pathname += apiVersion
  baseUrl.query = { access_token: accessToken, since: formatDate(daysBack), until: formatDate() }

  return {
    page: async function (page: string) {
      Object.assign(baseUrl.query, { fields: 'message,link,created_time,type,name,id,comments.limit(0).summary(true),shares,reactions.limit(0).summary(true)' })
      baseUrl.pathname += `/${page}/posts/`
      try {
        return await download(url.format(baseUrl))
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}

/** Generate access fb token */
export function prepAccessToken(appId: string, appSecret: string): string {
  return `${appId}|${appSecret}`.toString()
}

/** Check if file is not already downloaded and save them */
export function notAlreadyThere(rootDir: string, page: string): Function {
  const files = fs.readdirSync(rootDir)
  const idsFromFiles = files.map(file => fs.readJSONSync(path.join(rootDir, file)).id)
  return function (docs: Array<object>): Array<object> {
    docs = docs.map(doc => Object.assign(doc, { filename: path.join(rootDir, page + "_" + doc['id'] + ".json") }))
    return docs.filter(doc => idsFromFiles.indexOf(doc['id']) === -1)
  }
}

/** Simple request wrapper */
async function download(href: string) {
  return request({
    uri: href,
    method: 'GET',
    json: true
  })
}

function formatDate(daysBack?: number): string {
  const format = 'YYYY-MM-DD'
  return daysBack ? moment().subtract(daysBack, 'days').format(format) : moment().format(format)
}