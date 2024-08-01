import fs from 'fs'
import {pluginData} from '../config/config.js'
function nameToId(countryName) {
  let data = fs.readFileSync(`${pluginData}/data.json`, 'utf8')
  data = JSON.parse(data);
  const medalsList = data.data.medalsList;
  for (let medal of medalsList) {
    if (medal.countryname === countryName) {
      console.log(medal.countryid);
      return medal.countryid;
    }
  }
  return null
}
export {nameToId}
