import { Injectable } from '@angular/core';
import { ClientRecord, EquipmentRecord, InspectionRecord, InspectionTemplate, NonConformityRecord, UserRecord } from './models';

@Injectable({ providedIn: 'root' })
export class FieldOpsDataService {
  users: UserRecord[] = this.load('fieldops.users', [
    { id: 1, name: 'Mariana Souza', email: 'mariana.souza@fieldops.com', phone: '(11) 99999-1001', role: 'Supervisor', status: 'Ativo', lastAccess: 'Hoje, 09:42' },
    { id: 2, name: 'Carlos Henrique', email: 'carlos.henrique@fieldops.com', phone: '(11) 99999-1002', role: 'Técnico', status: 'Ativo', lastAccess: 'Hoje, 08:16' },
    { id: 3, name: 'Paula Mendes', email: 'paula.mendes@fieldops.com', phone: '(11) 99999-1003', role: 'Técnico', status: 'Ativo', lastAccess: 'Ontem, 17:25' },
    { id: 4, name: 'Rafael Lima', email: 'rafael.lima@fieldops.com', phone: '(11) 99999-1004', role: 'Administrador', status: 'Ativo', lastAccess: 'Hoje, 10:03' },
    { id: 5, name: 'Ana Ribeiro', email: 'ana.ribeiro@fieldops.com', phone: '(11) 99999-1005', role: 'Cliente', status: 'Inativo', lastAccess: '12/11/2026' }
  ]);
  clients: ClientRecord[] = this.load('fieldops.clients', [
    { id: 1, code: 'CLI-0018', name: 'Indústria Alpha', legalName: 'Indústria Alpha de Componentes Ltda.', cnpj: '12.345.678/0001-90', email: 'contato@alpha.com.br', phone: '(11) 3000-1000', segment: 'Manufatura', status: 'Ativo', manager: 'Mariana Souza' },
    { id: 2, code: 'CLI-0017', name: 'Metalúrgica Horizonte', legalName: 'Horizonte Metalúrgica S.A.', cnpj: '23.456.789/0001-01', email: 'operacoes@horizonte.com.br', phone: '(11) 3000-2000', segment: 'Metalurgia', status: 'Ativo', manager: 'Rafael Lima' },
    { id: 3, code: 'CLI-0016', name: 'Energia Sul', legalName: 'Energia Sul Ltda.', cnpj: '34.567.890/0001-12', email: 'engenharia@energiasul.com.br', phone: '(11) 3000-3000', segment: 'Energia', status: 'Em revisão', manager: 'Mariana Souza' }
  ]);
  equipment: EquipmentRecord[] = [
    { code: 'EQ-COMP-01', name: 'Compressor de Ar 01', type: 'Compressor', status: 'Operacional', location: 'Galpão 03', client: 'Indústria Alpha', maintenance: '24/07/2026' },
    { code: 'EQ-CNC-04', name: 'Torno CNC Horizon 500', type: 'Torno CNC', status: 'Em manutenção', location: 'Sala Técnica', client: 'Metalúrgica Horizonte', maintenance: '10/10/2026' },
    { code: 'EQ-BOMB-12', name: 'Bomba de Recalque 02', type: 'Bomba', status: 'Pendente de inspeção', location: 'Subsolo Técnico', client: 'Indústria Alpha', maintenance: 'A agendar' },
    { code: 'EQ-EL-99', name: 'Quadro Geral QGBT-01', type: 'Elétrico', status: 'Operacional', location: 'Subestação A', client: 'Energia Sul', maintenance: '02/09/2026' }
  ];
  inspections: InspectionRecord[] = [
    { id: 'INS-2026-018', client: 'Indústria Alpha', equipment: 'Compressor de Ar 01', technician: 'Carlos Henrique', date: '19/11/2026', status: 'Em andamento', progress: 72 },
    { id: 'INS-2026-017', client: 'Metalúrgica Horizonte', equipment: 'Torno CNC Horizon 500', technician: 'Paula Mendes', date: '18/11/2026', status: 'Aguardando revisão', progress: 100 },
    { id: 'INS-2026-016', client: 'Energia Sul', equipment: 'Quadro Geral QGBT-01', technician: 'Carlos Henrique', date: '17/11/2026', status: 'Aprovada', progress: 100 },
    { id: 'INS-2026-015', client: 'Indústria Alpha', equipment: 'Bomba de Recalque 02', technician: 'Paula Mendes', date: '16/11/2026', status: 'Reprovada', progress: 100 }
  ];
  templates: InspectionTemplate[] = this.load('fieldops.templates', [
    { id: 1, name: 'Preventiva de Compressor', category: 'Mecânica & Sistemas Rotativos', version: 3, updatedAt: '15/11/2026', sections: [{ title: 'Identificação', items: ['Conferir placa e número de série', 'Registrar condição geral'] }, { title: 'Inspeção visual', items: ['Verificar vazamentos', 'Conferir proteções e conexões'] }] },
    { id: 2, name: 'Segurança Elétrica — NR-10', category: 'Elétrica & Automação', version: 2, updatedAt: '12/11/2026', sections: [{ title: 'Instalação', items: ['Verificar sinalização', 'Conferir integridade dos cabos'] }] },
    { id: 3, name: 'Equipamento Hidráulico', category: 'Hidráulica', version: 1, updatedAt: '08/11/2026', sections: [{ title: 'Sistema hidráulico', items: ['Verificar mangueiras', 'Verificar pressão'] }] }
  ]);
  nonConformities: NonConformityRecord[] = [
    { code: 'NC-2026-021', title: 'Inspeção preventiva não realizada', equipment: 'Bomba de Recalque 02', severity: 'Alta', status: 'Aguardando ação', dueDate: '21/11/2026', owner: 'Supervisor de Operações' },
    { code: 'NC-2026-018', title: 'Equipamento indisponível para operação', equipment: 'Torno CNC Horizon 500', severity: 'Crítica', status: 'Em tratamento', dueDate: '22/11/2026', owner: 'Equipe de Manutenção' },
    { code: 'NC-2026-014', title: 'Vibração acima do limite', equipment: 'Compressor de Ar 01', severity: 'Média', status: 'Aguardando ação', dueDate: '25/11/2026', owner: 'Equipe de Manutenção' }
  ];

