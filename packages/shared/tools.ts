// Tool name mappings
const TOOL_DISPLAY_NAMES: Record<string, string> = {
  'browser_navigate': 'Navigate Browser',
  'browser_click': 'Click Element',
  'browser_type': 'Type Text',
  'browser_scroll': 'Scroll Page',
  'browser_screenshot': 'Take Screenshot',
  'file_read': 'Read File',
  'file_write': 'Write File',
  'file_delete': 'Delete File',
  'terminal_execute': 'Execute Command',
  'code_execute': 'Execute Code',
  'search_web': 'Search Web',
  'search_files': 'Search Files',
  'create_file': 'Create File',
  'edit_file': 'Edit File',
  'run_terminal_command': 'Run Command',
  'read_file': 'Read File',
  'list_directory': 'List Directory',
  'move_file': 'Move File',
  'copy_file': 'Copy File',
};

const COMPLETED_TOOL_NAMES: Record<string, string> = {
  'browser_navigate': 'Navigated to URL',
  'browser_click': 'Clicked Element',
  'browser_type': 'Typed Text',
  'browser_scroll': 'Scrolled Page',
  'browser_screenshot': 'Captured Screenshot',
  'file_read': 'Read File',
  'file_write': 'Wrote File',
  'file_delete': 'Deleted File',
  'terminal_execute': 'Executed Command',
  'code_execute': 'Executed Code',
  'search_web': 'Searched Web',
  'search_files': 'Found Files',
  'create_file': 'Created File',
  'edit_file': 'Edited File',
  'run_terminal_command': 'Ran Command',
  'read_file': 'Read File',
  'list_directory': 'Listed Directory',
  'move_file': 'Moved File',
  'copy_file': 'Copied File',
};

// Tools that should be hidden from the UI
const HIDDEN_TOOLS = new Set([
  'internal_thinking',
  'internal_state',
  'system_prompt',
  '__thinking__',
  '__internal__',
]);

export function getUserFriendlyToolName(toolName: string): string {
  if (!toolName) return 'Unknown Tool';
  return TOOL_DISPLAY_NAMES[toolName] || formatToolName(toolName);
}

export function getCompletedToolName(toolName: string): string {
  if (!toolName) return 'Completed';
  return COMPLETED_TOOL_NAMES[toolName] || `Completed ${formatToolName(toolName)}`;
}

export function isHiddenTool(toolName: string): boolean {
  if (!toolName) return false;
  return HIDDEN_TOOLS.has(toolName) || toolName.startsWith('__');
}

// Format tool name from snake_case to Title Case
function formatToolName(name: string): string {
  return name
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export type ToolIconKey =
  | 'browser'
  | 'file'
  | 'terminal'
  | 'code'
  | 'search'
  | 'edit'
  | 'create'
  | 'delete'
  | 'move'
  | 'copy'
  | 'default';

export function getToolIconKey(toolName: string): ToolIconKey {
  if (!toolName) return 'default';
  
  if (toolName.startsWith('browser_')) return 'browser';
  if (toolName.includes('file') || toolName.includes('directory')) return 'file';
  if (toolName.includes('terminal') || toolName.includes('command')) return 'terminal';
  if (toolName.includes('code') || toolName.includes('execute')) return 'code';
  if (toolName.includes('search')) return 'search';
  if (toolName.includes('edit')) return 'edit';
  if (toolName.includes('create') || toolName.includes('write')) return 'create';
  if (toolName.includes('delete') || toolName.includes('remove')) return 'delete';
  if (toolName.includes('move')) return 'move';
  if (toolName.includes('copy')) return 'copy';
  
  return 'default';
}
