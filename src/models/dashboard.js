import { myCity, queryWeather, query } from '../services/dashboard'
import { parse } from 'qs'

// zuimei 摘自 http://www.zuimeitianqi.com/res/js/index.js
let zuimei = {
  parseActualData (actual) {
    let weather = {
      icon: `http://www.zuimeitianqi.com/res/icon/${zuimei.getIconName(actual.wea, 'big')}`,
      name: zuimei.getWeatherName(actual.wea),
      temperature: actual.tmp,
      dateTime: new Date(actual.PTm).format('MM-dd hh:mm'),
    }
    return weather
  },

  getIconName (wea, flg) {
    let myDate = new Date()
    let hour = myDate.getHours()
    let num = 0
    if (wea.indexOf('/') !== -1) {
      let weas = wea.split('/')
      if (hour < 12) {
        num = zuimei.replaceIcon(weas[0])
        if (num < 6) {
          num = `${num}_${flg}_night.png`
        } else {
          num = `${num}_${flg}.png`
        }
      } else if (hour >= 12) {
        num = zuimei.replaceIcon(weas[1])
        if (hour >= 18) {
          num = `${num}_${flg}_night.png`
        } else {
          num = `${num}_${flg}.png`
        }
      }
    } else {
      if ((hour >= 18 && hour <= 23) || (hour >= 0 && hour <= 6)) {
        num = `${num}_${flg}_night.png`
      } else {
        num = `${num}_${flg}.png`
      }
    }

    return num
  },

  replaceIcon (num) {
    if (num === 21) {
      num = 7
    } else if (num === 22) {
      num = 8
    } else if (num === 10 || num === 11 || num === 12 || num === 23 || num === 24 || num === 25) {
      num = 9
    } else if (num === 13 || num === 15 || num === 26 || num === 27 || num === 34) {
      num = 14
    } else if (num === 17 || num === 28) {
      num = 16
    } else if (num === 35) {
      num = 18
    } else if (num === 31 || num === 32 || num === 33) {
      num = 20
    } else if (num === 30) {
      num = 29
    }

    return num
  },

  getWeatherName (wea) {
    let name = ''
    if (wea.indexOf('/') !== -1) {
      let weas = wea.split('/')
      name = `${zuimei.getWeatherByCode(weas[0])}转${zuimei.getWeatherByCode(weas[1])}`
    } else {
      name = zuimei.getWeatherByCode(wea)
    }

    return name
  },

  getWeatherByCode (number) {
    let wea = ''
    let num = Number(number)
    if (num === 0) {
      wea = '晴'
    } else if (num === 1) {
      wea = '多云'
    } else if (num === 2) {
      wea = '阴'
    } else if (num === 3) {
      wea = '阵雨'
    } else if (num === 4) {
      wea = '雷阵雨'
    } else if (num === 5) {
      wea = '雷阵雨并伴有冰雹'
    } else if (num === 6) {
      wea = '雨夹雪'
    } else if (num === 7) {
      wea = '小雨'
    } else if (num === 8) {
      wea = '中雨'
    } else if (num === 9) {
      wea = '大雨'
    } else if (num === 10) {
      wea = '暴雨'
    } else if (num === 11) {
      wea = '大暴雨'
    } else if (num === 12) {
      wea = '特大暴雨'
    } else if (num === 13) {
      wea = '阵雪'
    } else if (num === 14) {
      wea = '小雪'
    } else if (num === 15) {
      wea = '中雪'
    } else if (num === 16) {
      wea = '大雪'
    } else if (num === 17) {
      wea = '暴雪'
    } else if (num === 18) {
      wea = '雾'
    } else if (num === 19) {
      wea = '冻雨'
    } else if (num === 20) {
      wea = '沙尘暴'
    } else if (num === 21) {
      wea = '小雨-中雨'
    } else if (num === 22) {
      wea = '中雨-大雨'
    } else if (num === 23) {
      wea = '大雨-暴雨'
    } else if (num === 24) {
      wea = '暴雨-大暴雨'
    } else if (num === 25) {
      wea = '大暴雨-特大暴雨'
    } else if (num === 26) {
      wea = '小雪-中雪'
    } else if (num === 27) {
      wea = '中雪-大雪'
    } else if (num === 28) {
      wea = '大雪-暴雪'
    } else if (num === 29) {
      wea = '浮沉'
    } else if (num === 30) {
      wea = '扬沙'
    } else if (num === 31) {
      wea = '强沙尘暴'
    } else if (num === 32) {
      wea = '飑'
    } else if (num === 33) {
      wea = '龙卷风'
    } else if (num === 34) {
      wea = '若高吹雪'
    } else if (num === 35) {
      wea = '轻雾'
    } else if (num === 53) {
      wea = '霾'
    } else if (num === 99) {
      wea = '未知'
    }

    return wea
  },
}

