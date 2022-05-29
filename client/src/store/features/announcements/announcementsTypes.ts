import { ITag } from '../tags/tagsTypes';

export interface IAnnouncement {
  id: number;
  userId: number;
  categoryId: number;
  title: string;
  description: string;
  price: number;
  regionId: number;
  cityId: number;
  images: any[];
  tags: ITag[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface INewAnnouncement {
  title: string;
  description: string;
  price: number | string;
  regionId: number | string;
  cityId: number | string;
}

