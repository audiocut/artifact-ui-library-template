export  type SessionState = {
  userId: string;
  sessionId: string;
  createTime: Date;
  updateTime: Date;
  currentPrompt: Prompt;
  promptHistory: Prompt[];
  componentName : string;
};

export type Prompt = {
  promptId: string;
  content: string;
  createTime: Date;
  mediaFiles: string[];
};

