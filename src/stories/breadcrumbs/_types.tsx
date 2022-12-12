export interface BreadcrumbArgs extends React.HTMLAttributes<HTMLDivElement> {
  /** The breadcrumb items */
  children: any[];
  /** Show/hide last arrow */
  showLastArrow?: boolean;
}
