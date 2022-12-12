export interface BreadcrumbArgs extends React.HTMLAttributes<HTMLDivElement> {
  /** The breadcrumb items */
  children: React.ReactNode | React.ReactNode[];
  /** Show/hide last arrow */
  showLastArrow?: boolean;
}
