// Error types for tier restrictions
export type TierErrorType =
  | 'agent_run_limit'
  | 'agent_count_limit'
  | 'project_limit'
  | 'thread_limit'
  | 'trigger_limit'
  | 'custom_worker_limit'
  | 'model_access_denied'
  | 'billing'
  | 'no_access_token'
  | 'request_too_large';

export interface TierLimitErrorState {
  type: TierErrorType;
  message: string;
  currentUsage?: number;
  limit?: number;
  tierName?: string;
}

export interface TierLimitErrorUI {
  title: string;
  description: string;
  action: string;
  actionUrl?: string;
}

// Base error class for tier restrictions
export class BillingError extends Error {
  code: string;
  status: number;
  details?: Record<string, unknown>;

  constructor(message: string, code: string = 'BILLING_ERROR', status: number = 402, details?: Record<string, unknown>) {
    super(message);
    this.name = 'BillingError';
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

export class AgentRunLimitError extends BillingError {
  constructor(message: string = 'Agent run limit reached', details?: Record<string, unknown>) {
    super(message, 'AGENT_RUN_LIMIT', 402, details);
    this.name = 'AgentRunLimitError';
  }
}

export class AgentCountLimitError extends BillingError {
  constructor(message: string = 'Agent count limit reached', details?: Record<string, unknown>) {
    super(message, 'AGENT_COUNT_LIMIT', 402, details);
    this.name = 'AgentCountLimitError';
  }
}

export class ProjectLimitError extends BillingError {
  constructor(message: string = 'Project limit reached', details?: Record<string, unknown>) {
    super(message, 'PROJECT_LIMIT', 402, details);
    this.name = 'ProjectLimitError';
  }
}

export class ThreadLimitError extends BillingError {
  constructor(message: string = 'Thread limit reached', details?: Record<string, unknown>) {
    super(message, 'THREAD_LIMIT', 402, details);
    this.name = 'ThreadLimitError';
  }
}

export class TriggerLimitError extends BillingError {
  constructor(message: string = 'Trigger limit reached', details?: Record<string, unknown>) {
    super(message, 'TRIGGER_LIMIT', 402, details);
    this.name = 'TriggerLimitError';
  }
}

export class CustomWorkerLimitError extends BillingError {
  constructor(message: string = 'Custom worker limit reached', details?: Record<string, unknown>) {
    super(message, 'CUSTOM_WORKER_LIMIT', 402, details);
    this.name = 'CustomWorkerLimitError';
  }
}

export class ModelAccessDeniedError extends BillingError {
  constructor(message: string = 'Model access denied', details?: Record<string, unknown>) {
    super(message, 'MODEL_ACCESS_DENIED', 403, details);
    this.name = 'ModelAccessDeniedError';
  }
}

export class NoAccessTokenAvailableError extends Error {
  code: string;
  
  constructor(message: string = 'No access token available') {
    super(message);
    this.name = 'NoAccessTokenAvailableError';
    this.code = 'NO_ACCESS_TOKEN';
  }
}

export class RequestTooLargeError extends Error {
  code: string;
  status: number;
  suggestion?: string;

  constructor(status: number = 431, details?: { message?: string; suggestion?: string }) {
    super(details?.message || 'Request is too large');
    this.name = 'RequestTooLargeError';
    this.code = 'REQUEST_TOO_LARGE';
    this.status = status;
    this.suggestion = details?.suggestion;
  }
}

// Parse API error response into specific error type
export function parseTierRestrictionError(error: any): Error {
  const errorCode = error?.code || error?.data?.code || error?.details?.error_code;
  const message = error?.message || 'An error occurred';
  const details = error?.details || error?.data;

  switch (errorCode) {
    case 'AGENT_RUN_LIMIT':
    case 'agent_run_limit':
      return new AgentRunLimitError(message, details);
    case 'AGENT_COUNT_LIMIT':
    case 'agent_count_limit':
      return new AgentCountLimitError(message, details);
    case 'PROJECT_LIMIT':
    case 'project_limit':
      return new ProjectLimitError(message, details);
    case 'THREAD_LIMIT':
    case 'thread_limit':
      return new ThreadLimitError(message, details);
    case 'TRIGGER_LIMIT':
    case 'trigger_limit':
      return new TriggerLimitError(message, details);
    case 'CUSTOM_WORKER_LIMIT':
    case 'custom_worker_limit':
      return new CustomWorkerLimitError(message, details);
    case 'MODEL_ACCESS_DENIED':
    case 'model_access_denied':
      return new ModelAccessDeniedError(message, details);
    default:
      return new BillingError(message, errorCode, 402, details);
  }
}

// Check if error is a tier restriction error
export function isTierRestrictionError(error: any): boolean {
  return (
    error instanceof BillingError ||
    error instanceof AgentRunLimitError ||
    error instanceof AgentCountLimitError ||
    error instanceof ProjectLimitError ||
    error instanceof ThreadLimitError ||
    error instanceof TriggerLimitError ||
    error instanceof CustomWorkerLimitError ||
    error instanceof ModelAccessDeniedError
  );
}

// Extract error state from error object
export function extractTierLimitErrorState(error: any): TierLimitErrorState | null {
  if (!isTierRestrictionError(error)) return null;

  const type = error.name?.replace('Error', '').toLowerCase().replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase() as TierErrorType;

  return {
    type,
    message: error.message,
    currentUsage: error.details?.current_usage,
    limit: error.details?.limit,
    tierName: error.details?.tier_name,
  };
}

// Get user-friendly error title
export function getTierLimitErrorTitle(errorState: TierLimitErrorState): string {
  const titles: Record<TierErrorType, string> = {
    agent_run_limit: 'Agent Run Limit Reached',
    agent_count_limit: 'Agent Limit Reached',
    project_limit: 'Project Limit Reached',
    thread_limit: 'Thread Limit Reached',
    trigger_limit: 'Trigger Limit Reached',
    custom_worker_limit: 'Custom Worker Limit Reached',
    model_access_denied: 'Model Access Restricted',
    billing: 'Billing Issue',
    no_access_token: 'Authentication Required',
    request_too_large: 'Request Too Large',
  };

  return titles[errorState.type] || 'Limit Reached';
}

// Get suggested action for error
export function getTierLimitErrorAction(errorState: TierLimitErrorState): string {
  return 'Upgrade your plan for more capacity';
}

// Format error for UI display
export function formatTierLimitErrorForUI(error: any): TierLimitErrorUI {
  const state = extractTierLimitErrorState(error);
  
  if (!state) {
    return {
      title: 'Error',
      description: error?.message || 'An error occurred',
      action: 'Try again',
    };
  }

  return {
    title: getTierLimitErrorTitle(state),
    description: state.message,
    action: getTierLimitErrorAction(state),
    actionUrl: '/pricing',
  };
}

export function formatTierErrorForUI(error: any): TierLimitErrorUI {
  return formatTierLimitErrorForUI(error);
}
