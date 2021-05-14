<template>
    <div id="app">
        <!-- Popup for creating errortype !-->
        <modal name="create-errortype"  height="600" style="background: transparent;" @closed="hideErrorType">
            <div class="col-md-12 form-wrapper" style="text-align: center;">
            <br><h2> Create Errortype </h2>
                <div class="form-group col-md-12">
                    <label for="title"> Name </label>
                    <input style="border: 2px solid red;" @input="changeInNewErrorType" type="text" id="name" v-model="errorName" name="title" class="form-control" placeholder="Enter name">
                </div>

                <div class="form-group col-md-12">
                    <label for="title"> Weight </label>
                    <input style="border: 2px solid red;" @input="changeInNewErrorType" type="text" id="weight" v-model="errorWeight" name="title" class="form-control" placeholder="Enter weight">
                </div>

                <div class="form-group col-md-12">
                    <label for="description"> Description </label>
                    <input style="border: 2px solid red;" @input="changeInNewErrorType" type="text" id="description" v-model="errorDescription" name="description" class="form-control" placeholder="Enter description">
                </div>
                <label for="learningOutcome"> Learning outcome </label>
                <div style="display: flex;align-items: center;justify-content: center;">
                <div id="dropdown" style="width: 435px; border: 2px solid green; display: flex;align-items: center;justify-content: center;">
                  <multiselect 
                      v-model="selectedLearningOutcome"
                      open-direction="bottom"
                      :options="Object.values(dropdownLearningOutcomes)"
                      :maxHeight="180"
                      @input="changeInNewErrorType"
                      placeholder="Select learning outcome"
                      style="width: 435px;"
                  ></multiselect></div></div>
                <br><div class="form-group col-md-4 pull-right">
                    <button class="btn btn-success" @click="pushErrorType"> Create new errortype </button>
                    <button id="cancelButton" class="btn btn-success"  @click="hideErrorType"> Cancel </button>  
                </div>    
            </div>
            </modal>
        
        <!-- Popup for adding free text !-->
        <modal name="add-text-popup" @before-close="pushText" height="160" draggable=".window-header" style="background: transparent;">
            <div style="text-align: center;">
                <br><h3>Type the text:</h3>
                <textarea 
                        id="textarea_freetext"
                        rows="1" cols="51" style="text-align: center; resize: none;" @input="updateText" placeholder="Enter text here">
                </textarea><br>   
                Size:  
                <input @input='updateText' id="textSlider" type="range" min="10" max="80" value="30" class="slider">
            </div>
            <div id="moveHandle" class="window-header">
                <a><p><i class="fas fa-arrows-alt" style="font-size: 50px;"></i></p></a>
            </div>
            </modal>

        <!-- Popup for editing free text !-->
        <modal @before-close="unselect" name="edit-text-popup" height="160" draggable=".window-header" style="background: transparent;">
            <div style="text-align: center;">
                <br><h3>Edit the text:</h3>
                <textarea v-if="selectedForm!=null"
                        id="edit-freetext"
                        rows="1" cols="51" style="text-align: center; resize: none;" v-model="selectedForm.content" @input="editText">
                </textarea><br>   
                Size:  
                <input v-if="selectedForm!=null" @input="editText" id="textSlider2" type="range" min="10" max="80" v-model="selectedForm.height" class="slider">
            </div>
            <div id="moveHandle" class="window-header">
                <a><p><i class="fas fa-arrows-alt" style="font-size: 50px;"></i></p></a>
            </div>
            </modal>

        <!-- Popup for editing name before the export !-->
        <modal name="edit-name" height="290" width="700">
            <div style="text-align: center; color: white; height: 290px; background-color: black;">
                <br><h3>Edit name:</h3>
                <textarea 
                        id="export_name"
                        rows="1" cols="70" style="text-align: center; resize: none;" v-model="pdfName">
                </textarea><br>
                <h4>
                    Add summary to pdf? <input type="checkbox" id="summaryNeeded" v-model="summaryNeeded">
                     <!-- <br>Export excel file? <input type="checkbox" id="excelNeeded" v-model="excelNeeded">!-->
                </h4>  <br> 
                <i @click="exportPDF" class="fas fa-file-download" style="font-size: 80px;"></i>    
            </div>
            </modal>

        <!-- Popup for selecting error !-->
        <modal @before-close="unselect" name="select-error" height="300" width="900">
            <section class="container">
                <div id="left-half"><br>
                    <article>
                    <h3>Select error:</h3>
                    <div style="padding-right: 15px;">
                        <multiselect 
                            id="dropdown"
                            v-model="selectedErrorType" 
                            :options="Object.values(dropdownErrorTypes)"
                            @input="updateAnnotation"
                            :maxHeight="180"
                            placeholder="Select error"
                        ></multiselect>
                        <h3>
                            <div>
                                <br><p>Weight = {{ selectedWeight }}</p>
                            </div>
                        </h3><br><br>
                        <button @click="openErrorTypePopup" class="btn btn-success"> Create new errortype </button>
                    </div>
                    </article>
                </div>
                <div id="right-half"><br>
                    <article>
                    <h3>Give (optional) feedback:</h3>
                    <textarea 
                        @input="updateAnnotation" 
                        v-model="feedback_value" 
                        id="error_feedback" 
                        rows="8" cols="30" style="resize: none;">
                    </textarea>
                    </article>
                </div>
            </section>
            </modal>
        
        <!-- Buttons for uploading/downloading the pdf !-->
        <div id="upload-export">
            <a><p>
                <i  id="upload-button" @click="select" class="fas fa-file-upload" style="font-size: 80px;"></i> 
                <input type="file" @change="upload" id="file-to-upload" accept="application/pdf" />
                <i @click="editName" class="fas fa-file-download" style="font-size: 80px;"></i>    
            </p></a>
            </div>

        <!-- The sidebar objects !-->
        <div class="sidebar">
            <!-- Slider to zoom in on pdf-->
            <div class="slidecontainer"> 
                <b href="#">___________</b>
                <b href="#">- Zoom +</b>
                <input @change='updateZoom' id="zoomSlider" type="range" min="20" max="99" value="60" class="slider">
                <b href="#">___________</b>
            </div>
            <!-- Select different shapes to draw-->
            <div class="error-tools"><br>
                <b href="#">Error Tool </b>
                <a><p><i id="annotation-tool" @click="updateTool('annotation')" class="fas fa-sticky-note"></i></p></a>
                <b href="#">___________</b>
            </div>
            <div class="draw-tools"><br>
                <b href="#">Drawing Tools</b>
                <a><p><i id="ellipse-tool" @click="updateTool('ellipse')" class="far fa-circle"></i> / 
                <i id="rectangle-tool" @click="updateTool('rectangle')" class="far fa-square"></i> / 
                <i id="line-tool" @click="updateTool('line')" class="fas fa-window-minimize"></i> / 
                <i id="text-tool" @click="updateTool('text')" class="fas fa-paragraph"></i></p></a>
                <b href="#">Thickness</b>
                <b>
                    <h2 ><i @click="thinner" class="fas fa-angle-left"></i> <p style="display:inline" id="thickness-value"> 3 </p> <i @click="thicker" class="fas fa-angle-right"></i></h2>
                </b>
                <!-- Part to select different colours -->
                <b href="#">Colour</b>
                <div id="colour-part">
                    <ColorPicker id="colour-picker" :width="130" :height="130" :disabled="false" value="#ff0000" @color-change="onColorChange"></ColorPicker>
                </div>
                <b href="#">___________</b>
            </div>
            <!-- Select different tools to edit-->
            <div class="editing-tools"><br>
                <b href="#">Editing Tools</b>
                <a><p><i id="delete-tool" @click="updateTool('delete')" class="fas fa-trash-alt"></i> / 
                <i id="move-tool" @click="updateTool('move')" class="fas fa-arrows-alt"></i></p></a>
                <b href="#">___________</b>
            </div>
            </div>
        
        <!-- All the objects NOT belonging in the sidebar and topbar !-->
        <div id="core">
            <!-- Pdf-viewer + next/previous buttons !-->
            <div id="pdf-and-belongings">
                    <!-- Next/previous buttons + page counter !-->
                    <div id="pdf-meta">
                        <div id="name-space">
                                <h3>{{pdfName.replace(/.pdf/gi, '')}}</h3>
                        </div>
                        <div id="pdf-buttons" ><br>
                            <i class="fas fa-backward" @click='firstPage' style="font-size: 30px;"> </i>
                            <i class="fas fa-arrow-left" @click='previousPage' style="font-size: 30px;"></i>
                            <i class="fas fa-arrow-right" @click='nextPage' style="font-size: 30px;"></i>
                            <i class="fas fa-forward" @click='lastPage' style="font-size: 30px;"></i>
                            <!-- Namespace for documentname (student name) !-->
                        </div>
                        <h2 id="page-count-container"><p id="waiting"></p><div id="pdf-current-page" style="display:inline"></div> / <div id="pdf-total-pages" style="display:inline"></div></h2>
                    </div>

                    <!-- Pdf + draw canvases !-->
                    <div id="canvases">
                        <div id="bottom">
                            <canvas id="pdf-canvas" width=0 height=0></canvas> 
                        </div>
                        <div id="middle">
                            <canvas id="form-holding-canvas" width=0 height=0></canvas> 
                        </div>
                        <div id="top">
                            <canvas id="draw-canvas" width=0 height=0></canvas>
                        </div>
                    </div>
                </div>
            </div>

            <div id="circle2" style="display: flex;align-items: center;justify-content: center;">
                <circle2></circle2>
            </div>

            <div id="inner_remaining">
            </div>
    </div>
</template>

