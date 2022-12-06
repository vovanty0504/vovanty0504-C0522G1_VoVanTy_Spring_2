import {UserRole} from './user-role';

export interface Role {
  id: number;
  name: string;
  userRoleList: UserRole[];
}
