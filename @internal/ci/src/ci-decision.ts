import { execFileSync } from 'node:child_process';

/**
 * Asks turbo whether `packageName#task` is affected by the changes since the
 * SCM base (`TURBO_SCM_BASE` in CI, otherwise `main`).
 *
 * Throws if turbo fails, so a broken check fails the CI job instead of
 * silently skipping it.
 */
export function isTaskAffected(packageName: string, task: string): boolean {
  const taskId = `${packageName}#${task}`;
  try {
    const output = execFileSync(
      'pnpm',
      [
        'turbo',
        'run',
        task,
        `--filter=${packageName}`,
        '--affected',
        '--dry-run=json',
      ],
      // Capture stderr so turbo's complaints end up in the thrown error
      // instead of cluttering the log when everything works.
      { encoding: 'utf8', stdio: 'pipe' },
    );
    const { tasks } = JSON.parse(output);
    // A task without an id would make every check below answer "not
    // affected", which would silently skip the job.
    if (
      !Array.isArray(tasks) ||
      !tasks.every((t) => typeof t?.taskId === 'string')
    ) {
      throw new Error('The dry run output has no "tasks" list with ids');
    }
    return tasks.some((t) => t.taskId === taskId);
  } catch (cause) {
    throw new Error(`Could not ask turbo whether ${taskId} is affected`, {
      cause,
    });
  }
}

/**
 * Prints the facts behind a decision and its conclusion to stderr, so they
 * appear in the CI log, and the answer alone to stdout (no trailing newline),
 * so the workflow can capture it.
 */
export function reportDecision(
  facts: Record<string, boolean>,
  conclusion: string,
  answer: boolean,
) {
  const factLines = Object.entries(facts).map(
    ([question, value]) => `${question} ${value}\n`,
  );
  process.stderr.write(
    [...factLines, `Conclusion: ${conclusion} ${answer}\n`].join(''),
  );
  process.stdout.write(String(answer));
}
