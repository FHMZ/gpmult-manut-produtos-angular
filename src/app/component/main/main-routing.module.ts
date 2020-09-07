import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { ProductTableComponent } from '../product-table/product-table.component';

const routes: Routes = [
    {
        path: 'main',
        component: MainComponent,
        children: [
            {
                path: 'main/products',
                children: [
                    {
                        path: '',
                        component: ProductTableComponent
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/main/products',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/main/products',
        pathMatch: 'full'
    }
];

export const MainRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes);
