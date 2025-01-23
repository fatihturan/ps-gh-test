import { datadogLogs } from '@datadog/browser-logs';

interface LogContext {
  [key: string]: unknown;
}

// Initialize Datadog Logs with environment and service tags
datadogLogs.init({
  clientToken: import.meta.env.VITE_DATADOG_CLIENT_TOKEN as string,
  site: 'datadoghq.com',
  forwardErrorsToLogs: true,
  service: 'pine-sports-react',  // Sets the 'service' tag
  env: import.meta.env.VITE_ENV, // Sets the 'env' tag
});

// Export the logger object with typed logging methods
const logger = {
  info: (message: string, context: LogContext = {}) => {
    datadogLogs.logger.info(message, context);
  },
  warn: (message: string, context: LogContext = {}) => {
    datadogLogs.logger.warn(message, context);
  },
  error: (message: string, context: LogContext = {}) => {
    datadogLogs.logger.error(message, context);
  },
};

export default logger;