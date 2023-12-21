import {Injectable} from "@nestjs/common";
import {DropboxResponse} from "dropbox";
import {DropboxDownloadResponse, DropboxTempLinkResponse} from "../../common/types/dropbox";

const Dropbox = require('dropbox').Dropbox;

// TODO DI containerize

@Injectable()
export class DropboxService {

    private dbx

    constructor() {
        this.dbx = new Dropbox({
            clientId: process.env.DROPBOX_APP_KEY,
            clientSecret: process.env.DROPBOX_APP_SECRET,
            refreshToken: process.env.DROPBOX_REFRESH,
        });
    }

    uploadFile(buffer, type: 'music' | 'image', fileName: string): Promise<DropboxResponse<DropboxDownloadResponse>> {

        return this.dbx.filesUpload({
            path: type === 'music' ? `/music/${fileName}` : `/image/${fileName}`,
            contents: buffer
        })
            .then((response) => {
                return response;
            })
            .catch((uploadErr) => {
                return uploadErr;
            });
    }

    getFileStreamableUrl(id: string): Promise<DropboxResponse<DropboxTempLinkResponse>> {
            if(!id) return Promise.resolve(new DropboxResponse(409, {}, {
                link: ''
            }))
            return this.dbx.filesGetTemporaryLink({
                path: id
            })
    }

    deleteFile(id: string) {
        return this.dbx.filesDeleteV2({
            path: id
        });
    }

}