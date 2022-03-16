import { Leave } from "src/leave/leave.entity";
import { Column, Entity, ObjectIdColumn, OneToMany, ObjectID, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "./user-role.enum";

@Entity()
export class User {

    @ObjectIdColumn()
    id: ObjectID;

    @Column({ unique: true })
    empId: string;

    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.EMPLOYEE,
    })
    roles: UserRole;

    @OneToMany( (_type) => Leave, (leave) => leave.user, {eager: true})
    leaves:Leave[];
}