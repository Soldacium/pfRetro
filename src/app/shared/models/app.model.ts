import { AppType } from './app-type.model';
import { Tag } from './tag.model';

export interface App {
    name: string;
    link: string;
    image: string;
    tags: Tag[];
    description: string;
    type: AppType;
}
