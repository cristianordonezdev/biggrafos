import { Routes } from '@angular/router';

import { GraphComponent } from './pages/graph/graph.component';
import { HomeComponent } from './pages/home/home.component';
import { LessonComponent } from './pages/lesson/lesson.component';

export const routes: Routes = [
    {
        path: 'graph',
        component: GraphComponent,
    },
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'lesson/:name',
        component: LessonComponent,
    },
];
