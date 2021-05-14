import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    url: '',
    page_number: 1,
    firstZoom: null,
    zoom: '',
    sliderValue: '60',
    toolmode: '',
    thickness: '3',
    drawings: '[]', 
    lastWidth: '',
    lastHeight: '',
    pdfName: '',
    summary: 'true',
    excel: 'true',
  },
  mutations: {
    update_url(state, new_url) {
      state.url = new_url;
    },
    update_page_number(state, new_page_number) {
      state.page_number = new_page_number;
    },
    update_firstZoom(state, new_firstZoom) {
      state.firstZoom = new_firstZoom;
    },
    update_zoom(state, new_zoom) {
      state.zoom = new_zoom;
    },
    update_slider(state, new_sliderValue) {
      state.sliderValue = new_sliderValue;
    },
    update_toolmode(state, new_toolmode) {
      state.toolmode = new_toolmode;
    },
    update_thickness(state, new_thickness) {
      state.thickness = new_thickness;
    },
    update_drawings(state, new_drawings) {
      state.drawings = new_drawings;
    },
    update_lastWidth(state, new_lastWidth) {
      state.lastWidth = new_lastWidth;
    },
    update_lastHeight(state, new_lastHeight) {
      state.lastHeight = new_lastHeight;
    },
    update_pdfName(state, new_pdfName) {
      state.pdfName = new_pdfName;
    },
    update_summary(state, new_summary) {
      state.summary = new_summary;
    },
    update_excel(state, new_excel) {
      state.excel = new_excel;
    },
  },
  getters: {
    get_url: state => state.url,
    get_page_number: state => state.page_number,
    get_firstZoom: state => state.firstZoom,
    get_zoom: state => state.zoom,
    get_sliderValue: state => state.sliderValue,
    get_toolmode: state => state.toolmode,
    get_thickness: state => state.thickness,
    get_drawings: state => state.drawings,
    get_lastWidth: state => state.lastWidth,
    get_lastHeight: state => state.lastHeight,
    get_pdfName: state => state.pdfName,
    get_summary: state => state.summary,
    get_excel: state => state.excel,
  }
})
