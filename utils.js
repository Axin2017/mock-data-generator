function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomChineseWord(){ 
  return String.fromCharCode(Math.floor(getRandomNumber(19968, 40869)));
}


function dateFormat(date, fmt = 'YYYY-mm-dd HH:MM:SS') {
  let ret;
  const opt = {
    "Y+": date.getFullYear().toString(),        // 年
    "m+": (date.getMonth() + 1).toString(),     // 月
    "d+": date.getDate().toString(),            // 日
    "H+": date.getHours().toString(),           // 时
    "M+": date.getMinutes().toString(),         // 分
    "S+": date.getSeconds().toString()          // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
    };
  };
  return fmt;
}

exports.getRandomFloat = getRandomFloat;
exports.getRandomNumber = getRandomNumber;
exports.getRandomChineseWord = getRandomChineseWord;
exports.dateFormat = dateFormat;
