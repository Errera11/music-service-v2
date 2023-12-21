import {Module} from "@nestjs/common";
import {PlaylistService} from "./services/playlist/playlist.service";
import {PlaylistController} from "../infrastructure/controllers/playlist.controller";

@Module({
    controllers: [PlaylistController],
    providers: [PlaylistService]
})
export class PlaylistModule{}