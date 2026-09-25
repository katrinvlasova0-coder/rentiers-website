/**
 * Scheduled cron must not mint fallback-* articles when there is nothing to generate.
 * Manual workflow_dispatch may still publish an intentional fallback.
 */
export function isScheduledFactoryRun(env: NodeJS.ProcessEnv = process.env): boolean {
  return env.GITHUB_EVENT_NAME === 'schedule' || env.CONTENT_FACTORY_SCHEDULED === 'true';
}

export function shouldPublishFallbackWhenQueueEmpty(env: NodeJS.ProcessEnv = process.env): boolean {
  return !isScheduledFactoryRun(env);
}
