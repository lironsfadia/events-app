export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  image_uri: string;
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
