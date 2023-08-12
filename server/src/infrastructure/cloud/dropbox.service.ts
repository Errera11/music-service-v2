import {Injectable} from "@nestjs/common";
import * as fs from 'fs'
import {DropboxResponse} from "dropbox";
import {DropboxDownloadResponse} from "../../common/types/dropbox";
const path = require('path');

const Dropbox = require('dropbox').Dropbox;

@Injectable()
export class DropboxService {
    private dbx
    constructor() {
        this.dbx = new Dropbox({accessToken: process.env.DROPBOX_ACCESS});
    }

    uploadFile(buffer, type: 'music' | 'image', fileName: string) {
        return this.dbx.filesUpload({path: type === 'music' ? `/music/${fileName}` : `/image/${fileName}`, contents: buffer})
            .then((response) => {
                return response;
            })
            .catch((uploadErr) => {
                return uploadErr;
            });
    }
    downloadFileById(id: string): Promise<DropboxResponse<DropboxDownloadResponse>> {
        return this.dbx.filesDownload({
            path: id
        })
    }

}