export default {
  namespace: 'dashboard',
  state: {
    weather: {
      city: '成都',
      temperature: '5',
      name: '晴',
      icon: 'http://www.zuimeitianqi.com/res/icon/0_big.png',
      dateTime: new Date().format('MM-dd hh:mm'),
    },
    sales: [],
    quote: {
      avatar: 'http://img.hb.aicdn.com/bc442cf0cc6f7940dcc567e465048d1a8d634493198c4-sPx5BR_fw236',
    },
    numbers: [],
    recentSales: [],
    comments: [],
    completed: [],
    browser: [],
    cpu: {},
    user: {
      avatar: 'http://img.hb.aicdn.com/bc442cf0cc6f7940dcc567e465048d1a8d634493198c4-sPx5BR_fw236',
    },
  },
  subscriptions: {
    setup ({ dispatch }) {
      dispatch({ type: 'query' })
      dispatch({ type: 'queryWeather' })
    },
  },
  effects: {
    *query ({
      payload,
    }, { call, put }) {
     // const data = yield call(query, parse(payload))
      const data ={
        "sales": [{"name": 2008, "Clothes": 273, "Food": 372, "Electronics": 332}, {
          "name": 2009,
          "Clothes": 452,
          "Food": 372,
          "Electronics": 383
        }, {"name": 2010, "Clothes": 234, "Food": 281, "Electronics": 392}, {
          "name": 2011,
          "Clothes": 447,
          "Food": 283,
          "Electronics": 469
        }, {"name": 2012, "Clothes": 285, "Food": 304, "Electronics": 533}, {
          "name": 2013,
          "Clothes": 401,
          "Food": 397,
          "Electronics": 549
        }, {"name": 2014, "Clothes": 314, "Food": 299, "Electronics": 531}, {
          "name": 2015,
          "Clothes": 469,
          "Food": 317,
          "Electronics": 391
        }],
        "cpu": {
          "usage": 313,
          "space": 825,
          "cpu": 54,
          "data": [{"cpu": 31}, {"cpu": 56}, {"cpu": 50}, {"cpu": 44}, {"cpu": 60}, {"cpu": 50}, {"cpu": 33}, {"cpu": 43}, {"cpu": 73}, {"cpu": 38}, {"cpu": 25}, {"cpu": 33}, {"cpu": 80}, {"cpu": 58}, {"cpu": 69}, {"cpu": 34}, {"cpu": 25}, {"cpu": 57}, {"cpu": 29}, {"cpu": 43}]
        },
        "browser": [{"name": "Google Chrome", "percent": 43.3, "status": 1}, {
          "name": "Mozilla Firefox",
          "percent": 33.4,
          "status": 2
        }, {"name": "Apple Safari", "percent": 34.6, "status": 3}, {
          "name": "Internet Explorer",
          "percent": 12.3,
          "status": 4
        }, {"name": "Opera Mini", "percent": 3.3, "status": 1}, {"name": "Chromium", "percent": 2.53, "status": 1}],
        "user": {
          "name": "zuiidea",
          "email": "zuiiidea@.gmail.com",
          "sales": 3241,
          "sold": 3556,
          "avatar": "http://tva4.sinaimg.cn/crop.0.0.996.996.180/6ee6a3a3jw8f0ks5pk7btj20ro0rodi0.jpg"
        },
        "completed": [{"name": 2008, "Task complete": 964, "Cards Complete": 528}, {
          "name": 2009,
          "Task complete": 892,
          "Cards Complete": 756
        }, {"name": 2010, "Task complete": 339, "Cards Complete": 550}, {
          "name": 2011,
          "Task complete": 316,
          "Cards Complete": 789
        }, {"name": 2012, "Task complete": 321, "Cards Complete": 269}, {
          "name": 2013,
          "Task complete": 658,
          "Cards Complete": 611
        }, {"name": 2014, "Task complete": 368, "Cards Complete": 804}, {
          "name": 2015,
          "Task complete": 391,
          "Cards Complete": 594
        }, {"name": 2016, "Task complete": 288, "Cards Complete": 650}, {
          "name": 2017,
          "Task complete": 317,
          "Cards Complete": 309
        }, {"name": 2018, "Task complete": 983, "Cards Complete": 564}, {
          "name": 2019,
          "Task complete": 742,
          "Cards Complete": 725
        }],
        "comments": [{
          "name": "Smith",
          "status": 1,
          "content": "Wxnilgee qffqjvefxy govnkfjda ttrwftnwk jwwspw nzqf qkhjimskl figf cgfzuyqxh ishzgh spklpjbiig ksfm jbnkrftx snxcx.",
          "avatar": "http://dummyimage.com/48x48/f2c479/757575.png&text=S",
          "date": "2016-11-21 16:40:46"
        }, {
          "name": "Martin",
          "status": 3,
          "content": "Tksurujkor cfnhzx qfbxojzs rqeoyvjk ijfvqybld umx nhmpvr dhdmn clgc sqshyc bljwlf eiahx yqlsl ivqkc lwbcjmuk lque.",
          "avatar": "http://dummyimage.com/48x48/a179f2/757575.png&text=M",
          "date": "2016-04-29 23:36:54"
        }, {
          "name": "Martinez",
          "status": 2,
          "content": "Pcybcidhv exxglptbj icx ulytbv wpvxqctfqa sax shdpsmoy wjqd spscuugb emyivb ktoy jben ybfypqknr jtasdwktmr skosu.",
          "avatar": "http://dummyimage.com/48x48/79f27d/757575.png&text=M",
          "date": "2016-03-25 10:30:48"
        }, {
          "name": "Davis",
          "status": 3,
          "content": "Wupe itpyvwlf gcnoe qapjhd kkgmd qvgrzouu jscwxen noyi mkribxwv kcuelw jodmirsm bdtc mlegqvufp gywrwjomj sfbnoqnoy hbtf bhzkxamljc.",
          "avatar": "http://dummyimage.com/48x48/f27997/757575.png&text=D",
          "date": "2016-08-01 23:51:24"
        }, {
          "name": "Moore",
          "status": 3,
          "content": "Wyia uffqubp rdkhkqqcv pumrw nrrpghkqxb psehjdvz yxtrpt gou dcxdwumjs risnxes oxcyikx lbmjh csbehadxn dnelcqjum viftecog.",
          "avatar": "http://dummyimage.com/48x48/79bbf2/757575.png&text=M",
          "date": "2016-07-01 00:55:58"
        }],
        "recentSales": [{
          "id": 1,
          "name": "Brown",
          "status": 1,
          "price": 42.17,
          "date": "2016-08-13 06:02:52"
        }, {"id": 2, "name": "Harris", "status": 3, "price": 89.14, "date": "2016-03-20 15:00:25"}, {
          "id": 3,
          "name": "Hall",
          "status": 2,
          "price": 27.57,
          "date": "2015-07-06 05:58:05"
        }, {"id": 4, "name": "Smith", "status": 3, "price": 167.3, "date": "2016-10-28 11:55:11"}, {
          "id": 5,
          "name": "Robinson",
          "status": 2,
          "price": 184.85,
          "date": "2015-10-24 00:20:29"
        }, {"id": 6, "name": "Thompson", "status": 2, "price": 196.48, "date": "2015-07-31 00:30:43"}, {
          "id": 7,
          "name": "Gonzalez",
          "status": 3,
          "price": 139.36,
          "date": "2015-08-06 01:48:11"
        }, {"id": 8, "name": "Hernandez", "status": 1, "price": 62.7, "date": "2016-12-12 18:24:19"}, {
          "id": 9,
          "name": "Moore",
          "status": 4,
          "price": 67.23,
          "date": "2015-05-04 05:51:04"
        }, {"id": 10, "name": "Hall", "status": 2, "price": 105.6, "date": "2015-08-02 07:27:15"}, {
          "id": 11,
          "name": "Thompson",
          "status": 2,
          "price": 63.31,
          "date": "2015-12-09 00:03:51"
        }, {"id": 12, "name": "Perez", "status": 2, "price": 194.6, "date": "2015-12-10 01:27:56"}, {
          "id": 13,
          "name": "Harris",
          "status": 1,
          "price": 179.1,
          "date": "2016-01-06 01:16:08"
        }, {"id": 14, "name": "Harris", "status": 2, "price": 67.4, "date": "2016-03-30 08:39:33"}, {
          "id": 15,
          "name": "Clark",
          "status": 2,
          "price": 162.6,
          "date": "2015-04-15 15:45:55"
        }, {"id": 16, "name": "Hall", "status": 4, "price": 10.4, "date": "2016-02-12 15:55:20"}, {
          "id": 17,
          "name": "White",
          "status": 2,
          "price": 183.7,
          "date": "2015-08-08 04:39:53"
        }, {"id": 18, "name": "Miller", "status": 1, "price": 40.2, "date": "2015-10-22 10:10:11"}, {
          "id": 19,
          "name": "Perez",
          "status": 3,
          "price": 91.9,
          "date": "2015-01-17 14:59:43"
        }, {"id": 20, "name": "White", "status": 2, "price": 62.2, "date": "2016-05-11 00:40:13"}, {
          "id": 21,
          "name": "Hall",
          "status": 2,
          "price": 31.2,
          "date": "2016-01-27 20:02:21"
        }, {"id": 22, "name": "Lopez", "status": 2, "price": 131.16, "date": "2015-01-01 04:31:28"}, {
          "id": 23,
          "name": "Jones",
          "status": 2,
          "price": 106.5,
          "date": "2015-06-05 07:09:18"
        }, {"id": 24, "name": "Johnson", "status": 3, "price": 191.78, "date": "2015-05-24 02:16:03"}, {
          "id": 25,
          "name": "Johnson",
          "status": 2,
          "price": 75.8,
          "date": "2016-01-25 15:59:06"
        }, {"id": 26, "name": "Gonzalez", "status": 2, "price": 17.9, "date": "2015-07-04 19:07:41"}, {
          "id": 27,
          "name": "Brown",
          "status": 1,
          "price": 13.6,
          "date": "2015-04-29 00:48:39"
        }, {"id": 28, "name": "Thomas", "status": 3, "price": 33.35, "date": "2016-07-04 17:22:25"}, {
          "id": 29,
          "name": "Hernandez",
          "status": 2,
          "price": 72.11,
          "date": "2015-08-06 04:40:08"
        }, {"id": 30, "name": "Thomas", "status": 1, "price": 178.93, "date": "2015-04-09 14:20:35"}, {
          "id": 31,
          "name": "Hall",
          "status": 2,
          "price": 62.47,
          "date": "2016-10-22 05:22:30"
        }, {"id": 32, "name": "Martinez", "status": 2, "price": 190.82, "date": "2015-05-01 03:00:35"}, {
          "id": 33,
          "name": "Moore",
          "status": 3,
          "price": 72.4,
          "date": "2016-06-05 06:14:51"
        }, {"id": 34, "name": "Taylor", "status": 4, "price": 12.5, "date": "2016-12-07 01:48:11"}, {
          "id": 35,
          "name": "Taylor",
          "status": 4,
          "price": 137.1,
          "date": "2016-05-25 17:04:56"
        }, {"id": 36, "name": "Williams", "status": 3, "price": 40.72, "date": "2016-06-03 08:41:52"}],
        "quote": {
          "name": "Joho Doe",
          "title": "Graphic Designer",
          "content": "I'm selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can't handle me at my worst, then you sure as hell don't deserve me at my best.",
          "avatar": "http://img.hb.aicdn.com/bc442cf0cc6f7940dcc567e465048d1a8d634493198c4-sPx5BR_fw236"
        },
        "numbers": [{
          "icon": "pay-circle-o",
          "color": "#64ea91",
          "title": "Online Review",
          "number": 2781
        }, {"icon": "team", "color": "#8fc9fb", "title": "New Customers", "number": 3241}, {
          "icon": "message",
          "color": "#d897eb",
          "title": "Active Projects",
          "number": 253
        }, {"icon": "shopping-cart", "color": "#f69899", "title": "Referrals", "number": 4324}]
      };
      yield put({ type: 'queryWeather', payload: { ...data } })
    },
    *queryWeather ({
      payload,
    }, { call, put }) {
      const myCityResult = yield call(myCity, { flg: 0 })
      const result = yield call(queryWeather, { cityCode: myCityResult.selectCityCode })
      const weather = zuimei.parseActualData(result.data.actual)
      weather.city = myCityResult.selectCityName
      yield put({ type: 'queryWeatherSuccess', payload: {
        weather,
      } })
    },
  },
  reducers: {
    queryWeatherSuccess (state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
    queryWeather (state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
}
