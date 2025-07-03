import * as color from 'cli-color';
import {Progress} from "./types";
import {createLogUpdate} from 'log-update';

type Status = 'pending' | 'success' | 'error';

const spinnerFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
let spinnerFrame = 0;

interface Line {
  message: string;
  status: Status;
}

const lines: Record<string, Line> = {};
let timer: NodeJS.Timeout;

const getIndicator = (status: Status, spinner: string) => {
  if (status === 'success') {
    return color.green('✓');
  } else if (status === 'error') {
    return color.red('✕');
  }

  return `${spinner}`;
};

const getText = (line: Line) => {
  switch (line.status) {
    case 'error':
      return color.red(line.message);
  }
  return line.message;
};

const getSpinner = () => {
  if (spinnerFrame >= spinnerFrames.length) {
    spinnerFrame = 0;
  }

  return spinnerFrames[spinnerFrame++] || '';
}

const printLines = createLogUpdate(process.stdout, {
  showCursor: false,
})

const updateScreen = () => {
  printLines(
    Object.entries(lines)
      .map(([, line]) => `${getIndicator(line.status, getSpinner())} ${getText(line)}`).join('\n')
  );
}

const isActive = () =>
  Object.values(lines).some((line) =>
    ['pending'].includes(line.status)
  )

const checkInterval = () => {
  if (isActive() && !timer) {
    // start animation
    timer = setInterval(() => updateScreen(), 100);
  } else if (timer && !isActive()) {
    // finish animation
    clearInterval(timer);
    timer = undefined;
    updateScreen();
  }
}

export const spinnerProgress = (key: string): Progress => {
  return {
    error(message) {
      lines[key] = {message, status: 'error'};
      checkInterval();
    },
    success(message) {
      lines[key] = {message, status: 'success'};
      checkInterval();
    },
    progress(message) {
      lines[key] = {message, status: 'pending'};
      checkInterval();
    }
  }
}
