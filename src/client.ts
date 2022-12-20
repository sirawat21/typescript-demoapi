import * as phantom from 'phantom';

/* Main */
const main = (async () => {
  const data = {
    user: 'John Doe',
    text: 'john.doe@example.com'
  };
  await sendPostRequest('/message', data);
  let result = await sendGetRequest('/message');
  console.log(result);
})();

/* Phantom Request Handler */
const port = 3030;
const url = `http://localhost:${port}/api`;

// [GET ALL]
async function sendGetRequest(path: string, params: string = ''): Promise<string> {
  // Set up request
  const instance = await phantom.create();
  const page = await instance.createPage();
  const status = await page.open(`${url}${path}/${params}`);
  // Status handler
  let content: string;
  if (status === 'success') content = await page.property('content');
  else content = 'Requesting is fail.';
  instance.exit();
  // Return result
  return JSON.stringify(content);
}

// [GET ID]
async function sendGetRequestWithId(path: string, params: string = ''): Promise<string> {
  // Set up request
  const instance = await phantom.create();
  const page = await instance.createPage();
  const status = await page.open(`${url}${path}/${params}`);
  // Status handler
  let content: string;
  if (status === 'success') content = await page.property('content');
  else content = 'Requesting is fail.';
  instance.exit();
  // Return result
  return JSON.stringify(content);
}

// [POST]
async function sendPostRequest(path: string, data: Object, param: string = ''): Promise<string> {
  // Set operation
  const options: phantom.IOpenWebPageSettings = {
    operation: 'POST',
    data: JSON.stringify(data)
  }
  // Set up request
  const instance = await phantom.create();
  const page = await instance.createPage();
  await page.on('onResourceRequested', function (requestData) {
    console.info('Requesting', requestData.url);
  });
  const status = await page.open(`${url}${path}/${param}`, options);
  // Status handler
  let content: string;
  if (status === 'success') content = await page.property('content');
  else content = 'Requesting is fail.';
  instance.exit();
  // Return result
  return JSON.stringify(content);
}

// [PUT]
async function sendPutRequest(path: string, data: Object, param: string = ''): Promise<string> {
  // Set operation
  const options: phantom.IOpenWebPageSettings = {
    operation: 'PUT',
    data: JSON.stringify(data)
  }
  // Set up request
  const instance = await phantom.create();
  const page = await instance.createPage();
  await page.on('onResourceRequested', function (requestData) {
    console.info('Requesting', requestData.url);
  });
  const status = await page.open(`${url}${path}/${param}`, options);
  // Status handler
  let content: string;
  if (status === 'success') content = await page.property('content');
  else content = 'Requesting is fail.';
  instance.exit();
  // Return result
  return JSON.stringify(content);
}

// [DELETE]
async function sendDeleteRequest(path: string, param: string = ''): Promise<string> {
  // Set operation
  const options: phantom.IOpenWebPageSettings = {
    operation: 'DELETE'
  }
  // Set up request
  const instance = await phantom.create();
  const page = await instance.createPage();
  await page.on('onResourceRequested', function (requestData) {
    console.info('Requesting', requestData.url);
  });
  const status = await page.open(`${url}${path}/${param}`, options);
  // Status handler
  let content: string;
  if (status === 'success') content = await page.property('content');
  else content = 'Requesting is fail.';
  instance.exit();
  // Return result
  return JSON.stringify(content);
}
