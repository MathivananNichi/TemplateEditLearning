
export interface DragImage {
  id: string;
  name: string;
  uri: string;
}

export const images: DragImage[] = [
  {
    id: '1',
    name: 'Apple',
    uri: 'https://picsum.photos/id/1080/300/300',
  },
  {
    id: '2',
    name: 'Banana',
    uri: 'https://picsum.photos/id/102/300/300',
  },
  {
    id: '3',
    name: 'Orange',
    uri: 'https://picsum.photos/id/106/300/300',
  },
];
