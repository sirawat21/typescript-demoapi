import * as phantom from 'phantom';

const port = 3030;
const path = 'api'
const baseUrl = `http://localhost:${port}/${path}`;

// [GET ALL]
async function sendGetRequest(): Promise<string> {
  const instance = await phantom.create();
  const page = await instance.createPage();
  const status = await page.open(`${baseUrl}/message`);
  console.log(status);

  const content = await page.property('content');
  console.log(content);

  await instance.exit();
  return JSON.stringify(content);
}

// [GET ID]
async function sendGetRequestWithId(id: string): Promise<string> {
  const instance = await phantom.create();
  const page = await instance.createPage();
  const status = await page.open(`${baseUrl}/message/${id}`);
  console.log(status);

  const content = await page.property('content');
  console.log(content);

  await instance.exit();
  return JSON.stringify(content);
}

// [POST]
async function sendPostRequest(): Promise<void> {
  const instance = await phantom.create();
  const page = await instance.createPage();
  await page.on('onResourceRequested', function (requestData) {
    console.info('Requesting', requestData.url);
  });

  // sset ttp operation & send data
  const data = {
    user: 'John Doe',
    text: 'john.doe@example.com'
  };
  const options: phantom.IOpenWebPageSettings = {
    operation: 'POST',
    data: JSON.stringify(data)
  }

  const method: 'POST' = 'POST';
  const status = await page.open(`${baseUrl}/message`, options);
  console.log(status);

  await page.setContent(baseUrl + '/message', JSON.stringify(data)); // set send var

  const content = await page.property('content');
  console.log(content);

  await instance.exit();
}

// [PUT]
async function sendPutRequest(id: string): Promise<void> {
  const instance = await phantom.create();
  const page = await instance.createPage();
  await page.on('onResourceRequested', function (requestData) {
    console.info('Requesting', requestData.url);
  });

  // set ttp operation & send data
  const data = {
    user: 'John Doe',
    text: 'john.doe@example.com'
  };
  const options: phantom.IOpenWebPageSettings = {
    operation: 'PUT',
    data: JSON.stringify(data)
  }

  const status = await page.open(`${baseUrl}/message/${id}`, options);
  console.log(status);

  await page.setContent(baseUrl + '/message', JSON.stringify(data)); // set send var

  const content = await page.property('content');
  console.log(content);

  await instance.exit();
}

// [DELETE]
async function sendDeleteRequest(id: string): Promise<void> {
  const instance = await phantom.create();
  const page = await instance.createPage();
  await page.on('onResourceRequested', function (requestData) {
    console.info('Requesting', requestData.url);
  });

  // sset ttp operation & send data
  const options: phantom.IOpenWebPageSettings = {
    operation: 'DELETE'
  }

  const status = await page.open(`${baseUrl}/message/${id}`, options);
  console.log(status);

  const content = await page.property('content');
  console.log(content);

  await instance.exit();
}
