export interface Event {
  id: string;
  title: string;
  datetime: string;
  location: string;
  image: string;
}

export interface ListItem {
  item: Event;
}

export interface EventsProps {
  data: Event[];
}

export interface EventListItemProps {
  item: Event;
}
