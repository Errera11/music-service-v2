import {Injectable} from "@nestjs/common";
import {DropboxResponse} from "dropbox";
import {DropboxTempLinkResponse} from "../../common/types/dropbox";

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

    uploadFile(buffer, type: 'music' | 'image', fileName: string) {
        return this.dbx.filesUpload({path: type === 'music' ? `/music/${fileName}` : `/image/${fileName}`, contents: buffer})
            .then((response) => {
                return response;
            })
            .catch((uploadErr) => {
                return uploadErr;
            });
    }
    getFileStreamableUrl(id: string): Promise<DropboxResponse<DropboxTempLinkResponse>> {
        return this.dbx.filesGetTemporaryLink({
            path: id
        })
    }

}