"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../infrastructure/prisma.service");
const bcrypt = require("bcrypt");
const UserRoles_1 = require("../../common/UserRoles");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        });
        if (user) {
            throw new Error(`User with email ${dto.email} already exists`);
        }
        const hashedPassword = bcrypt.hash(dto.password);
        const userId = bcrypt.v4();
        const newUser = await this.prisma.user.create({
            data: Object.assign(Object.assign({}, dto), { id: userId, role: [UserRoles_1.UserRoles.USER], password: hashedPassword, email_auth: {
                    create: {
                        is_auth: false
                    }
                } })
        });
        return {
            email: newUser.email,
            name: newUser.name,
            role: newUser.role,
            is_email_auth: false
        };
    }
    async login(dto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            },
            include: {
                email_auth: true
            }
        });
        const isValidPassword = bcrypt.compare(dto.password, user.password);
        if (!isValidPassword || !user)
            throw new Error(`Invalid email or password`);
        return {
            email: user.email,
            name: user.name,
            role: user.role,
            is_email_auth: user.email_auth.is_auth
        };
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map