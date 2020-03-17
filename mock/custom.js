import mockjs from 'mockjs';

function getFakedCustomResult(req, res) {
  const result = mockjs.mock({
    'data|2': [
      {
        creditinfo: '@integer(1,10000000)',
        customopcode: /\d{7}/,
        salername: '@cname()',
        customname: '@cname()',
        customid: '@integer(1,10000)',
      },
    ],
    success: true,
    message: '',
  });
  return res.json(result);
}

function getFakedCustomInfoResult(req, res) {
  const result = mockjs.mock({
    data: {
      usedCreditDays: '@integer(1,10000000)',
      customOpcode: /\d{7}/,
      canUseCredit: '@float',
      usedCredit: '@float',
      wareAddress: '@string(8)',
      customName: '@string(7)',
      officeAddress: '@string(7)',
      credit: '@float',
      creditInfo: '@string(15)',
      customMemo: [],
    },
    success: true,
    message: '',
  });
  return res.json(result);
}

// function getFakeOrders(req, res) {
//   const result = mockjs.mock({
//     'data|10': [
//       {
//         serialNumber: '@integer(1,10000000)',
//         chemisId: 'HY0001',
//         appointCode: /\d{10}/,
//         idCard: /^440119\d{12}/,
//         mobile: /^1[385][1-9]\d{8}/,
//         fullname: '@cname()',
//         maskName: '口罩',
//         maskId: '100001',
//         appointNum: 5,
//         quantum: '@integer(0,1)',
//         saled: false,
//         appointDate: '@date("yyyy-MM-dd")',
//       },
//     ],
//     success: true,
//     message: '',
//   });
//   return res.json(result);
// }

export default {
  'GET /rest/assistant/getCustoms': getFakedCustomResult,
  'GET /rest/assistant/getCustomInfo': getFakedCustomInfoResult,
  'GET /rest/assistant/product': getFakedCustomResult,
  'GET /rest/assistant/getOrders': getFakedCustomResult,
  'GET /rest/assistant/getArrears': getFakedCustomResult,
  'GET /rest/assistant/getReceives': getFakedCustomResult,
};
