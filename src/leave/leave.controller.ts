import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { GetLeavesFilterDto } from './dto/get-leave.dto';
import { UpdateLeaveStatusDto } from './dto/update-status.dto';
import { Leave } from './leave.entity';
import { LeaveService } from './leave.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRole } from 'src/auth/user-role.enum';
import { Roles } from 'src/auth/roles.decorator';


@Controller('leaves')
@UseGuards(AuthGuard(), RolesGuard)
export class LeaveController {
    constructor(private leaveService: LeaveService) {}
    
    @Post()
    @Roles(UserRole.EMPLOYEE)
    createLeave(
        @Body() createLeaveDto: CreateLeaveDto,
        @GetUser() user: User,
    ): Promise<Leave> {
        return this.leaveService.createLeave(createLeaveDto, user);
    }


    @Get()
    @Roles(UserRole.EMPLOYEE)
    getUserLeaves(
        @Query() filterDto: GetLeavesFilterDto,
        @GetUser() user: User,
    ): Promise<Leave[]> {
        return this.leaveService.getUserLeaves(filterDto, user);
    }

    @Get('/allLeaves')
    @Roles(UserRole.MANAGER)
    getLeaves(
        @Query() filterDto: GetLeavesFilterDto,
    ): Promise<Leave[]> {
        return this.leaveService.getLeaves(filterDto);
    }

    @Patch('/:id/status')
    @Roles(UserRole.MANAGER)
    updateLeaveStatus(
        @Param('id') _id: string,
        @Body() updateLeaveStatusDto: UpdateLeaveStatusDto,
    ): Promise<Leave> {
        const { status } = updateLeaveStatusDto;
        return this.leaveService.updateLeaveStatus(_id, status);
    }

    @Delete('/:id')
    @Roles(UserRole.EMPLOYEE)
    async deleteLeave(
        @Param('id') _id: string,
        @GetUser() user: User,
    ): Promise<void> {
        return await this.leaveService.deleteLeave(_id, user);
    }
}
