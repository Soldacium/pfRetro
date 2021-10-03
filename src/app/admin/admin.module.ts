import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { LoginComponent } from './login/login.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';



@NgModule({
  declarations: [AdminComponent, LoginComponent, PostsComponent, PostComponent],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
