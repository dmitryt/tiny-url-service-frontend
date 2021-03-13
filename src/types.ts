export type LinksAction = {
  type: 'SET_LINKS';
  data: Link[];
};

export type Action = LinksAction;

export type Link = {
  _id: string;
  value: string;
};