<script>
    import $ from 'jquery';
    import jsPDF from 'jspdf'; // https://mrrio.github.io/jsPDF/
    import ColorPicker from 'vue-color-picker-wheel';
    import { server } from "../helper";
    import axios from "axios";
    import zipcelx from 'zipcelx';
    import {Circle2} from 'vue-loading-spinner'
    import { PDFDocument } from 'pdf-lib'
    import download from "downloadjs";
    
    export default{
        components: {
            ColorPicker,    // The colorpicker in the sidebar
            Circle2         // The loading circle to be shown when doing stuff
        },
        data(){ 
        return{
            // Variables that are linked to the pop-up during the creating of new errortypes
            errorName: "",
            errorWeight: "",
            errorDescription: "",
            selectedLearningOutcome: null,  // The variable which the multiselect will fill with the selected learning outcome
            learningOutcomes: null,         // Contains all the learning outcomes
            dropdownLearningOutcomes: {},   // The list of strings as shown in the dropdown when selecting learning outcomes
            sortedOutcomeIDs: [],           // to find the ID of the learningoutcome with the index in dropdownLearningOutcomes

            // Variables linked to the pop-up when selection an errortype for an annotation
            selectedErrorType: null, 
            selectedWeight: "?",
            feedback_value: "",
            dropdownErrorTypes: {},
            errorTypes: [], // Contains all the error types            

            // Variables needed for rendering the PDF
            PDF_DOC: undefined,
            CURRENT_PAGE: 1,        // The current page of the PDF
            TOTAL_PAGES: null,
            DRAW_CANVAS: null,      // The canvas on which new forms will be drawed during the drawing itself
            DRAW_CANVAS_CTX: null,  // The context of the canvas on which new forms will be drawed during the drawing itself
            PDF_CANVAS: null,       // The canvas on which the PDF will be drawn
            PDF_CANVAS_CTX: null,   // The context of the canvas on which the PDF will be drawn
            FORM_CANVAS: null,      // The canvas on which the existing forms will be drawed
            FORM_CANVAS_CTX: null,  // The context of the canvas on which the existing forms will be drawed
            originalWidth: null,    // This variable contains the original width of the PDF after uploading it
            isNewPdf: true,         // A variable which holds the information if the current PDF is a new one (e.g. just after uploading a new PDF it will become true)

            // Exporting variables
            PDF: null,
            savedPage: null,
            savedZoom: null,
            isExporting: false,
            pdfName: '',
            summaryNeeded: true,    // Variable declaring if a summary has to be generated
            excelNeeded: true,      // Variable declaring if an excel file has to be generated

            // Drawing variables
            selectedForm: null,     // Contains the current selected form
            isMouseDown: false,     // Variable that contains the information if the mouse is being pressed
            offsetX: 0,
            offsetY: 0,
            startX: 0,
            startY: 0,
            zoom: 1.74,
            toolMode: "",           // This variable contains which tool is being used: ellipse/rectangle/line/delete/move/annotation/text
            thickness: 3,           // This variable contains the current thickness of the borders of the next form that will be drawn
            color: "#ff0000",       // This variable contains the current colour of the next form that will be drawn
            currentDrawing: {x: 0,  // This variable contains the current form that is being created
                             y: 0,
                             width: 0,
                             height: 0,
                             form: "",
                             colour: "black",
                             thickness: 1,
                             selected: false,
                             },
        // variables needed when exporting with a summary
        learningItems: null,    // this global variable contains all the currently existing learningItems in the database
        contentSections: null,  // this global variable contains all the currently existing contentSections in the database
        domainConcepts: null,   // this global variable contains all the currently existing domainConcepts in the database
            
        }},
        mounted(){
            // Set the canvases and the contexts
            this.DRAW_CANVAS = $('#draw-canvas').get(0),
            this.DRAW_CANVAS_CTX = this.DRAW_CANVAS.getContext('2d');
            this.PDF_CANVAS = $('#pdf-canvas').get(0),
            this.PDF_CANVAS_CTX = this.PDF_CANVAS.getContext('2d');
            this.FORM_CANVAS = $('#form-holding-canvas').get(0),
            this.FORM_CANVAS_CTX = this.FORM_CANVAS.getContext('2d');

            // Hide some elements
            $("#file-to-upload").hide();
            $("#core").hide();
            $("#circle2").hide();  

            // Add listeners to drawing canvas
            this.DRAW_CANVAS.addEventListener('mousedown', this.mousedown);
            this.DRAW_CANVAS.addEventListener('mousemove', this.mousemove);
            document.addEventListener('mouseup', this.mouseup);

            // Disable Prev & Next buttons  + slider when no pdf is uploaded
            $("#pdf-next, #pdf-prev").attr('disabled', 'disabled');
            $("#zoomSlider").get(0).disabled = true;   

            // If previously a pdf was uploaded, restore all variables (if you switch between the database and the feedback tool)
            if(this.$store.getters.get_url.length > 0){
                this.FORM_CANVAS.height = this.$store.getters.get_lastHeight;
                this.FORM_CANVAS.width = this.$store.getters.get_lastWidth;
                this.pdfName = this.$store.getters.get_pdfName;
                this.summaryNeeded = JSON.parse(this.$store.getters.get_summary);
                this.excelNeeded = JSON.parse(this.$store.getters.get_excel);
                this.isNewPdf = false;
                this.zoom = Number(this.$store.getters.get_zoom);
                $("#zoomSlider").get(0).value = Number(this.$store.getters.get_sliderValue);
                this.CURRENT_PAGE = parseInt(this.$store.getters.get_page_number);
                this.showPDF(JSON.parse(this.$store.getters.get_url), this);
                this.updateTool(this.$store.getters.get_toolmode);
                this.thickness = parseInt(this.$store.getters.get_thickness);
                $("#thickness-value").get(0).innerHTML = " " + String(this.thickness) + " ";
            }
            // Fetch information from the database
            this.fetchErrorTypes();
            this.fetchLearningOutcomes();
            this.fetchLearningItems();
        },
        methods:{
            // Push the newly created errortype to the database and update the current errortypes
            __submitToServer(data, context) {
                axios.post(`${server.baseURL}/errortype/create`, data)
                .then(function(){
                    context.fetchErrorTypes();
                });
            },
            // This function updates the current errortypes
            fetchErrorTypes() {
            axios
                .get(`${server.baseURL}/errortype/errortypes`)
                .then(data => (this.updateErrorTypes(this, data.data)));
            },
            // This function updates the current learning outcomes
            fetchLearningOutcomes() {
                axios.get(`${server.baseURL}/learningoutcome/learningoutcomes`)
                .then(data => (this.updateLearningOutcomes(this, data.data)));
            },
            fetchLearningItems(){
                axios.get(`${server.baseURL}/learningitem/learningitems`)
                .then(data => (this.learningItems = data.data));
            },
            // This function makes a dictionary 'dropdownLearningOutcomes' that links the ID's with the name in stringform (accompanied by an index in front of the name) of all the learning Outcomes -> these indexes + names in stringform are visible in the dropdowns
            // + makes a list 'sortedOutcomeIDs' of the ID's in the same order as the strings as presented in the dropdowns
            // + updates the list of 'learningOutcomes' with the new data
            updateLearningOutcomes(context, data){
                // Update the list of learning outcomes
                this.learningOutcomes = data;

                // Update the dropdown list + the list of sorted IDs
                context.dropdownLearningOutcomes = {};
                context.sortedOutcomeIDs = [];
                var i
                for (i = 0; i < context.learningOutcomes.length; i++) {
                    context.dropdownLearningOutcomes[context.learningOutcomes[i]._id] = String(i+1) + ": " + String(context.learningOutcomes[i].name);
                    context.sortedOutcomeIDs.push(context.learningOutcomes[i]._id);
                }
            
            },
            // This function makes a dictionary 'dropdownErrorTypes' that links the ID's with the name in stringform (accompanied by an index in front of the name) of all the error types -> these indexes + names in stringform are visible in the dropdowns
            // + updates the list of 'errorTypes' with the new data
            // + updates the annotations because changes could be made in errortypes in the database
            updateErrorTypes(context, data){
                // Update the list of error types
                context.errorTypes = data;

                // Code that updates the dropdown list
                context.dropdownErrorTypes = {};
                var newIDs = [];
                var i
                for (i = 0; i < context.errorTypes.length; i++) {
                    context.dropdownErrorTypes[context.errorTypes[i]._id] = String(i+1) + ": " + String(context.errorTypes[i].name);
                    newIDs.push(context.errorTypes[i]._id);
                }

                // Code that updates the errortype names in the annotations
                var drawings = context.getDrawings();
                var j;
                for (i = 0; i < drawings.length; i++) {         // Iterate through all the pages of the drawings
                    for (j = 0; j < drawings[i].length; j++) {  // Iterate through all the forms on a specific page
                        if(drawings[i][j].form == "annotation"){
                            // When the annotation previously had an errortype and it's not findable any more in the current errortypes, make the annotation's errortype empty
                            if(drawings[i][j].error != null &&  newIDs.indexOf(drawings[i][j].id) < 0){
                                drawings[i][j].error = null;
                                drawings[i][j].weight = 0;
                                drawings[i][j].id = null;
                            }
                            // When the annotation previously had an errortype and it IS findable, update the name of the errortype because it could be changed in the database
                            else if(drawings[i][j].error != null &&  newIDs.indexOf(drawings[i][j].id) > -1){
                                drawings[i][j].error = context.dropdownErrorTypes[drawings[i][j].id];
                            }
                        }
                    }
                }
                this.updateDrawings(drawings);
            },
            // The given attribute gets a green border when at least one symbol is filled in, otherwise a red border
            atLeastOneSymbol(item){ 
                if($('#'+item).get(0).value.length < 1){
                    $('#'+item).get(0).setAttribute("style", "border: 2px solid red;");}
                else{
                    $('#'+item).get(0).setAttribute("style", "border: 2px solid green;");
                }
            },
            // Check if all given attributes in the form of a list have a green border around them, thus having valid values
            areAttributesValid(attributes){ //Returns if all given attributes their borders are green, thus valid
                for(var i = 0; i < attributes.length; i++){
                    if(!(String($('#'+attributes[i]).get(0).style.border).indexOf("green") >= 0)){
                    return false;
                    }
                }
                return true;
            },
            // When a change is made in an inputfield in the pop-up during the creation of an ErrorType, 
            // change the borders of the inputfields to red or green depending on if they're invalid or valid
            changeInNewErrorType(){
                this.atLeastOneSymbol("name");
                this.atLeastOneSymbol("description");
                var numbers = new Set("01234567890");
                var currentWeight = new Set($('#weight').get(0).value);
                var onlyNumbers = true;
                for(var elem of currentWeight){
                    if(!numbers.has(elem)){
                        onlyNumbers = false;
                    }
                }
                if($('#weight').get(0).value.length < 1 || !onlyNumbers){
                    $('#weight').get(0).setAttribute("style", "border: 2px solid red;");}
                else{
                    $('#weight').get(0).setAttribute("style", "border: 2px solid green;");
                }
            },
            // Creates a new ErrorType in the database when all the filled in attributes are valid and hide the pop-up
            pushErrorType(){
                if(this.areAttributesValid(['description','name','weight'])){
                    var learningoutcome = "";
                    if(this.selectedLearningOutcome != null){
                        learningoutcome = this.sortedOutcomeIDs[Number(this.selectedLearningOutcome.slice(0,this.selectedLearningOutcome.indexOf(':')))-1];
                    }
                    let errorTypeData = {
                        name: this.errorName,
                        weight: this.errorWeight,
                        description: this.errorDescription,
                        learningOutcome: learningoutcome,
                    };
                    this.__submitToServer(errorTypeData, this);   
                    this.hideErrorType();
                }
            },
            // Hide the pop-up for creating ErrorTypes and empty all linked variables
            // Then show the previous pop-up, for selecting an error-type for an annotation
            hideErrorType(){
                this.errorName = "";
                this.errorWeight = "";
                this.errorDescription = "";
                this.selectedLearningOutcome = null;
                this.fetchErrorTypes();
                this.$modal.hide('create-errortype');
                this.$modal.show('select-error');
                
            },
            // Open the pop-up for creating a new errortype and hide the pop-up for selecting an errortype for an annotation
            openErrorTypePopup(){
                var drawings = this.getDrawings();
                this.$modal.hide('select-error');
                this.updateDrawings(drawings);
                this.$modal.show('create-errortype');
            },
            // Get the current drawings and look for a form that is in selected (highlighted) and unselect it. Next push the all the forms back to the store
            unselect(){
                var drawings = this.getDrawings();
                var form = null;
                var i = 0;
                for (i = 0; i < drawings[this.CURRENT_PAGE-1].length; i++) {
                    if(drawings[this.CURRENT_PAGE-1][i].selected){
                        form = drawings[this.CURRENT_PAGE-1][i];
                    }
                }
                if(form != null){
                    form.selected = false;
                }
                this.updateDrawings(drawings);
            },
            // Fetch all the forms from the store
            getDrawings(){
                return JSON.parse(this.$store.getters.get_drawings);
            },
            // Get the list of forms/drawings and push it to the store
            // Next redraw all forms in the form_canvas
            updateDrawings(new_drawings){
                this.$store.commit('update_drawings', JSON.stringify(new_drawings));
                this.redrawAllForms(this.FORM_CANVAS_CTX);
            },
            // When creating a new text-form
            // Clear the drawing canvas, update a selected text-form when using the size-slider or altering the content (the text) and redraw it on the drawing canvas
            updateText(){
                this.ClearDrawingCanvas();
                this.DRAW_CANVAS_CTX.fillStyle = this.color;
                this.DRAW_CANVAS_CTX.font = String($("#textSlider").get(0).value) + "px Consolas";
                this.DRAW_CANVAS_CTX.fillText($('#textarea_freetext').get(0).value, this.startX, this.startY); 
            },
            // When EDITING an EXISTING text-form
            // Clear the drawing canvas, update a selected text-form when using the size-slider or altering the content (the text) 
            // and redraw it on the drawing canvas + push the updated text-form to the store
            // The height of the text is corrected based on the current zoom
            editText(){
                var drawings = this.getDrawings();
                var form = null;
                var i = 0;
                for (i = 0; i < drawings[this.CURRENT_PAGE-1].length; i++) {
                    if(drawings[this.CURRENT_PAGE-1][i].selected){
                        form = drawings[this.CURRENT_PAGE-1][i];
                    }
                }
                this.ClearDrawingCanvas();
                
                form.content = $('#edit-freetext').get(0).value;
                var correction = this.$store.getters.get_firstZoom/this.zoom;
                form.height = $("#textSlider2").get(0).value * correction;
                this.updateDrawings(drawings);
            },
            // When closing the pop-up after CREATING a NEW text-form, it is pushed to the store if it contains text
            // The position and height of the text is corrected based on the current zoom
            pushText(){
                if($('#textarea_freetext').get(0).value.length > 0){
                    var drawings = this.getDrawings();
                    var correction = this.$store.getters.get_firstZoom/this.zoom;
                    drawings[this.CURRENT_PAGE-1].push({
                                        x: this.startX*correction,
                                        y: this.startY*correction,
                                        form: "text",
                                        colour: this.color,
                                        height: $("#textSlider").get(0).value*correction,
                                        content: $('#textarea_freetext').get(0).value,
                                        });
                    this.updateDrawings(drawings)
                    this.ClearDrawingCanvas();
                }
            },
            // When editing an annotation (selecting an errortype or typing in the optional feedback), update tha annotation and push it to the store
            updateAnnotation(){
                var drawings = this.getDrawings();
                var form = null;
                var i = 0;
                for (i = 0; i < drawings[this.CURRENT_PAGE-1].length; i++) {
                    if(drawings[this.CURRENT_PAGE-1][i].selected){
                        form = drawings[this.CURRENT_PAGE-1][i];
                    }
                }
                if(this.selectedErrorType != null){
                    form.error = this.selectedErrorType;
                    form.weight = this.errorTypes[parseInt(this.selectedErrorType.slice(0,this.selectedErrorType.indexOf(':')))-1].weight;
                    form.id = this.errorTypes[parseInt(this.selectedErrorType.slice(0,this.selectedErrorType.indexOf(':')))-1]._id;
                }
                else{
                    form.error = null;
                    form.weight = 0;
                    form.id = null;
                }
                form.feedback = $("#error_feedback").get(0).value;
                this.selectedWeight = form.weight;
                this.updateDrawings(drawings);
            },
            // When another color is picked in the colorpicker, change the colour variable
            onColorChange(color) {
                this.color = color;
            },
            // Update the current tool when clicked on a toolbutton and push the current tool to the store
            updateTool(tool){
                this.unselect(); // no form should be selected
                this.toolMode = tool; 
                this.$store.commit('update_toolmode', this.toolMode);
                var tools = ["ellipse","rectangle","line","delete","move","annotation","text"];
                var i;
                for (i = 0; i < tools.length; i++) {
                    $("#" + tools[i] + "-tool").get(0).style.color = "#42b983";
                } 
                if(tool.length > 1){
                    $("#" + tool + "-tool").get(0).style.color = "red";
                }

            },
            // Update the zoom when the zoom-slider is slided and commit the current zoom to the store
            updateZoom(){
                if($("#zoomSlider").get(0) != undefined){
                    var canvasWidth = $("#canvases").get(0).clientWidth;
                    var maxZoom = (canvasWidth-2)/this.originalWidth;

                    this.zoom = $("#zoomSlider").get(0).value/(100/maxZoom);

                    // Update the store
                    this.$store.commit('update_zoom', this.zoom);
                    this.$store.commit('update_slider', $("#zoomSlider").get(0).value);

                    if(this.CURRENT_PAGE > 0){
                        this.showPage(this.CURRENT_PAGE, false);
                    }
                }
            },
            // This function draws a new form on the draw_canvas based on which tool is selected (thus which form should be drawed)
            mousedown(e){
                var vm = this;
                var drawings = vm.getDrawings(); // Fetch current drawings

                // If the toolmodus is "ellipse", "rectangle", "line","move", than a startposition of the mouse is needed, the drawing has started.
                if(["ellipse", "rectangle", "line","move"].indexOf(vm.toolMode) >= 0){
                    var rect = vm.DRAW_CANVAS.getBoundingClientRect();
                    var x = e.clientX - rect.left;
                    var y = e.clientY - rect.top;
                    vm.isMouseDown = true;
                    vm.startX = x; // update start coordinate X in a variable
                    vm.startY = y; // update start coordinate Y in a variable
                }
                // When "delete" is selected, delete the selected form
                else if(vm.toolMode == "delete"){
                    var highlightedIndex = null;
                    var i = 0;
                    // Look for the highlighted form
                    for (i = 0; i < drawings[this.CURRENT_PAGE-1].length; i++) {
                        if(drawings[this.CURRENT_PAGE-1][i].selected){
                            highlightedIndex = i;
                            i = drawings[this.CURRENT_PAGE-1].length;
                        }
                    }
                    // Delete the highlighted form
                    if(highlightedIndex != null){
                        drawings[vm.CURRENT_PAGE-1].splice(highlightedIndex, 1);
                        this.updateDrawings(drawings);
                    }
                }
                // When the tool is in "text"-modus, save the startposition and create or edit a text-form
                else if (vm.toolMode == "text"){
                    rect = vm.DRAW_CANVAS.getBoundingClientRect();
                    x = e.clientX - rect.left;
                    y = e.clientY - rect.top;
                    vm.startX = x;
                    vm.startY = y;
                    
                    // count the selected text-forms
                    var amountSelected = 0;
                    for (i = 0; i < drawings[this.CURRENT_PAGE-1].length; i++) {
                        if(drawings[this.CURRENT_PAGE-1][i].selected == true){
                            ++amountSelected;
                            this.selectedForm = drawings[this.CURRENT_PAGE-1][i];
                        }
                    }
                    // If no text-form is selected, show the pop-up for CREATING a text-form
                    if(amountSelected == 0){
                        this.$modal.show('add-text-popup');
                    }
                    // If there is a text-form selected, show the pop-up for EDITING a text-form
                    else if(amountSelected == 1){
                        this.$modal.show('edit-text-popup');
                    }
                }
                // When the tool is in "annotation"-modus, create or edit an annotation-form
                else if(vm.toolMode == "annotation"){
                    // Count if one or none annotations are selected
                    amountSelected = 0;
                    for (i = 0; i < drawings[this.CURRENT_PAGE-1].length; i++) {
                        if(drawings[this.CURRENT_PAGE-1][i].selected == true){
                            ++amountSelected;
                            this.selectedForm = drawings[this.CURRENT_PAGE-1][i];
                        }
                    }
                    // If none are selected, save the startposition and create a new annotation
                    if(amountSelected == 0){
                        rect = vm.DRAW_CANVAS.getBoundingClientRect();
                        var mouseX = e.clientX - rect.left;
                        var mouseY = e.clientY - rect.top;
                        var correction = this.$store.getters.get_firstZoom/this.zoom; // correction based on the current zoom
                        var error = {   x: mouseX*correction,
                                        y: mouseY*correction,
                                        width: 0,
                                        height: 0,
                                        form: "annotation",
                                        colour: "",
                                        thickness: "",
                                        selected: false,
                                        error: null,
                                        feedback: "",
                                        id: null,
                                        weight: null,
                                    };
                        drawings[this.CURRENT_PAGE-1].push(error);
                        vm.updateDrawings(drawings); // push the new annotation to the store
                    }
                    // If there is an annotation selected, show the pop-up for editing the annotation and fill in the linked variables with the information in the annotation
                    else if(amountSelected == 1){
                        vm.redrawAllForms(vm.FORM_CANVAS_CTX);
                        this.selectedErrorType = this.selectedForm.error;
                        this.$modal.show('select-error');
                        this.feedback_value = this.selectedForm.feedback;
                        this.selectedWeight = this.selectedForm.weight;
                    }
                }
            },
            mousemove(e){
                // Switch between toolModes during mousemove and when isMouseDown is true
                var vm = this;
                var drawings = this.getDrawings();
                // When the mouse is down and the mouse is moving (this funcion), than a form is being drawn or a form is being moved
                if(vm.isMouseDown){
                    switch(vm.toolMode) {
                        case "ellipse":
                            // Draw ellipse
                            vm.drawEllipse(e);
                            break;
                        case "rectangle":
                            // Draw rectangle
                            vm.drawRectangle(e);
                            break;
                        case "line":
                            // Draw line
                            vm.drawLine(e);
                            break;
                        // Move the selected form is there is a selected form
                        case "move":
                            var highlightedIndex = null;
                            var i = 0;
                            // Find the selected form
                            for (i = 0; i < drawings[this.CURRENT_PAGE-1].length; i++) {
                                if(drawings[this.CURRENT_PAGE-1][i].selected){
                                    highlightedIndex = i;
                                    i = drawings[this.CURRENT_PAGE-1].length;
                                }
                            }
                            // If there is a selected form, move it
                            if(highlightedIndex != null){
                                var rect = vm.DRAW_CANVAS.getBoundingClientRect();
                                var correction = this.$store.getters.get_firstZoom/this.zoom; // the correction based on the zoom
                                var x = (e.clientX - rect.left)*correction;
                                var y = (e.clientY - rect.top)*correction;
                                // There a two cases, all forms except the line-form or the line-form
                                // The difference is that in all forms just x-y coordinates should be updated
                                // But in the line-form also the width and height should be updated, those 2 variables stand for the x2-y2 coordinates of the end of the line
                                switch(drawings[this.CURRENT_PAGE-1][highlightedIndex].form) {
                                    case "line":
                                        if(vm.offsetX == 0 && vm.offsetY == 0){
                                            vm.offsetX = drawings[this.CURRENT_PAGE-1][highlightedIndex].x - x;
                                            vm.offsetY = drawings[this.CURRENT_PAGE-1][highlightedIndex].y - y;
                                        }
                                        drawings[this.CURRENT_PAGE-1][highlightedIndex].width += x + vm.offsetX - drawings[this.CURRENT_PAGE-1][highlightedIndex].x;
                                        drawings[this.CURRENT_PAGE-1][highlightedIndex].height += y + vm.offsetY - drawings[this.CURRENT_PAGE-1][highlightedIndex].y;
                                        
                                        break;
                                    // Default case for all forms except line-forms
                                    default:
                                        if(vm.offsetX == 0 && vm.offsetY == 0){
                                            vm.offsetX = drawings[this.CURRENT_PAGE-1][highlightedIndex].x - x;
                                            vm.offsetY = drawings[this.CURRENT_PAGE-1][highlightedIndex].y - y;
                                        }
                                        break;
                                }
                                drawings[this.CURRENT_PAGE-1][highlightedIndex].x = x + vm.offsetX;
                                drawings[this.CURRENT_PAGE-1][highlightedIndex].y = y + vm.offsetY;
                                this.updateDrawings(drawings); // update the new drawings to the store
                            }
                            break; 
                        default:
                            break;
                    }
                }
                // If one of these tools is selected, the hover function is activated and forms should be highlighted when the mouse hovers over them
                else if (["delete", "move","annotation", "text"].indexOf(vm.toolMode) >= 0){
                    vm.hover(e, vm.toolMode);
                }
            },
            // End drawing or end the movement of a form
            mouseup(){
                var vm = this
                vm.isMouseDown = false;
                vm.offsetX = 0;
                vm.offsetY = 0;
                
                // If toolmode was drawing a form, save the drawing
                if(["ellipse", "rectangle", "line"].indexOf(vm.toolMode) >= 0  && (vm.currentDrawing.width > 0 && vm.currentDrawing.height > 0 || vm.toolMode == "line")){
                    
                    // Prevent lines of length zero and rejecting perfect horizontal/vertical lines
                    if(vm.toolMode != "line" || (vm.toolMode == "line" && (vm.currentDrawing.x != vm.currentDrawing.width || vm.currentDrawing.y != vm.currentDrawing.height))){
                        var drawings = vm.getDrawings();
                        drawings[this.CURRENT_PAGE-1].push(vm.currentDrawing);
                        vm.updateDrawings(drawings); // Push to the store (this function also redraws all the forms)
                    }
                    vm.ClearDrawingCanvas(), // clear the canvas that was being drawed on
                    vm.currentDrawing = {x: 0, // make the current drawing empty
                                        y: 0,
                                        width: 0,
                                        height: 0,
                                        form: "",
                                        colour: "black",
                                        thickness: 1,
                                        };
                }
            },
            // This function draws a given form on the given canvas
            drawFormOnCanvas(form, ctx){
                var correction = this.zoom/this.$store.getters.get_firstZoom; // correction based on which zoom applied
                switch(form.form) {
                    case "ellipse":
                        ctx.beginPath();
                        if(form.selected){
                            ctx.lineWidth = form.thickness + 3;
                            ctx.strokeStyle = "red";
                        }
                        else{
                            ctx.lineWidth = form.thickness;
                            ctx.strokeStyle = form.colour;
                        }
                        ctx.ellipse(form.x*correction, form.y*correction,  form.width*correction, form.height*correction, 0, 0, 2 * Math.PI);
                        ctx.stroke();
                        break;
                    case "rectangle":
                        ctx.beginPath();
                        if(form.selected){
                            ctx.lineWidth = form.thickness + 3;
                            ctx.strokeStyle = "red";
                        }
                        else{
                            ctx.lineWidth = form.thickness;
                            ctx.strokeStyle = form.colour;
                        }
                        ctx.rect(form.x*correction, form.y*correction,  form.width*correction, form.height*correction);
                        ctx.stroke();
                        break;
                    case "line":
                        ctx.beginPath();
                        if(form.selected){
                            ctx.lineWidth = form.thickness + 3;
                            ctx.strokeStyle = "red";
                        }
                        else{
                            ctx.lineWidth = form.thickness;
                            ctx.strokeStyle = form.colour;
                        }
                        ctx.moveTo(form.x*correction, form.y*correction);
                        ctx.lineTo(form.width*correction, form.height*correction);
                        ctx.stroke(); 
                        break;
                    case "annotation":
                        if(!this.isExporting){
                            var w = this.DRAW_CANVAS.width;
                            var offset = 0;
                            if(form.selected){
                                offset = 5;
                            }

                            var realX = form.x*correction;
                            var realY = form.y*correction;
                            
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.strokeStyle = "red";
                            if(form.error != null){
                                ctx.strokeStyle = "green";
                            }
                            ctx.rect(realX-offset, realY-offset, (w/51.85)+offset*2, (w/34.56)+offset*2);
                            ctx.fillStyle = ctx.strokeStyle;
                            ctx.fill();
                            ctx.stroke();
                            
                            ctx.beginPath();
                            ctx.strokeStyle = "black";
                            if(form.selected){
                                ctx.strokeStyle = "yellow";
                            }
                            ctx.fillStyle = ctx.strokeStyle;

                            ctx.rect(realX+w/345.66, realY+w/207.4, w/74.07, w/518.5);
                            ctx.rect(realX+w/345.66, realY+w/79.769, w/74.07, w/518.5);
                            ctx.rect(realX+w/345.66, realY+w/49.380, w/74.07, w/518.5);
                            ctx.fill();
                            ctx.stroke();
                            form.width = w/51.85;
                            form.height = w/34.56;
                        }
                        break;
                    case "text":
                        ctx.fillStyle = form.colour;
                        var extraHeight = 0;
                        if(form.selected){
                            //Box around text
                            var length = form.height*correction*form.content.length*0.55;
                            ctx.beginPath();
                            ctx.rect(form.x*correction, form.y*correction-form.height*correction*0.7,  length, form.height*correction*0.7);
                            ctx.stroke();
                        }
                        ctx.font = String(form.height*correction + extraHeight) + "px Consolas";
                        ctx.fillText(form.content, form.x*correction, form.y*correction); 
                        break;
                    default:
                        console.log("Form of drawing not recognised")
                        break;
                }
            },
            // This function redraws all the forms in the store
            redrawAllForms(context){ 
                if(!this.isNewPdf){
                    this.ClearAllForms();
                    if (context == 0){
                        context = this.FORM_CANVAS_CTX;
                    }
                    var i;
                    var drawings = this.getDrawings()[this.CURRENT_PAGE-1];
                    for (i = 0; i < drawings.length; i++) {
                        this.drawFormOnCanvas(drawings[i], context); 
                    } 
                }
            },
            // This function checks if the mouse hovers over a form and then highlights the form in some kind of way based on what type of form it is
            hover(e, tool){ 
                var drawings = this.getDrawings();
                var vm = this;
                var rect = vm.DRAW_CANVAS.getBoundingClientRect();
                var x = e.clientX - rect.left;
                var y = e.clientY - rect.top;
                var redrawNeeded = false;
                var amountSelected = 0;
                var correction = this.zoom/this.$store.getters.get_firstZoom;
                var i;
                for (i = 0; i < drawings[this.CURRENT_PAGE-1].length; i++) {
                    if(drawings[this.CURRENT_PAGE-1][i].selected == true)
                        ++amountSelected;
                }

                for (i = drawings[this.CURRENT_PAGE-1].length-1; i >= 0 ; i--) {
                    var currentForm = drawings[this.CURRENT_PAGE-1][i];
                    var inside = false;
                    switch(currentForm.form) {
                        case "ellipse":
                            var h = currentForm.x*correction;
                            var k = currentForm.y*correction;
                            var a = currentForm.width*correction+5;
                            var b = currentForm.height*correction+5;
                            inside = (x-h)*(x-h)/(a*a)+ (y-k)*(y-k)/(b*b) <= 1 && tool!="annotation" && tool!="text";
                            break;
                        case "rectangle":
                            inside =       x >= currentForm.x*correction-5 
                                        && x <= currentForm.x*correction + currentForm.width*correction+5 
                                        && y >= currentForm.y*correction-5 
                                        && y <= currentForm.y*correction + currentForm.height*correction+5 
                                        && tool!="annotation" && tool!="text";
                            break;
                        case "line":
                            var Px1 = currentForm.x*correction;
                            var Py1 = currentForm.y*correction;
                            var Px2 = currentForm.width*correction;
                            var Py2 = currentForm.height*correction;
                            var dist = 8;
                            var nearLine = Math.abs((Py2-Py1)*x - (Px2-Px1)*y + Px2*Py1 - Py2*Px1)/Math.sqrt(Math.pow((Py2-Py1),2) + Math.pow((Px2-Px1),2)) < dist;
                            var insideLineBox = x >= Math.min(Px1,Px2)-dist && x <= Math.max(Px1,Px2)+dist && y >= Math.min(Py1,Py2)-dist && y <=  Math.max(Py1,Py2)+dist;
                            inside = nearLine && insideLineBox && tool!="annotation" && tool!="text";
                            break;
                        case "annotation":
                            var realX = currentForm.x*correction;
                            var realY = currentForm.y*correction;
                            var w = this.DRAW_CANVAS.width;
                            inside = x >= realX-5 && x <= realX + w/51.85+5 && y >= realY-5 && y <=  realY + w/34.56+5 && tool!="text";
                            break;
                        case "text":
                            realX = currentForm.x*correction;
                            realY = currentForm.y*correction-currentForm.height*correction*0.7;
                            var length = currentForm.height*correction*currentForm.content.length*0.55;
                            inside =       x >= realX-5 
                                        && x <= realX + length+5
                                        && y >= realY-5 
                                        && y <= realY + currentForm.height*correction*0.7+5 
                                        && tool!="annotation";
                            break;
                        default:
                            console.log("Form of drawing not recognised")
                            break;
                        } 
                    if(currentForm.selected == true && !(inside)){
                        drawings[this.CURRENT_PAGE-1][i].selected = false;
                        this.updateDrawings(drawings);
                        amountSelected = amountSelected - 1;
                        redrawNeeded = true;
                    }
                    if(amountSelected == 0 && currentForm.selected != true && !redrawNeeded && inside){
                        drawings[this.CURRENT_PAGE-1][i].selected = true;
                        this.updateDrawings(drawings);
                        amountSelected = amountSelected + 1;
                        redrawNeeded = true;
                    }
                }
                if (redrawNeeded){
                    this.redrawAllForms(vm.FORM_CANVAS_CTX);
                }
            },
            // Draw a line during mousemove(e) on draw-canvas
            drawLine(e){
                var vm = this
                var rect = vm.DRAW_CANVAS.getBoundingClientRect();
                var x = e.clientX - rect.left;
                var y = e.clientY - rect.top;
                var correction = this.$store.getters.get_firstZoom/this.zoom;

                this.ClearDrawingCanvas();

                vm.DRAW_CANVAS_CTX.beginPath();
                vm.DRAW_CANVAS_CTX.strokeStyle = this.color;
                vm.DRAW_CANVAS_CTX.lineWidth = vm.thickness;
                vm.DRAW_CANVAS_CTX.moveTo(vm.startX, vm.startY);
                vm.DRAW_CANVAS_CTX.lineTo(x, y);
                vm.DRAW_CANVAS_CTX.stroke(); 

                vm.currentDrawing.x = vm.startX*correction;
                vm.currentDrawing.y = vm.startY*correction;
                vm.currentDrawing.width = x*correction;
                vm.currentDrawing.height = y*correction;
                vm.currentDrawing.form = "line"
                vm.currentDrawing.thickness = vm.thickness;
                vm.currentDrawing.colour = this.color;
                vm.currentDrawing.selected = false;
            },
            // Draw an ellipse during mousemove(e) on draw-canvas
            drawEllipse(e){
                var vm = this
                var rect = vm.DRAW_CANVAS.getBoundingClientRect();
                var x = (e.clientX - rect.left);
                var y = e.clientY - rect.top;
                var correction = this.$store.getters.get_firstZoom/this.zoom;
                if(x - vm.startX > 0 && y - vm.startY > 0){
                    this.ClearDrawingCanvas();
                    vm.DRAW_CANVAS_CTX.beginPath();
                    vm.DRAW_CANVAS_CTX.strokeStyle = this.color;
                    vm.DRAW_CANVAS_CTX.lineWidth = vm.thickness;
                    vm.DRAW_CANVAS_CTX.ellipse(vm.startX + (x - vm.startX)/2, vm.startY + (y - vm.startY)/2,  (x - vm.startX)/2, (y - vm.startY)/2, 0, 0, 2 * Math.PI);
                    vm.DRAW_CANVAS_CTX.stroke();
                    vm.currentDrawing.x = (vm.startX + (x - vm.startX)/2)*correction;
                    vm.currentDrawing.y = (vm.startY + (y - vm.startY)/2)*correction;
                    vm.currentDrawing.width = (x - vm.startX)/2 * correction;
                    vm.currentDrawing.height = (y - vm.startY)/2 * correction;
                    vm.currentDrawing.form = "ellipse"
                    vm.currentDrawing.thickness = vm.thickness;
                    vm.currentDrawing.colour = this.color;
                    vm.currentDrawing.selected = false;
                }
                
            },
            // Draw a rectangle during mousemove(e) on draw-canvas
            drawRectangle(e){
                var vm = this
                var rect = vm.DRAW_CANVAS.getBoundingClientRect();
                var x = e.clientX - rect.left;
                var y = e.clientY - rect.top;
                var correction = vm.$store.getters.get_firstZoom/vm.zoom;
                if(x - vm.startX > 0 && y - vm.startY > 0){
                    this.ClearDrawingCanvas();
                    vm.DRAW_CANVAS_CTX.beginPath();
                    vm.DRAW_CANVAS_CTX.strokeStyle = this.color;
                    vm.DRAW_CANVAS_CTX.lineWidth = vm.thickness;
                    vm.DRAW_CANVAS_CTX.rect(vm.startX, vm.startY, (x - vm.startX), (y - vm.startY));
                    vm.DRAW_CANVAS_CTX.stroke();

                    vm.currentDrawing.x = vm.startX*correction;
                    vm.currentDrawing.y = vm.startY*correction;
                    vm.currentDrawing.width = (x - vm.startX)*correction;
                    vm.currentDrawing.height = (y - vm.startY)*correction;
                    vm.currentDrawing.form = "rectangle";
                    vm.currentDrawing.thickness = vm.thickness;
                    vm.currentDrawing.colour = this.color;
                    vm.currentDrawing.selected = false;
                }
            },
            // Clears the drawing canvas
            ClearDrawingCanvas(){
                var vm = this
                // eslint-disable-next-line
                vm.DRAW_CANVAS.width = vm.DRAW_CANVAS.width;
            },
            // Clears the canvas containing all forms
            ClearAllForms(){
                var vm = this
                // eslint-disable-next-line
                vm.FORM_CANVAS.width = vm.FORM_CANVAS.width;
            },
            // When clicking on the button to export the PDF file, a pop-up will be shown in where the name of the PDF can be altered,
            // a checkbox for if a summary should be added and if an excel file should be downloaded
            editName(){ 
                if(!$("#zoomSlider").get(0).disabled && !this.isExporting){
                    this.pdfName = this.$store.getters.get_pdfName;
                    this.summaryNeeded = JSON.parse(this.$store.getters.get_summary);
                    this.excelNeeded = JSON.parse(this.$store.getters.get_excel);
                    this.$modal.show('edit-name');
                }
            },
            // Prepare the export and save parameters in the store
            // Next call "vm.showPage(1, true);" this 'true' will initiate the export
            exportPDF(){
                if(!$("#zoomSlider").get(0).disabled && !this.isExporting){
                    this.$store.commit('update_pdfName', $('#export_name').get(0).value.replace(/.pdf/gi, ''));
                    this.pdfName = $('#export_name').get(0).value.replace(/.pdf/gi, '');
                    this.$store.commit('update_summary', JSON.stringify($('#summaryNeeded').get(0).checked));
                    //this.$store.commit('update_excel', JSON.stringify($('#excelNeeded').get(0).checked));
                    this.summaryNeeded = JSON.parse(this.$store.getters.get_summary);
                    this.excelNeeded = JSON.parse(this.$store.getters.get_excel);
                    
                    // Hide the pop-up
                    this.$modal.hide('edit-name');
                    var vm = this;
                    vm.savedPage = vm.CURRENT_PAGE;
                    vm.savedZoom = vm.zoom;
                    vm.PDF = new jsPDF();
                    vm.showPage(1, true);
                }
            },
            // Open the PDF on given URL (blob) and show the first page
            showPDF(pdf_url, vm) {
                this.getDocument(pdf_url).then(function(pdf_doc) {
                    // Set the pdf_doc and it's number of pages
                    vm.PDF_DOC = pdf_doc;
                    vm.TOTAL_PAGES = vm.PDF_DOC.numPages;
                    
                    // Hide the pdf loader and show pdf container in HTML
                    $("#pdf-total-pages").text(vm.TOTAL_PAGES);

                    // Show the first page
                    vm.showPage(vm.CURRENT_PAGE, false);
                }).catch(response => {
                    this.$emit('document-errored', {text: 'Failed to retrieve PDF', response});
                    console.log('Failed to retrieve PDF', response);
                });
            },
            getDocument(url) {
            // Using import statement in this way allows Webpack
            // to treat pdf.js as an async dependency so we can
            // avoid adding it to one of the main bundles
            return import(
                /* webpackChunkName: 'pdfjs-dist' */
                'pdfjs-dist/webpack').then(pdfjs => pdfjs.getDocument(url).promise);
            },
            // Shows the page on a given page number. If exporting is true, the PDF will be exported recursively
            showPage(page_no, exporting) {
                this.isExporting = exporting; 
                $("#circle2").show();             
                $("#canvases").hide();        
                
                // When uploading new pdf, remove all drawings
                if(this.isNewPdf){
                    var empty = [];
                    var i = 0;
                    for (i = 0; i < this.TOTAL_PAGES; i++) {
                        empty.push([]);
                    }
                    this.$store.commit('update_drawings', JSON.stringify(empty));
                    this.isNewPdf = false;
                    this.firstZoom = null;
                }
                this.CURRENT_PAGE = page_no;

                // Disable Prev & Next buttons + slider while page is being loaded
                $("#pdf-next, #pdf-prev").attr('disabled', 'disabled');
                $("#zoomSlider").get(0).disabled = true;

                var vm = this;
                // Fetch the page
                vm.PDF_DOC.getPage(page_no).then(function(page) { 
                    // Get viewport of the page at required scale
                    
                    $("#pdf-current-page").text(page_no);
                    // Set scale of pdf on normal scale
                    vm.originalWidth = page.getViewport({scale:1}).width;
                    var viewport;
                    if(exporting){
                        $("#canvases").hide();
                        $("#pdf-buttons").hide();
                        $("#zoomSlider").get(0).disabled = true;  
                        $("#waiting").get(0).innerHTML = "WAIT FOR EXPORT TO FINISH!";
                        viewport = page.getViewport({scale:3});
                        vm.zoom = 3;
                    }
                    else{
                        viewport = page.getViewport({scale:vm.zoom});
                    }

                    // Set canvas height
                    vm.PDF_CANVAS.height = viewport.height;
                    vm.PDF_CANVAS.width = viewport.width;
                    vm.FORM_CANVAS.height = viewport.height;
                    vm.FORM_CANVAS.width = viewport.width;
                    vm.DRAW_CANVAS.height = viewport.height;
                    vm.DRAW_CANVAS.width = viewport.width;

                    vm.$store.commit('update_lastWidth', JSON.stringify(viewport.width));
                    vm.$store.commit('update_lastHeight', JSON.stringify(viewport.height));

                    var renderContext = {
                        canvasContext: vm.PDF_CANVAS_CTX,
                        viewport: viewport
                    };
                    // Render the page contents in the canvas
                    page.render(renderContext).then(function() {
                        // Re-enable Prev & Next buttons
                        $("#pdf-next, #pdf-prev").removeAttr('disabled');
                        $("#zoomSlider").get(0).disabled = false;

                        // Show the canvases
                        $("#core").show();      
                        $("#circle2").hide();
                        $("#canvases").show();                    

                        if(vm.$store.getters.get_firstZoom == null){
                            var canvasWidth = $("#canvases").get(0).clientWidth;
                            var maxZoom = (canvasWidth-2)/vm.originalWidth;
                            vm.$store.commit('update_firstZoom', $("#zoomSlider").get(0).value/(100/maxZoom))
                            vm.zoom = vm.$store.getters.get_firstZoom;
                            vm.$store.commit('update_zoom', vm.zoom);
                        }

                        // Update current page in HTML
                        vm.redrawAllForms(vm.FORM_CANVAS_CTX);
                        
                        // The export part, export current page
                        if(exporting && page_no < vm.TOTAL_PAGES){
                            vm.redrawAllForms(vm.PDF_CANVAS_CTX);
                            vm.PDF.addImage(vm.PDF_CANVAS, 'JPEG', 0, 0, 210, 297);
                            var i;
                            for (i = 0; i < vm.getDrawings()[vm.CURRENT_PAGE-1].length; i++) {
                                var form = vm.getDrawings()[vm.CURRENT_PAGE-1][i];
                                vm.addAnnotation(form, vm, viewport, vm.PDF);
                            } 
                            vm.PDF.addPage();
                            
                            // Next step is to export the next page
                            vm.showPage(vm.CURRENT_PAGE+1, true);
                        }
                        // When exporting and last page is reached, disable the export by using parameter 'false'
                        else if(exporting && page_no == vm.TOTAL_PAGES-1){
                            vm.showPage(vm.TOTAL_PAGES, false);
                        }
                        // ELSE, if exporting AND vm.PDF != null, meaning the export PDF is ready and was just built (because the last page was reached)
                        else{
                            if(vm.PDF != null && exporting){
                                // add last page in the PDF
                                vm.redrawAllForms(vm.PDF_CANVAS_CTX);
                                for (i = 0; i < vm.getDrawings()[vm.CURRENT_PAGE-1].length; i++) {
                                    form = vm.getDrawings()[vm.CURRENT_PAGE-1][i];
                                    vm.addAnnotation(form, vm, viewport, vm.PDF);
                                }
                                vm.PDF.addImage(vm.PDF_CANVAS, 'JPEG', 0, 0, 210, 297);
                                var PDF_annotated = vm.PDF;
                                vm.PDF = null;
                                vm.PDF = new jsPDF();
                                
                                // Fix to prevent the annotation from shifting:
                                // https://github.com/MrRio/jsPDF/issues/131#issuecomment-604259932
                                // create two separate PDF, one with the annotations and drawings
                                // and one PDF containing the summary
                                // and merge them with pdf-lib library -> then download with downloadjs library
                                if(JSON.parse(vm.$store.getters.get_summary)){
                                    vm.addSummary();
                                    vm.mergePDFs(PDF_annotated, vm.PDF, vm.pdfName); // merge the pdfs
                                }
                                else{
                                    PDF_annotated.save(vm.pdfName + ".pdf"); // Download the PDF
                                }
                                /*if(JSON.parse(vm.$store.getters.get_excel)){
                                    vm.createExcel();}*/
                                

                                vm.PDF = null;
                                vm.zoom = vm.savedZoom;
                                vm.CURRENT_PAGE = vm.savedPage;
                                $("#canvases").show();
                                $("#pdf-buttons").show();
                                $("#waiting").get(0).innerHTML = "";
                                $("#zoomSlider").get(0).disabled = false;  
                                vm.showPage(vm.CURRENT_PAGE, false); // Reopen the page before the exporting started
                            }
                        }
                    });
                });
            },
            async mergePDFs(annotatedPDF, summaryPDF, name){
                const mergedPdf = await PDFDocument.create();
                
                const pdfA = await PDFDocument.load(annotatedPDF.output('arraybuffer'));
                const pdfB = await PDFDocument.load(summaryPDF.output('arraybuffer'));
                const copiedPagesA = await mergedPdf.copyPages(pdfA, pdfA.getPageIndices());
                copiedPagesA.forEach((page) => mergedPdf.addPage(page));

                const copiedPagesB = await mergedPdf.copyPages(pdfB, pdfB.getPageIndices());
                copiedPagesB.forEach((page) => mergedPdf.addPage(page));

                const mergedPdfFile = await mergedPdf.save();
                download(mergedPdfFile, name, "application/pdf");
            },
            // Add a real annotation (when exporting) to a PDF based on the annotations in the Feedback tool (the PDF editor)
            addAnnotation(form, vm, viewport, pdf){
                if(form.form == "annotation" && !(form.error == null && form.feedback.length < 1 )){
                    var error_text = ""
                    if(form.error == null){
                        error_text = "No error given."
                    }
                    else{
                        error_text = "Error: " + form.error.slice(form.error.indexOf(':')+2,form.error.length);
                    }
                    var feedback = "";
                    if(form.feedback.length < 1){
                        feedback = "No feedback given.";
                    }
                    else{
                        feedback = "Feedback: \n" + form.feedback;
                    }

                    var correction = vm.zoom/vm.$store.getters.get_firstZoom;
                    pdf.createAnnotation({
                        type: 'text',
                        title: error_text,
                        bounds: {
                            x: form.x/viewport.width*210*correction,
                            y: form.y/viewport.height*297*correction,
                            w: 10,
                            h: 10
                        },
                        contents: feedback,
                        open: false
                    });
                }
            },
            // This writes text on a given pdf page 'doc' and makes sure that the text won't go out of the bounds and start on new lines until finished writing
            addText(text, doc, x, y, rightMargin, charLengthSizeOne, whiteSpaceLength, write=true){
                var currentX = x;
                var currentY = y;
                var currentText = "";
                var allWords = text.split(" ");
                for(var i = 0; i < allWords.length; i++){
                    var extraLength = (allWords[i].length)*charLengthSizeOne*doc.getFontSize();
                    var extraLengthWithSpace = (allWords[i].length + 1)*charLengthSizeOne*doc.getFontSize();
                    if(currentX + extraLength < rightMargin && allWords[i] != "/n"){
                        currentText += allWords[i] + " ";
                        currentX += extraLengthWithSpace;
                    }
                    else if(currentX + extraLength >= rightMargin || allWords[i] == "/n"){
                        if(write){doc.text(currentText, x, currentY);}
                        var whiteSpace = 0;
                        if(allWords[i] == "/n"){
                            whiteSpace = 2;
                            ++i; // avoid "/n"
                        }
                        currentX = x + (allWords[i].length + 1)*charLengthSizeOne*doc.getFontSize();
                        currentY += 5 + whiteSpace;
                        currentText = allWords[i] + " ";
                    }
                    if(i == allWords.length - 1){
                        if(write){doc.text(currentText, x, currentY);}
                    }
                    if(currentY + 15 > 287){
                        if(write){doc.addPage();}
                        currentY = 20;
                 }
                }
                 if(currentY + 15 > 287){
                    if(write){doc.addPage();}
                    return 20;
                 }
                return currentY + whiteSpaceLength;
            },
            // Adds a summary to the end of the annotated PDF when exporting
            addSummary(){ //todo new summary
                var doc = this.PDF;
                doc.setFont("courier"); // courier is a monospace font, so I can count the length of sentences/words
                doc.setFontSize(15); 
                doc.setFontStyle("bold");
                doc.setTextColor(0, 0, 255);
                var title = 'FEEDBACK REPORT - ' + this.pdfName; // Create the title
                var charLengthSizeOne = 0.211818182; // This is the length of one char in monospace font 'courier' with size one
                doc.setTextColor(97, 124, 146);
                doc.setDrawColor(97, 124, 146);
                doc.text(title, (210-title.length*charLengthSizeOne*doc.getFontSize())/2, 20); // Add Title of the report and center it
                // Underline the title
                doc.line((210-title.length*charLengthSizeOne*doc.getFontSize())/2,21,(210-title.length*charLengthSizeOne*doc.getFontSize())/2 + title.length*charLengthSizeOne*doc.getFontSize(), 21)
                doc.setTextColor(0, 0, 0);
                doc.setDrawColor(0,0,0);

                doc.setFontSize(10);
                doc.setFontStyle("normal");
                // Create explanatory text
                var introText = "Here is some background information to help you understand this report better: /n This exercise has been designed to test your achievements of intermediate learning goals of the course and to help identify the possible gaps in your knowledge. /n To do so, we categorize all the errors made in the model according to the knowledge and cognitive levels identified in the Revised Bloom's Taxonomy of educational objectives. Below, you will find the list of key errors made in the requirements analysis and the model itself and some recommendations for improvement of the modelling skills.";
                var currentY = 32;
                var currentX = 10;
                var rightMargin = 210-10;
                // var bottomMargin = 297 - 10;
                // Add explanatory text
                currentY = this.addText(introText, doc, currentX, currentY, rightMargin, charLengthSizeOne, 8);

                doc.setFontStyle("bold");
                doc.text("List of errors", currentX, currentY); // Add list of errors
                doc.setFontStyle("normal");
                currentY += 8;

                // Add the used error types
                var noAnnotations = true;
                var i;
                var j;
                var weightSum = 0;
                for (j = 0; j < this.getDrawings().length; j++) {
                    for (i = 0; i < this.getDrawings()[j].length; i++) {
                        var form = this.getDrawings()[j][i];
                        if(form.form == "annotation"  && form.error != null){
                            var error_text = form.error.slice(form.error.indexOf(':')+2,form.error.length);
                            currentY = this.addText("   -", doc, currentX, currentY, rightMargin, charLengthSizeOne, 0);
                            currentY = this.addText(error_text, doc, currentX+10, currentY, rightMargin-25, charLengthSizeOne, 5)
                            currentY = this.addText("weight: " + String(form.weight), doc, rightMargin-20, currentY-5, 10000, charLengthSizeOne, 5);
                            var textWithoutSpaces = form.feedback.replace(" ", '')
                            if(textWithoutSpaces.length > 0){
                                currentY = this.addText("Feedback: " + form.feedback, doc, currentX+15, currentY, rightMargin-25, charLengthSizeOne, 5)
                            }
                            noAnnotations = false;
                            weightSum += parseInt(form.weight);
                        }
                    }
                }

                currentY = this.addText("Sum of weights: " + String(weightSum), doc, rightMargin-37, currentY+5, 10000, charLengthSizeOne, 5);

                // Add empty if there were no error types
                if(noAnnotations){
                    currentY = this.addText("empty", doc, currentX, currentY, rightMargin, charLengthSizeOne, 0);
                    currentY += 5;
                }
                currentY += 3;

                // Find the IDs of the used error types in the annotations and store them in 'annotatedErrorTypes'
                var annotatedErrorTypes = new Set();
                for (j = 0; j < this.getDrawings().length; j++) {
                    for (i = 0; i < this.getDrawings()[j].length; i++) {
                        form = this.getDrawings()[j][i];
                        if(form.form == "annotation"  && form.error != null){
                            annotatedErrorTypes.add(form.id);
                        }
                    }
                }
                annotatedErrorTypes = Array.from(annotatedErrorTypes);

                // Find the IDs of the learning outcomes that occur in the used error types and store them in 'linkedLearningOutcomes'
                var linkedLearningOutcomes = new Set();
                for(i = 0; i < this.errorTypes.length; i++){
                    if(annotatedErrorTypes.indexOf(this.errorTypes[i]._id) > -1 && this.errorTypes[i].learningOutcome.length > 0){
                        linkedLearningOutcomes.add(this.errorTypes[i].learningOutcome);
                    }
                }
                linkedLearningOutcomes = Array.from(linkedLearningOutcomes);
                
                // Create a dictionary linking the IDs of learning items to their name
                // + create a list with the sorted IDs of the learning items
                var learningItemIDToName = {};
                var learningItemSortedIDs = [];
                for (i = 0; i < this.learningItems.length; i++) {
                    learningItemIDToName[this.learningItems[i]._id] = this.learningItems[i].name;
                    learningItemSortedIDs.push(this.learningItems[i]._id);
                }

                // Create a list with the sorted IDs of the learning outcomes
                var learningOutcomeSortedIDs = [];
                for (i = 0; i < this.learningOutcomes.length; i++) {
                    learningOutcomeSortedIDs.push(this.learningOutcomes[i]._id);
                }
                
                // Find the IDs of the content/exercise items that occur in the used learning outcomes that occur in the used error types 
                // and store them in 'linkedContentItems'/'linkedExerciseItems'
                var linkedContentItems = new Set();
                var linkedExerciseItems = new Set();
                for(i = 0; i < this.learningOutcomes.length; i++){
                    if(linkedLearningOutcomes.indexOf(this.learningOutcomes[i]._id) > -1){
                        for(j = 0; j < this.learningOutcomes[i].LearningItems.length; j++){
                            if(this.learningItems[learningItemSortedIDs.indexOf(this.learningOutcomes[i].LearningItems[j])].isExerciseItem){
                                linkedExerciseItems.add(this.learningOutcomes[i].LearningItems[j]);
                            }
                            else{
                                linkedContentItems.add(this.learningOutcomes[i].LearningItems[j]);
                            }
                        }
                    }
                }
                linkedExerciseItems = Array.from(linkedExerciseItems);
                linkedContentItems = Array.from(linkedContentItems);

                // Fill 'contentItems' and 'exerciseItems' with the names of the right learning items (using 'learningItemIDToName')
                // based on the found IDs in 'linkedContentItems' and 'exerciseItems'
                var contentItems = "no content items"; // initially empty
                var exerciseItems = "no exercise items"; // initially empty
                if(linkedContentItems.length > 0){
                    contentItems = "";
                    if(linkedContentItems.length == 1){
                        contentItems = "'" + learningItemIDToName[linkedContentItems[0]] + "'";
                    }
                    if(linkedContentItems.length >= 2){
                        for(i = 0; i < linkedContentItems.length; i++){
                            if(i < linkedContentItems.length - 2){
                                contentItems += "'" + learningItemIDToName[linkedContentItems[i]] + "', ";
                            }
                            else if(i == linkedContentItems.length - 2){
                                contentItems += "'" + learningItemIDToName[linkedContentItems[i]] + "' and ";
                            }
                            else{
                                contentItems += "'" + learningItemIDToName[linkedContentItems[i]] + "'";
                            }
                            
                        }
                    }
                }
                if(linkedExerciseItems.length > 0){
                    exerciseItems = "";
                    if(linkedExerciseItems.length == 1){
                        exerciseItems = "'" + learningItemIDToName[linkedExerciseItems[0]] + "'";
                    }
                    if(linkedExerciseItems.length >= 2){
                        for(i = 0; i < linkedExerciseItems.length; i++){
                            if(i < linkedExerciseItems.length - 2){
                                exerciseItems += "'" + learningItemIDToName[linkedExerciseItems[i]] + "', ";
                            }
                            else if(i == linkedExerciseItems.length - 2){
                                exerciseItems += "'" + learningItemIDToName[linkedExerciseItems[i]] + "' and ";
                            }
                            else{
                                exerciseItems += "'" + learningItemIDToName[linkedExerciseItems[i]] + "'";
                            }
                            
                        }
                    }
                }

                // Create and add the text which content items and exercise items to review
                var reviewInfoText = ""
                if(contentItems != "no content items" || exerciseItems != "no exercise items"){
                    reviewInfoText = "These errors indicate that you might need to review: /n "
                }
                if(contentItems != "no content items"){
                    reviewInfoText += "- " + contentItems + " of the course book /n "
                }
                if(exerciseItems != "no exercise items"){
                    reviewInfoText += "- exercises " + exerciseItems + " in the online course"
                }
                if(contentItems != "no content items" || exerciseItems != "no exercise items"){
                    currentY = this.addText(reviewInfoText, doc, currentX, currentY, rightMargin, charLengthSizeOne, 8);
                }

                // Start creating the horizontal table
                var borderMargin = 10;
                currentX = borderMargin;
                currentY = borderMargin;
                var width = 297;
                var height = 210;
                var nameLength = 75;
                var weightLength = 47;
                var descriptionLength = 100;
                var outcomeLength = 75;
                
                if(this.errorTypes.length > 0){
                    // Horizontal page, see: https://github.com/MrRio/jsPDF/issues/49
                    doc.addPage('a4', 'landscape'); // width = 297 and height = 210
                    doc.line(currentX, currentY, width-borderMargin, currentY);
                    currentY += 4;
                    doc.setFontStyle("bold");
                    this.addText("WEIGHT", doc, currentX+nameLength+2, currentY+1, currentX + nameLength + weightLength, charLengthSizeOne, 0, true);
                    this.addText("DESCRIPTION", doc, currentX+nameLength+weightLength+2, currentY+1, currentX+nameLength+weightLength+descriptionLength, charLengthSizeOne, 0,true);
                    this.addText("LEARNING OUTCOME", doc, currentX+nameLength+weightLength+descriptionLength+2, currentY+1, width-borderMargin-2, charLengthSizeOne, 0,true);
                    currentY = this.addText("NAME", doc, currentX+2, currentY+1, currentX + nameLength, charLengthSizeOne, 0,true);
                    doc.setFontStyle("normal");
                    currentY += 7;
                    doc.line(currentX, currentY-4, width-borderMargin, currentY-4);
                }
                var oldY = -1;

                for(i = 0; i < this.errorTypes.length; i++){
                    var name = this.errorTypes[i].name;
                    var weight = String(this.errorTypes[i].weight);
                    var description = this.errorTypes[i].description;
                    var learningOutcome = this.errorTypes[i].learningOutcome;
                    if(learningOutcome.length > 0){
                        learningOutcome = this.learningOutcomes[learningOutcomeSortedIDs.indexOf(learningOutcome)].name;
                    }
                    var newYs = [];
                    newYs.push(this.addText(weight, doc, currentX+nameLength+2, currentY+1, currentX + nameLength + weightLength, charLengthSizeOne, 0, false));
                    newYs.push(this.addText(description, doc, currentX+nameLength+weightLength+2, currentY+1, currentX+nameLength+weightLength+descriptionLength, charLengthSizeOne, 0, false));
                    newYs.push(this.addText(learningOutcome, doc, currentX+nameLength+weightLength+descriptionLength+2, currentY+1, width-borderMargin-2, charLengthSizeOne, 0, false));
                    newYs.push(this.addText(name, doc, currentX+2, currentY+1, currentX + nameLength, charLengthSizeOne, 0, false));
                    var largestY = Math.max.apply(Math, newYs);
                    
                    // Add new page if needed
                    if(largestY > height - borderMargin){
                        doc.addPage('a4', 'landscape')
                        largestY = largestY-currentY + 14;
                        currentY = 10;
                        // top line of the table
                        doc.line(currentX, currentY, width-borderMargin, currentY);
                        currentY += 4;
                        oldY = -1; 
                        doc.setFontStyle("bold");
                        this.addText("WEIGHT", doc, currentX+nameLength+2, currentY+1, currentX + nameLength + weightLength, charLengthSizeOne, 0, true);
                        this.addText("DESCRIPTION", doc, currentX+nameLength+weightLength+2, currentY+1, currentX+nameLength+weightLength+descriptionLength, charLengthSizeOne, 0,true);
                        this.addText("LEARNING OUTCOME", doc, currentX+nameLength+weightLength+descriptionLength+2, currentY+1, width-borderMargin-2, charLengthSizeOne, 0,true);
                        var yBackup = currentY;
                        currentY = this.addText("NAME", doc, currentX+2, currentY+1, currentX + nameLength, charLengthSizeOne, 0,true);
                        doc.setFontStyle("normal");
                        currentY += 7;
                        largestY += currentY-yBackup;
                        doc.line(currentX, currentY-4, width-borderMargin, currentY-4);
                    }
                    this.addText(weight, doc, currentX+nameLength+2, currentY+1, currentX + nameLength + weightLength, charLengthSizeOne, 0, true);
                    this.addText(description, doc, currentX+nameLength+weightLength+2, currentY+1, currentX+nameLength+weightLength+descriptionLength, charLengthSizeOne, 0,true);
                    this.addText(learningOutcome, doc, currentX+nameLength+weightLength+descriptionLength+2, currentY+1, width-borderMargin-2, charLengthSizeOne, 0,true);
                    this.addText(name, doc, currentX+2, currentY+1, currentX + nameLength, charLengthSizeOne, 0,true);
                    currentY = largestY + 7;

                    if(oldY < 0){oldY = borderMargin}

                    doc.line(currentX, currentY-4, width-borderMargin, currentY-4); // horizontal line
                    doc.line(currentX, oldY, currentX, currentY-4);
                    doc.line(currentX+nameLength, oldY, currentX+nameLength, currentY-4);
                    doc.line(currentX+nameLength+weightLength, oldY, currentX+nameLength+weightLength, currentY-4);
                    doc.line(currentX+nameLength+weightLength+descriptionLength, oldY, currentX+nameLength+weightLength+descriptionLength, currentY-4);
                    doc.line(currentX+nameLength+weightLength+descriptionLength+outcomeLength, oldY, currentX+nameLength+weightLength+descriptionLength+outcomeLength, currentY-4);
                    doc.line(width-borderMargin, oldY, width-borderMargin, currentY-4);
                    oldY = currentY-4;
                    
                }

                /*
                doc.setFontStyle("bold");
                // Add achievements
                doc.text("Your level of achievements of learning outcomes:", currentX, currentY);
                doc.setFontStyle("normal");
                currentY += 8;

                // Start creating the table of learning outcomes
                if(linkedLearningOutcomes.length > 0){
                    doc.line(currentX, currentY, rightMargin, currentY);
                }
                else{
                    currentY = this.addText("empty", doc, currentX, currentY, rightMargin, charLengthSizeOne, 0);
                }
                currentY += 4;
                for(i = 0; i < linkedLearningOutcomes.length; i++){
                    var name = this.learningOutcomes[learningOutcomeSortedIDs.indexOf(linkedLearningOutcomes[i])].name;
                    currentY = this.addText(name, doc, currentX+2, currentY+1, rightMargin-25, charLengthSizeOne, 0);
                    currentY += 8;
                    doc.line(currentX, currentY-4, rightMargin, currentY-4);
                    doc.line(currentX, currentY-12, currentX, currentY-4);
                    doc.line(rightMargin, currentY-12, rightMargin, currentY-4);
                    doc.line(rightMargin-25, currentY-12, rightMargin-25, currentY-4);
                    // Add new page if needed
                    if(currentY + 8 > bottomMargin && i < linkedLearningOutcomes.length-1){
                        doc.addPage();
                        currentY = 20;
                        // top line of the table
                        doc.line(currentX, currentY-4, rightMargin, currentY-4);
                    }
                }
                
                currentY += 8;
                // Add new page if needed for the last part
                if(currentY > 230){
                    doc.addPage();
                    currentY = 20;
                }
                
                doc.setFontStyle("bold");
                // Add expertise level
                doc.text("Your current expertise level in creating EDGs:", currentX, currentY);
                doc.setFontStyle("normal");
                currentY += 8;
                doc.line(currentX, currentY, rightMargin, currentY);
                var levels = ["Basic","Pre-intermediate","Intermediate","Upper-intermediate","Advanced",""]
                var count = 0;
                for(i = currentX; i <= rightMargin; i += (rightMargin-currentX)/5){
                    doc.line(i, currentY, i, currentY+8);
                    var textLength = levels[count].length*charLengthSizeOne*doc.getFontSize();
                    // Center the expertise levels
                    doc.text(levels[count], i + ((rightMargin-currentX)/5)/2 - textLength/2, currentY+12);
                    count++;
                }
                currentY += 8;
                doc.line(currentX, currentY, rightMargin, currentY);
                */
                
            },
            // Generates an excel file containing extra information (sort of summary)
            createExcel(){ //todo old version and not correct any longer
                var i;
                var j;
                var data = [];
                var total_weight = 0;
                data.push([{
                                value: "TYPE OF ERROR",
                                type: 'string'
                            }, {
                                value: 'WEIGHT',
                                type: 'string'
                            }
                            , {
                                value: "FEEDBACK",
                                type: 'string'
                            }]);
                for (j = 0; j < this.getDrawings().length; j++) {
                    for (i = 0; i < this.getDrawings()[j].length; i++) {
                        var form = this.getDrawings()[j][i];
                        if(form.form == "annotation" && !(form.error == null && form.feedback.length < 1 )){
                            var error_text = ""
                            var weight = parseInt(form.weight);
                            if(form.error == null){
                                error_text = "No error given."
                                weight = 0;
                            }
                            else{
                                error_text = form.error.slice(form.error.indexOf(':')+2,form.error.length);
                            }
                            var feedback = "";
                            if(form.feedback.length < 1){
                                feedback = "No feedback given.";
                            }
                            else{
                                feedback = form.feedback;
                            }
                            data.push([{
                                value: error_text,
                                type: 'string'
                            }, {
                                value: weight,
                                type: 'number'
                            }
                            , {
                                value: feedback,
                                type: 'string'
                            }]);
                            total_weight += weight;
                        }
                    }
                }
                data.push([{
                                value: "",
                                type: 'string'
                            }, {
                                value: 'Sum: ' + String(total_weight),
                                type: 'string'
                            }]);
                
                const config = {
                    filename: this.$store.getters.get_pdfName,
                    sheet: {
                        data
                    }
                };


            zipcelx(config); // Let the user download the excel file
            },
            // This will trigger the browse window to be opened and the user can select a PDF locally
            select(){
                    if(!this.isExporting){
                        // When select button is pressed, trigger browse action
                        $("#file-to-upload").trigger('click');
                    }
            },
            // The actual uploading of the PDF after selecting a PDF locally in the browse window
            upload(){
                if(!this.isExporting){
                    // When browsing is done and pdf is selected, trigger browse action
                    this.$store.commit('update_url', JSON.stringify(URL.createObjectURL($("#file-to-upload").get(0).files[0])));
                    this.isNewPdf = true;
                    $("#zoomSlider").get(0).value = 60;
                    this.CURRENT_PAGE = 1;
                    this.$store.commit('update_page_number', 1);
                    this.$store.commit('update_drawings', JSON.stringify([]));
                    this.$store.commit('update_pdfName', $("#file-to-upload").get(0).files[0].name.replace(/.pdf/gi, ''));
                    this.pdfName = $("#file-to-upload").get(0).files[0].name;
                    this.showPDF(URL.createObjectURL($("#file-to-upload").get(0).files[0]), this)
                }
            },
            // Load next page if possible
            nextPage(){
                if(this.TOTAL_PAGES > 0 && this.CURRENT_PAGE != this.TOTAL_PAGES && !$("#zoomSlider").get(0).disabled){
                    this.showPage(++this.CURRENT_PAGE, false);
                    this.$store.commit('update_page_number', this.CURRENT_PAGE);
                }
            },
            // Load previous page if possible
            previousPage(){
                if(this.TOTAL_PAGES > 0 && this.CURRENT_PAGE != 1 && !$("#zoomSlider").get(0).disabled){
                    this.showPage(--this.CURRENT_PAGE, false);
                    this.$store.commit('update_page_number', this.CURRENT_PAGE);
                }
            },
            // Load first page if possible
            firstPage(){
                if(this.TOTAL_PAGES > 0 && this.CURRENT_PAGE != 1 && !$("#zoomSlider").get(0).disabled){
                    this.showPage(1, false);
                    this.$store.commit('update_page_number', this.CURRENT_PAGE);
                }
            },
            // Load last page if possible
            lastPage(){
                if(this.TOTAL_PAGES > 0 && this.CURRENT_PAGE != this.TOTAL_PAGES && !$("#zoomSlider").get(0).disabled){
                    this.showPage(this.TOTAL_PAGES, false);
                    this.$store.commit('update_page_number', this.CURRENT_PAGE);
                }
            },
            // Reduce the thickness by one
            thinner(){
                this.thickness = Math.max(1, this.thickness - 1 );
                this.$store.commit('update_thickness', String(this.thickness));
                $("#thickness-value").get(0).innerHTML = " " + String(this.thickness) + " ";

            },
            // Improve the thickness by one
            thicker(){
                this.thickness = Math.min(5, this.thickness + 1 );
                this.$store.commit('update_thickness', String(this.thickness));
                $("#thickness-value").get(0).innerHTML = " " + String(this.thickness) + " ";
            },
        },
        
       }