  private load<T>(key: string, seed: T[]): T[] {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) as T[] : seed;
    } catch {
      return seed;
    }
  }
  private persist<T>(key: string, value: T[]): void {
    try { localStorage.setItem(key, JSON.stringify(value)); }
    catch (error) { console.warn('Não foi possível persistir os dados locais.', error); }
  }
  saveUser(user: UserRecord): void {
    if (user.id) this.users = this.users.map(item => item.id === user.id ? { ...user } : item);
    else this.users = [...this.users, { ...user, id: Math.max(0, ...this.users.map(item => item.id)) + 1 }];
    this.persist('fieldops.users', this.users);
  }
  toggleUserStatus(id: number): void {
    this.users = this.users.map(user => user.id === id ? { ...user, status: user.status === 'Ativo' ? 'Inativo' : 'Ativo' } : user);
    this.persist('fieldops.users', this.users);
  }
  saveClient(client: ClientRecord): void {
    if (client.id) this.clients = this.clients.map(item => item.id === client.id ? { ...client } : item);
    else this.clients = [...this.clients, { ...client, id: Math.max(0, ...this.clients.map(item => item.id)) + 1, code: `CLI-${String(this.clients.length + 1).padStart(4, '0')}` }];
    this.persist('fieldops.clients', this.clients);
  }
  toggleClientStatus(id: number): void {
    this.clients = this.clients.map(client => client.id === id ? { ...client, status: client.status === 'Ativo' ? 'Inativo' : 'Ativo' } : client);
    this.persist('fieldops.clients', this.clients);
  }
  saveTemplate(template: InspectionTemplate): void {
    if (template.id) this.templates = this.templates.map(item => item.id === template.id ? { ...template } : item);
    else this.templates = [...this.templates, { ...template, id: Math.max(0, ...this.templates.map(item => item.id)) + 1, version: 1, updatedAt: new Date().toLocaleDateString('pt-BR') }];
    this.persist('fieldops.templates', this.templates);
  }
  updateInspection(id: string, status: string): void {
    this.inspections = this.inspections.map(item => item.id === id ? { ...item, status } : item);
  }
}
