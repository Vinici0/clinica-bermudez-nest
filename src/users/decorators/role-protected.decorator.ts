import { SetMetadata } from '@nestjs/common';
import { ValidRoles } from '../interfaces/valid-roles';

export const META_ROLES = 'roles';

export const RoleProtected = (...args: ValidRoles[]) => {
  //Aqui se carga la data para despues ser utilizada en el guard
  return SetMetadata(META_ROLES, args);
};
