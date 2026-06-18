export type AuditAction = 'CARBON_RECORD' | 'POINT_EXCHANGE' | 'CHARITY_DONATION';

export interface AuditLogEntry {
  operator: string;
  action: AuditAction;
  time: string;
  detail: unknown;
}

const auditLog: AuditLogEntry[] = [];

export function recordAuditLog(entry: Omit<AuditLogEntry, 'time'>): AuditLogEntry {
  const logEntry = {
    ...entry,
    time: new Date().toISOString()
  };
  auditLog.unshift(logEntry);
  return logEntry;
}

export function getAuditLogs(): AuditLogEntry[] {
  return [...auditLog];
}
