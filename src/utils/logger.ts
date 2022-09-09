import { ConsoleLogger } from "@nabcellent/sui-react";

/** Log levels */
export type LogLevel = 'log' | 'warn' | 'error';

export const LOG_LEVEL: LogLevel = import.meta.env.VITE_LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'warn' : 'debug');
export const logger = new ConsoleLogger({ level: LOG_LEVEL });