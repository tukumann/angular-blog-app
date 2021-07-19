import { Pipe, PipeTransform } from '@angular/core';
import { Post } from './dashboard/postTypes';

@Pipe({
  name: 'sorting'
})
export class SortingPipe implements PipeTransform {

  transform(posts: Post[], category=''): Post[] {
    if (!category) {
      return posts;
    }
    return posts.filter( post => {
      return post.category.toLowerCase() == category.toLowerCase();
    });
  }

}
