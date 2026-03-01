// Credit formatting utilities for Kalki AI 26

export function formatCredits(credits: number): string {
  return credits.toLocaleString();
}

export function dollarsToCredits(dollars: number): number {
  return dollars * 100;
}

export function formatCreditsWithSign(credits: number): string {
  const sign = credits >= 0 ? '+' : '';
  return `${sign}${credits.toLocaleString()}`;
}

export const PLAN_DETAILS = {
  free: { name: 'Free', price: 0, credits: 100 },
  pro: { name: 'Pro', price: 20, credits: 2000 },
  enterprise: { name: 'Enterprise', price: 100, credits: 15000 },
};

export function getPlanDetails(planId: string) {
  return PLAN_DETAILS[planId as keyof typeof PLAN_DETAILS] || PLAN_DETAILS.free;
}
