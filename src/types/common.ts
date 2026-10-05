export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  badge?: string;
}
