const { QaseApi } = require('qaseio');
const FormData = require('form-data');
const crypto = require('crypto');
const fs = require('fs');
const os = require("os");


let customBoundary = '----------------------------';
crypto.randomBytes(24).forEach((value) => {
    customBoundary += Math.floor(value * 10).toString(16);
});

class CustomBoundaryFormData extends FormData {
    constructor() {
        super();
    }

    getBoundary() {
        return customBoundary;
    }
}

const apiToken = '';
const projectCode = '';
const baseURL = 'https://api.qase.io/v1';
const filePath = os.tmpdir() + '/qase-upload-example.txt';

const api = new QaseApi(
    apiToken,
    baseURL,
    {},
    CustomBoundaryFormData
);

fs.writeFile(filePath, 'file content', function (err) {
    if (err) {
        throw err;
    }
});

const uploadAttachment = async () => {
    const options = { headers: { 'Content-Type': 'multipart/form-data; boundary=' + customBoundary, }, };
    const file = fs.createReadStream(filePath);

    return await api.attachments.uploadAttachment(projectCode, [file], options);
}

uploadAttachment().then(res => console.log(res.data))