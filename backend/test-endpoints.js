const testEndpoints = async () => {
  const BASE_URL = 'http://localhost:3000';
  let token = null;

  const results = [];
  const test = async (name, method, url, body = null, useToken = false) => {
    try {
      const headers = { 'Content-Type': 'application/json' };
      if (useToken && token) headers['Cookie'] = `token=${token}`;

      const res = await fetch(`${BASE_URL}${url}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null
      });
      const data = await res.json().catch(() => null);
      
      const r = { name, method, url, status: res.status, data };
      results.push(r);
      return r;
    } catch (e) {
      const r = { name, method, url, err: e.message };
      results.push(r);
      return null;
    }
  };

  // 1. Register
  const suffix = Date.now();
  const email = `test${suffix}@example.com`;
  await test('Register', 'POST', '/api/v1/register', {
    fullName: 'Test User', email, password: 'password123', phoneNumber: '1234567890', role: 'student'
  });

  // 2. Login
  const loginRes = await test('Login', 'POST', '/api/v1/login', {
    email, password: 'password123', role: 'student'
  });
  
  if (loginRes?.data?.token) {
     token = loginRes.data.token;
  }

  // 3. Current User
  await test('Current User', 'GET', '/api/v1/current', null, true);

  // 4. Resume Create (v2)
  await test('Create Resume', 'POST', '/api/v2/resume', {
    name: 'Test User', email, phone: '12345', location: 'UK', summary: 'Dev',
    Experience: '2y', Education: 'Bsc', Skills: 'JS'
  });

  // 5. Gen AI Suggestion (v3) - note: needs api key but we just check if it fails due to logic vs api
  await test('Gen AI Suggestion', 'POST', '/api/v3/gen', { summary: 'Dev' });

  // 6. Profile Detail Create (v4)
  const profRes = await test('Create Profile Detail', 'POST', '/api/v4/prof', {
    phone: '12', location: 'NY', Disability: 'None', bio: 'hi', Institution: 'MIT',
    Degree: 'Bsc', date: '2020', Company: 'Google', Position: 'Dev', start: '2021',
    SkillName: 'JS', Proficiency: 'Advanced' // Must match Enum
  });

  const profileId = profRes?.data?.profile?._id;

  // 7. Profile Update (v4)
  if (profileId) {
    await test('Update Profile Detail', 'PUT', `/api/v4/profile/${profileId}`, { bio: 'hello world' });
    await test('Get Profile By User', 'GET', `/api/v4/profile/user/${profileId}`);
  }

  // 8. Interview Gen (v5)
  await test('Interview Gen', 'POST', '/api/v5/interview/generate', { jobRole: 'developer' });

  // 9. Interview Feedback (v5)
  await test('Interview Feedback', 'POST', '/api/v5/interview/feedback', { question: 'React?', userAnswer: 'Library' });

  // 10. Logout
  await test('Logout', 'GET', '/api/v1/logout');
  
  const fs = await import("fs");
  fs.writeFileSync("results.json", JSON.stringify(results, null, 2));
};

testEndpoints();
