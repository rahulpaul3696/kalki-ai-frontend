// Sandbox status types
export type SandboxStatus = 'LIVE' | 'STARTING' | 'OFFLINE' | 'FAILED' | 'UNKNOWN';

export interface ServicesHealth {
  browser?: boolean;
  vnc?: boolean;
  terminal?: boolean;
  filesystem?: boolean;
  lastChecked?: string;
}

export interface SandboxState {
  status: SandboxStatus;
  sandbox_id?: string | null;
  daytonaState?: string;
  servicesHealth?: ServicesHealth;
  message?: string;
  lastUpdated?: string;
}

// Derive sandbox status from raw state
export function deriveSandboxStatus(daytonaState: string | undefined, servicesHealth?: ServicesHealth): SandboxStatus {
  if (!daytonaState) return 'UNKNOWN';
  
  const normalizedState = daytonaState.toLowerCase();
  
  if (normalizedState === 'started' || normalizedState === 'running') {
    // Check service health if available
    if (servicesHealth) {
      const allHealthy = Object.values(servicesHealth)
        .filter((v): v is boolean => typeof v === 'boolean')
        .every((v) => v === true);
      return allHealthy ? 'LIVE' : 'STARTING';
    }
    return 'LIVE';
  }
  
  if (normalizedState === 'starting' || normalizedState === 'pending' || normalizedState === 'creating') {
    return 'STARTING';
  }
  
  if (normalizedState === 'stopped' || normalizedState === 'archived' || normalizedState === 'inactive') {
    return 'OFFLINE';
  }
  
  if (normalizedState === 'failed' || normalizedState === 'error') {
    return 'FAILED';
  }
  
  return 'UNKNOWN';
}

// Check if sandbox is usable
export function isSandboxUsable(status: SandboxStatus): boolean {
  return status === 'LIVE';
}

// Check if sandbox is transitioning
export function isSandboxTransitioning(status: SandboxStatus): boolean {
  return status === 'STARTING';
}

// Check if sandbox is offline
export function isSandboxOffline(status: SandboxStatus): boolean {
  return status === 'OFFLINE';
}

// Check if sandbox has failed
export function isSandboxFailed(status: SandboxStatus): boolean {
  return status === 'FAILED';
}

// Get human-readable status label
export function getSandboxStatusLabel(status: SandboxStatus): string {
  const labels: Record<SandboxStatus, string> = {
    LIVE: 'Running',
    STARTING: 'Starting...',
    OFFLINE: 'Offline',
    FAILED: 'Failed',
    UNKNOWN: 'Unknown',
  };
  return labels[status] || 'Unknown';
}
