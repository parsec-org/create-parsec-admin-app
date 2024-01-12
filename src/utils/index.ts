export const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

/**
 * 一些常用格式参照。可以自定义格式，例如："yyyy/MM/dd HH:mm:ss"，"yyyy/M/d HH:mm:ss"。
 * 格式要求
 * year -> yyyy/yy   month -> MM/M    day -> dd/d
 * hour -> HH/H      minute -> mm/m   second -> ss/s
 */
export class DateFormats {
  static full: string = 'YYYY-MM-DD HH:mm:ss';
  static y_mo_d_h_m: string = 'YYYY-MM-DD HH:mm';
  static y_mo_d: string = 'YYYY-MM-DD';
  static y_mo: string = 'YYYY-MM';
  static mo_d: string = 'MM-DD';
  static mo_d_h_m: string = 'MM-DD HH:mm';
  static h_m_s: string = 'HH:mm:ss';
  static h_m: string = 'HH:mm';

  static zh_full: string = 'YYYY年MM月DD日 HH时mm分ss秒';
  static zh_y_mo_d_h_m: string = 'YYYY年MM月DD日 HH时mm分';
  static zh_y_mo_d: string = 'YYYY年MM月DD日';
  static zh_y_mo: string = 'YYYY年MM月';
  static zh_mo_d: string = 'MM月dd日';
  static zh_mo_d_h_m: string = 'MM月dd日 HH时mm分';
  static zh_h_m_s: string = 'HH时mm分ss秒';
  static zh_h_m: string = 'HH时mm分';
}

/**
 * 身份证隐藏中间8位(出生年月日)
 * @param idNo
 */
export const hideIdNo = (idNo: string): string => {
  return idNo.replace(/^(\d{6})\d{8}(.{4}$)/g, `$1${Array(9).join('*')}$2`);
};

/**
 * 电话号码隐藏中间四位
 * @param phone
 */
export const hidePhoneNumber = (phone: string): string => {
  return phone.replace(/^(\d{3})\d+(\d{4})$/, '$1****$2');
};

/**
 * 验证统一社会信用代码
 * @param code
 */
export const verifyUnifiedSocialCreditCode = (code: string): boolean => {
  let reg = /[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/g;
  return reg.test(code);
};

/**
 * 根据身份证号计算年龄
 * @param idNo 身份证号
 */
export const calculateAgeBasedOnIDNumber = (idNo: string): number | string => {
  if (idNo !== null) {
    const yearBirth = idNo.substring(6, 10);
    const monthBirth = idNo.substring(10, 12);
    const dayBirth = idNo.substring(12, 14);
    const myDate = new Date();
    const monthNow = myDate.getMonth() + 1;
    const dayNow = myDate.getDate();
    let age = myDate.getFullYear() - parseInt(yearBirth);
    if (
      monthNow < parseInt(monthBirth) ||
      (monthNow === parseInt(monthBirth) && dayNow < parseInt(dayBirth))
    ) {
      age--;
    }
    //返回年龄
    return age;
  } else {
    return '';
  }
};

/**
 * 是否是手机号码
 * @param value
 */
export const isMobile = (value: string) => {
  // eslint-disable-next-line no-param-reassign
  value = value.replace(/[^-|\d]/g, '');
  return (
    /^((\+86)|(86))?(1)\d{10}$/.test(value) || /^0[0-9-]{10,13}$/.test(value)
  );
};

/**
 * 手机号、座机号同时验证
 * @param value
 */
export const isTelephone = (value: string) => {
  const _isMobile = isMobile(value);
  let pattern = /^0\d{2,3}-\d{7,8}$/;
  return _isMobile || pattern.test(value);
};

/**
 * 验证身份证号码
 * @param { String } idCardNo 身份证号码
 * @returns {
 *   isPass, // 验证是否通过，默认通过，为true，否则为false
 *   errorMessage, // 错误信息，isPass为true则为''
 * }
 * */
export function verifyIDNumber(idCardNo: string) {
  // 身份证号前两位代表区域
  const city: Record<number, string> = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江 ',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北 ',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏 ',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外 ',
  };
  const idCardReg =
    /^[1-9]\d{5}(19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i; // 身份证格式正则表达式
  let isPass = true; // 身份证验证是否通过（true通过、false未通过）
  let errorMessage = ''; // 错误提示信息

  // 如果身份证不满足格式正则表达式
  if (!idCardNo) {
    errorMessage = '请输入身份证号码';
    isPass = false;
  } else if (!idCardNo.match(idCardReg)) {
    errorMessage = '请输入正确的身份证号码';
    isPass = false;
  } else {
    // @ts-ignore
    if (!city[idCardNo.substring(0, 2)]) {
      // 区域数组中不包含需验证的身份证前两位
      errorMessage = '请输入正确的身份证号码';
      isPass = false;
    } else if (idCardNo.length === 18) {
      // 18位身份证需要验证最后一位校验位
      const lastNos = idCardNo.split('');
      // ∑(ai×Wi)(mod 11)
      // 加权因子
      const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      // 校验位
      const parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
      let sum = 0;
      let ai = 0;
      let wi = 0;
      for (let i = 0; i < 17; i++) {
        ai = parseInt(lastNos[i]);
        wi = factor[i];
        sum += ai * wi; // 开始计算并相加
      }
      const last = parity[sum % 11]; // 求余
      if (last.toString() !== lastNos[17]) {
        errorMessage = '请输入正确的身份证号码';
        isPass = false;
      }
    }
  }
  return {
    errorMessage,
    isPass,
  };
}

/**
 * 各位补零
 * @param n
 */
export const preFixZero = (n: number) => {
  return n > 9 ? `${n}` : `0${n}`;
};

/**
 * 生成一个用不重复的ID
 * @param randomLength id  长度
 */
export const getUuid = (randomLength = 32): string => {
  return Number(
    Math.random().toString().substr(2, randomLength) + Date.now(),
  ).toString(36);
};

/**
 * 是否是微信
 */
export const isWx = /micromessenger/.test(navigator.userAgent.toLowerCase());

export const escape2Html = (html: string): string => {
  if (!html) {
    return '';
  }
  const arrEntities: any = { lt: '<', gt: '>', nbsp: ' ', amp: '&', quot: '"' };
  return html.replace(/&(lt|gt|nbsp|amp|quot);/gi, function (_all, t) {
    return arrEntities[t];
  });
};

export const isMobileDevices = () => {
  return !!(
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  );
};

/**
 * 随机生成十六进制颜色
 */
export const randomHexColor = () => {
  //随机生成十六进制颜色
  let hex = Math.floor(Math.random() * 16777216).toString(16);
  //生成ffffff以内16进制数
  while (hex.length < 6) {
    //while循环判断hex位数，少于6位前面加0凑够6位
    hex = '0' + hex;
  }
  return '#' + hex; //返回‘#'开头16进制颜色
};

export const treeToArray = (tree: any[]) => {
  // 判断 tree 是否有值，无返回 []
  if (!Array.isArray(tree) || !tree.length) return [];
  let res: any[] = [];
  tree.forEach((v) => {
    // tree的每个元素都 放入到 res里面
    res.push(v);
    if (v.children) {
      // 有children 就把 children数据递归 返回  依次放到 res里面
      res.push(...treeToArray(v.children));
    }
  });
  return res;
};
