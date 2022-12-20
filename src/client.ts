import * as phantom from 'phantom';

const port = 3030;
const path = 'api'
const baseUrl = `http://localhost:${port}/${path}`;

// [GET]
async function sendGetRequest(): Promise<void> {
  const instance = await phantom.create();
  const page = await instance.createPage();
  const status = await page.open(`${baseUrl}/message`);
  console.log(status);

  const content = await page.property('content');
  console.log(content);

  await instance.exit();
}

// [POST]
async function sendPostRequest(): Promise<void> {
  const instance = await phantom.create();
  const page = await instance.createPage();
  await page.on('onResourceRequested', function(requestData) {
    console.info('Requesting', requestData.url);
  });

  const data = {
    name: 'John Doe',
    email: 'john.doe@example.com'
  };

  const status = await page.open(baseUrl + '/message', 'POST', JSON.stringify(data));
  console.log(status);

  const content = await page.property('content');
  console.log(content);

  await instance.exit();
}

// [PUT]
async function sendPutRequest(): Promise<void> {
  const instance = await phantom.create();
  const page = await instance.createPage();
  await page.on('onResourceRequested', function(requestData) {
    console.info('Requesting', requestData.url);
  });

  const data = {
    name: 'Jane Doe',
    email: 'jane.doe@example.com'
  };

  const status = await page.open(`${baseUrl}/message`, 'PUT', JSON.stringify(data));
  console.log(status);

  const content = await page.property('content');
  console.log(content);

  await instance.exit();
}

// [DELETE]
async function sendDeleteRequest(): Promise<void> {
  const instance = await phantom.create();
  const page = await instance.createPage();
  await page.on('onResourceRequested', function(requestData) {
    console.info('Requesting', requestData.url);
  });

  const status = await page.open(`${baseUrl}/message/1`, 'DELETE');
  console.log(status);

  const content = await page.property('content');
  console.log(content);

  await instance.exit();
}
