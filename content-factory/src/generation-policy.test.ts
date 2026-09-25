import {
  shouldPublishFallbackWhenQueueEmpty,
} from './generation-policy';

function assert(condition: boolean, message: string): void {
  if (!condition) throw new Error(message);
}

assert(
  shouldPublishFallbackWhenQueueEmpty({} as NodeJS.ProcessEnv) === true,
  'local/manual empty queue may still publish an intentional fallback',
);

assert(
  shouldPublishFallbackWhenQueueEmpty({ GITHUB_EVENT_NAME: 'workflow_dispatch' } as NodeJS.ProcessEnv) === true,
  'manual dispatch empty queue may still publish an intentional fallback',
);

assert(
  shouldPublishFallbackWhenQueueEmpty({ GITHUB_EVENT_NAME: 'schedule' } as NodeJS.ProcessEnv) === false,
  'scheduled cron must not publish a fallback when the queue is empty',
);

assert(
  shouldPublishFallbackWhenQueueEmpty({ CONTENT_FACTORY_SCHEDULED: 'true' } as NodeJS.ProcessEnv) === false,
  'explicit scheduled flag must not publish a fallback when the queue is empty',
);

console.log('✅ generation-policy.test.ts passed');
