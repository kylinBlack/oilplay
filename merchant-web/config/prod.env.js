'use strict'

var env = {
  NODE_ENV: '"production"'
}
var buildType = process.argv.slice(2)[0] || 'development'
switch (buildType) {
  case 'dev':
    process.env.type = 'dev'
    env.type = '"dev"'
    env.API_HOST = '"http://merchant.dev.chinaoilpay.com"'
    break
  case 'test':
    process.env.type = 'test'
    env.type = '"test"'
    env.API_HOST = '"http://merchant.test.chinaoilpay.com"'
    break
  case 'beta':
    process.env.type = 'beta'
    env.type = '"beta"'
    env.API_HOST = '"http://merchant.beta.internetpaymentbanks.com"'
    break
  case 'pro':
    process.env.type = 'pro'
    env.type = '"pro"'
    env.API_HOST = '"https://www.iebt.net"'
    break
  default:
    process.env.type = 'local'
    env.type = '"local"'
    env.API_HOST = '"http://merchant.dev.chinaoilpay.com"'
}

module.exports = env

/*
* axios.defaults.baseURL = 'http://192.168.4.135:9030';

 axios.defaults.baseURL = 'http://192.168.4.125:9030';

 axios.defaults.baseURL = 'http://192.168.4.145:9030';

 axios.defaults.baseURL = 'http://merchant.dev.chinaoilpay.com';

 *
* */
