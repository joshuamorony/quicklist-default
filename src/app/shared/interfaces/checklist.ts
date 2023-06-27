export interface Checklist {
  id: string;
  title: string;
}

export type AddChecklist = Pick<Checklist, 'title'>;
export type EditChecklist = { id: Checklist["id"]; data: AddChecklist };
export type RemoveChecklist = Checklist["id"];

