import Vue from 'vue'
import Router from 'vue-router'
import DatabaseComponent from '@/views/Database';
import PDFComponent from '@/views/PdfCanvas';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: { name: 'PDF' } },
    { path: '/database', name: 'database', component: DatabaseComponent },
    { path: '/pdf', name: 'PDF', component: PDFComponent },
  ]
});