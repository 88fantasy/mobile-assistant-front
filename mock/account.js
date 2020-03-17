import mockjs from 'mockjs';

function postLoginTestResult(req, res) {
  const result = mockjs.mock({
    success: true,
    data: '17161', // 18289
  });
  return res.json(result);
}

export default {
  'POST /rest/assistant/login': postLoginTestResult,
};
