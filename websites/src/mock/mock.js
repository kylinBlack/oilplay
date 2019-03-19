// 引入mockjs
const Mock = require("mockjs");
const portalData = require("./json/business.json");
const personData = require("./json/person.json");
const mgData = require("./json/mgdata.json");
const logData = require("./json/logdata.json");
const insData = require("./json/insdata.json");
const ecomData = require("./json/ecomdata.json");
const introData = require("./json/intro.json");
// 获取 mock.Random 对象
const Random = Mock.Random;
// mock一组数据
const produceNewsData = function() {
  let articles = [];
  for (let i = 0; i <= 99; i++) {
    let newArticleObject = {
      title: Random.csentence(5, 30), //  Random.csentence( min, max )
      thumbnail_pic_s: Random.dataImage("300x250", "mock的图片"), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
      author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
      date: Random.date() + " " + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
    };
    articles.push(newArticleObject);
  }

  return {
    articles: articles
  };
};

// Mock.mock( url, post/get , 返回的数据)；
Mock.mock("/api/news", "post", produceNewsData);
Mock.mock("/api/portal", "get", portalData);
Mock.mock("/api/person", "get", personData);
Mock.mock("/api/mg", "get", mgData);
Mock.mock("/api/logdata", "get", logData);
Mock.mock("/api/insdata", "get", insData);
Mock.mock("/api/ecomdata", "get", ecomData);
Mock.mock("/api/introdata", "get", introData);
