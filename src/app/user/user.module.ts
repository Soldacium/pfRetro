import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { Section1ImpressionComponent } from './welcome/section1-impression/section1-impression.component';
import { Section2AboutComponent } from './welcome/section2-about/section2-about.component';
import { Section3CarouselComponent } from './welcome/section3-carousel/section3-carousel.component';
import { Section4ContactComponent } from './welcome/section4-contact/section4-contact.component';
import { WorkComponent } from './work/work.component';
import { CarouselComponent } from './work/carousel/carousel.component';
import { ListComponent } from './work/list/list.component';
import { SlidesComponent } from './work/slides/slides.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: '',
        component: WelcomeComponent
      },
      {
        path: 'blog',
        component: PostsComponent
      },
      {
        path: 'work',
        component: WorkComponent
      }
    ]
  },

];

@NgModule({
  declarations: [
    UserComponent,
    WelcomeComponent,
    PostComponent,
    PostsComponent,
    NavComponent,
    Section1ImpressionComponent,
    Section2AboutComponent,
    Section3CarouselComponent,
    Section4ContactComponent,
    WorkComponent,
    CarouselComponent,
    ListComponent,
    SlidesComponent,
    AboutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class UserModule { }
