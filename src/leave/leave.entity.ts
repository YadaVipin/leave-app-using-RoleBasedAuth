import { User } from "src/auth/user.entity";
import { Column, Entity, ManyToOne, ObjectIdColumn, ObjectID, PrimaryGeneratedColumn } from "typeorm";
import { LeaveStatus } from "./leave-status.enum";
import { Exclude } from "class-transformer";

@Entity()
export class Leave {

    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    leaveReason: string;

    @Column()
    startDate: string;

    @Column()
    endDate: string;

    @Column()
    status: LeaveStatus;

    @ManyToOne( (_type) => User, (user) => user.leaves, {eager: false})
    @Exclude({ toPlainOnly: true})
    user: User;
}