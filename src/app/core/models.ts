export type UserRole = 'Administrador' | 'Supervisor' | 'Técnico' | 'Cliente';
export type RecordStatus = 'Ativo' | 'Inativo' | 'Bloqueado' | 'Em revisão';

export interface UserRecord {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: RecordStatus;
  lastAccess: string;
}
export interface ClientRecord {
  id: number;
  code: string;
  name: string;
  legalName: string;
  cnpj: string;
  email: string;
  phone: string;
  segment: string;
  status: RecordStatus;
  manager: string;
}
export interface EquipmentRecord {
  code: string;
  name: string;
  type: string;
  status: string;
  location: string;
  client: string;
  maintenance: string;
}
export interface InspectionRecord {
  id: string;
  client: string;
  equipment: string;
  technician: string;
  date: string;
  status: string;
  progress: number;
}
export interface InspectionTemplate {
  id: number;
  name: string;
  category: string;
  version: number;
  updatedAt: string;
  sections: Array<{ title: string; items: string[] }>;
}
export interface NonConformityRecord {
  code: string;
  title: string;
  equipment: string;
  severity: 'Crítica' | 'Alta' | 'Média' | 'Baixa';
  status: string;
  dueDate: string;
  owner: string;
}
