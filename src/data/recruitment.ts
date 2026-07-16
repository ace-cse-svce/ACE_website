export const APPLICATION_DEADLINE = new Date("2026-07-15T23:59:59");

export const isApplicationsClosed = (): boolean => Date.now() > APPLICATION_DEADLINE.getTime();