</script>

<style scoped> 
/* Some styles applied on different buttons/objects */
    canvas {border: 2px solid black;cursor:crosshair} 
    
    #core{
        /*All elements outside the sidebar should reorder according to the sidebar*/
        background-color: rgb(233, 233, 233);
        margin-left: 160px;
        padding: 0px 10px;
    }
    #inner_remaining{
        background-color: rgb(233, 233, 233);
        position: absolute;
        top: 0px;
        bottom: 0;
        width: 100%; 
        z-index: -2;
    }
    #circle2{
        margin-left: 160px;
        margin-top: 50px;
        z-index: 5;
    }
    #colour-part{
        padding-left: 15px;
    }
    #canvases {
        position:relative; /*This line is needed to position next absolute canvas position*/
    }
    #draw-canvas{
        position:absolute;
        top:0;bottom:1;right:0;left:0;
        margin:auto;
    }
    #moveHandle{
        position:absolute;
        top:0;bottom:1;right:0;left:0;
        padding-top: 5px;
        padding-left: 5px;
    }
    #form-holding-canvas{
        position:absolute;
        top:0;bottom:1;right:0;left:0;
        margin:auto;
    }
    #upload-export{
        position: absolute;
        height: 102px;
        width: 250px;
        top: 0px; left: 180px;
        padding-top: 10px;
    }
    #upload-button{
        padding-right: 50px;
    }
    #colour-picker:hover{
        cursor:pointer;
    }
    
    #left-half {
        display: table-cell;
        text-align: center;
        width: 450px;
        height: 300px;
        border-right: 1px solid black;
    }

    #right-half {
        display: table-cell;
        text-align: center;
        width: 450px;
        height: 300px;
        border-left: 1px solid black;
    }

    #cancelButton{
        position: absolute;
        top: 0px; left: 380px;
    }

    #name-space{
        position: absolute;
    }

</style>