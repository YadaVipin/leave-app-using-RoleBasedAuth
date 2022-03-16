import { InternalServerErrorException } from "@nestjs/common";
import { User } from "../auth/user.entity";
import { EntityRepository, getMongoManager, getMongoRepository, Repository } from "typeorm";
import { CreateLeaveDto } from "./dto/create-leave.dto";
import { GetLeavesFilterDto } from "./dto/get-leave.dto";
import { LeaveStatus } from "./leave-status.enum";
import { Leave } from "./leave.entity";

@EntityRepository(Leave)
export class LeaveRepository extends Repository <Leave> {
    async createLeave( createLeaveDto: CreateLeaveDto, user: User):Promise <Leave> {
        const { startDate, endDate, leaveReason } = createLeaveDto;
        
        const leave = this.create({
            leaveReason,
            startDate,
            endDate,
            status: LeaveStatus.PENDING,
            user,
        });
        await this.save(leave);
        return leave;
    }

    async getLeaves(filterDto: GetLeavesFilterDto, ): Promise<Leave[]> {
        const { status, search, sort, page, perPage } = filterDto;

        const leaveRepository = getMongoRepository(Leave);

        const query = this.createQueryBuilder('leave');
        
        try {
            const leaves = await leaveRepository.find() ;
            return leaves
        } catch (error) {
            throw new InternalServerErrorException(); 
        }
    }

    async getUserLeaves(filterDto: GetLeavesFilterDto, user: User ): Promise<Leave[]> {
        const { status, search, sort, page, perPage } = filterDto;

        const leaveRepository = getMongoRepository(Leave);
        
        try {
            const leaves = await leaveRepository.find({user }) ;
            return leaves
        } catch (error) {
            throw new InternalServerErrorException(); 
        }
    }
}