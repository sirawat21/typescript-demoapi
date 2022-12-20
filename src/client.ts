import * as phantom from 'phantom';

/* Main */
(async function main() {
  // Mock //
  const mockCreateData = [
    {
      user: 'Benn',
      text: 'Hello there!'
    },
    {
      user: 'Brett',
      text: 'Hi, everyone.'
    },
    {
      user: 'Brett',
      text: 'This is a simple data.'
    },
  ];
  const mockUpdateData = {
    user: 'Benn',
    text: 'My program need to test.'
  }
  // Testing //
  /* POST */
  await(async function () {
    console.log(`${'-'.repeat(30)} POST`);
    mockCreateData.map(async (message, key) => {
      const resultRequestPost = await requestPost('/message', message);
      console.log(`[${key}] ----->`);
      console.log(resultRequestPost);
    });
  })();
  /* PUT */
  await(async function () {
    console.log(`${'-'.repeat(30)} PUT`);
    const resultRequestPut = await requestPut('/message', mockUpdateData, '2');
    console.log(resultRequestPut);
  })();
  /* DELETE */
  await(async function () {
    console.log(`${'-'.repeat(30)} DELETE`);
    const resultRequestDelete = await requestDelete('/message', '1');
    console.log(resultRequestDelete);
  })();
  /* GET */
  await(async function () {
    console.log(`${'-'.repeat(30)} GET`);
    const resultRequestGet = await requestGet('/message');
    console.log(resultRequestGet);
  })();
  /* GET ID */
  await(async function () {
    console.log(`${'-'.repeat(30)} GET ID`);
    let resultRequestGetById = await requestGetById('/message', '1');
    console.log(resultRequestGetById);
  })();

})();

/* Phantom Request Handler */
const port = 3030;
const url = `http://localhost:${port}/api`;

// [GET ALL]
async function requestGet(path: string, params: string = ''): Promise<string> {
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
async function requestGetById(path: string, params: string = ''): Promise<string> {
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
async function requestPost(path: string, data: Object, param: string = ''): Promise<string> {
  // Set operation
  const options: phantom.IOpenWebPageSettings = {
    operation: 'POST',
    encoding: 'utf8',
    headers: {
      'Content-Type': 'application/json'
    },
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
async function requestPut(path: string, data: Object, param: string = ''): Promise<string> {
  // Set operation
  const options: phantom.IOpenWebPageSettings = {
    operation: 'PUT',
    encoding: 'utf8',
    headers: {
      'Content-Type': 'application/json'
    },
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
async function requestDelete(path: string, param: string = ''): Promise<string> {
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
