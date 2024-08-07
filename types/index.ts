export interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export type TValidationError = {
  detail: { loc: [string, number]; msg: string; type: string }[];
};
