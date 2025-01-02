export default {
  'GET /public/authCode': (req: any, res: any) => {
    res.json({
      clientCode: '1234',
      captchaImageUrl: 'https://www.baidu.com/img/flexible/logo/pc/result.png',
    });
  },
};
