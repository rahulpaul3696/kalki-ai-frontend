// Animation utilities and configurations

export interface AnimationConfig {
  duration: number;
  easing: string;
  delay?: number;
}

export const fadeIn: AnimationConfig = {
  duration: 200,
  easing: 'ease-out',
};

export const fadeOut: AnimationConfig = {
  duration: 150,
  easing: 'ease-in',
};

export const slideIn: AnimationConfig = {
  duration: 250,
  easing: 'ease-out',
};

export const slideOut: AnimationConfig = {
  duration: 200,
  easing: 'ease-in',
};

export const scaleIn: AnimationConfig = {
  duration: 200,
  easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
};

export const scaleOut: AnimationConfig = {
  duration: 150,
  easing: 'ease-in',
};

// Message animation configurations
export const messageAnimations = {
  enter: {
    opacity: [0, 1],
    y: [10, 0],
    duration: 300,
    easing: 'ease-out',
  },
  exit: {
    opacity: [1, 0],
    y: [0, -10],
    duration: 200,
    easing: 'ease-in',
  },
};

// Tool call animation configurations
export const toolCallAnimations = {
  pending: {
    opacity: [0.6, 1, 0.6],
    duration: 1500,
    easing: 'ease-in-out',
    loop: true,
  },
  complete: {
    scale: [1, 1.05, 1],
    duration: 200,
    easing: 'ease-out',
  },
};

// Export animation presets
export const animationPresets = {
  fadeIn,
  fadeOut,
  slideIn,
  slideOut,
  scaleIn,
  scaleOut,
  messageAnimations,
  toolCallAnimations,
};
