<template>
    <div class="container-fluid">

      <!-- Popup indicating mistake based on the global string variable 'faultMessage' which updates based on the kind of fault/error !-->
      <modal name="fault-popup" height="150" width="900" style="background: transparent;">
            <div style="text-align: center;"><br>
                <h3>{{this.faultMessage}}</h3>
            </div>
      </modal>

      <!-- Import warning popup !-->
      <!-- Is always shown when user tries to import a new database, the old one will be lost !-->
        <modal name="warning-popup"  height="270" style="background: transparent;" >
            <div class="col-md-12 form-wrapper" style="text-align: center;">
              <br><h2>Are you sure you want to import a new database?</h2><br>
              <h2>The current data in the database will be lost.</h2>
                <div class="form-group col-md-4 pull-right">
                    <button class="btn btn-success" @click="triggerUpload"> Yes </button>
                    <button id="cancelButton" class="btn btn-success"  @click="hideImportWarning"> No </button>  
                </div>    
        </div>
      </modal>

      <!-- Popup for creating/editing errortype !-->
      <!-- Based on the global variable 'modus' some text/markup will be different: 'create' or 'edit' !-->
        <modal name="create-errortype"  height="600" style="background: transparent;" @closed="hideErrorTypePopup" >
            <div class="col-md-12 form-wrapper" style="text-align: center;">
            <br><h2 v-if="modus=='create'"> Create Errortype </h2>
                <h2 v-if="modus=='edit'"> Edit Errortype </h2>
                <div class="form-group col-md-12">
                    <label for="title"> Name </label>
                    <input v-if="modus=='create'" style="border: 2px solid red;" @input="changeInErrorType" type="text" id="name" v-model="errorName" name="title" class="form-control" placeholder="Enter name">
                    <input v-if="modus=='edit'" style="border: 2px solid green;" @input="changeInErrorType" type="text" id="name" v-model="errorName" name="title" class="form-control" placeholder="Enter name">
                </div>
                <div class="form-group col-md-12">
                    <label for="title"> Weight </label>
                    <input v-if="modus=='create'" style="border: 2px solid red;" @input="changeInErrorType" type="text" id="weight" v-model="errorWeight" name="title" class="form-control" placeholder="Enter weight">
                    <input v-if="modus=='edit'" style="border: 2px solid green;" @input="changeInErrorType" type="text" id="weight" v-model="errorWeight" name="title" class="form-control" placeholder="Enter weight">
                </div>
                <div class="form-group col-md-12">
                    <label for="description"> Description </label>
                    <input v-if="modus=='create'" style="border: 2px solid red;" @input="changeInErrorType" type="text" id="description" v-model="errorDescription" name="description" class="form-control" placeholder="Enter description">
                    <input v-if="modus=='edit'" style="border: 2px solid green;" @input="changeInErrorType" type="text" id="description" v-model="errorDescription" name="description" class="form-control" placeholder="Enter description">
                </div>
                <label for="learningOutcome"> Learning outcome </label>
                <div style="display: flex;align-items: center;justify-content: center;">
                <div id="dropdown" style="width: 435px; border: 2px solid green; display: flex;align-items: center;justify-content: center;">
                  <multiselect 
                      v-model="selectedLearningOutcome"
                      :options="Object.values(dropdownLearningOutcomes)"
                      :maxHeight="180"
                      @input="changeInErrorType"
                      placeholder="Select learning outcome"
                      style="width: 435px;"
                  ></multiselect></div></div>
                <br>
                <div class="form-group col-md-4 pull-right">
                    <button v-if="modus=='create'" class="btn btn-success" @click="pushErrorType"> Create new errortype </button>
                    <button v-if="modus=='edit'" class="btn btn-success" @click="pushErrorType"> Edit errortype </button>
                    <button id="cancelButton" class="btn btn-success"  @click="hideErrorTypePopup"> Cancel </button>  
                </div>    
        </div>
      </modal>

      <!-- Popup for creating/editing learning outcome !-->
      <!-- Based on the global variable 'modus' some text/markup will be different: 'create' or 'edit' !-->
        <modal name="create-learningoutcome"  height="780" style="background: transparent;" @closed="hideLearningOutcomePopup">
            <div class="col-md-12 form-wrapper" style="text-align: center;">
            <br><h2 v-if="modus=='create'"> Create learning outcome </h2>
                <h2 v-if="modus=='edit'"> Edit learning outcome </h2>
                <div class="form-group col-md-12">
                    <label for="title"> Learning outcome </label>
                    <input v-if="modus=='create'" style="border: 2px solid red;" @input="changeInLearningOutcome" type="text" id="learningName" v-model="learningName" name="title" class="form-control" placeholder="Enter name">
                    <input v-if="modus=='edit'" style="border: 2px solid green;" @input="changeInLearningOutcome" type="text" id="learningName" v-model="learningName" name="title" class="form-control" placeholder="Enter name">
                </div>
                <div class="form-group col-md-12">
                    <label for="title"> BloomLevel Cognitive </label>
                    <input v-if="modus=='create'" style="border: 2px solid red;" @input="changeInLearningOutcome" type="text" id="learningBloomLevelCognitive" v-model="learningBloomLevelCognitive" name="title" class="form-control" placeholder="Enter BloomLevel Cognitive">
                    <input v-if="modus=='edit'" style="border: 2px solid green;" @input="changeInLearningOutcome" type="text" id="learningBloomLevelCognitive" v-model="learningBloomLevelCognitive" name="title" class="form-control" placeholder="Enter BloomLevel Cognitive">
                </div>
                <div class="form-group col-md-12">
                    <label for="description"> BloomLevel Knowledge </label>
                    <input v-if="modus=='create'" style="border: 2px solid red;" @input="changeInLearningOutcome" type="text" id="learningBloomLevelKnowledge" v-model="learningBloomLevelKnowledge" name="description" class="form-control" placeholder="Enter BloomLevel Knowledge">
                    <input v-if="modus=='edit'" style="border: 2px solid green;" @input="changeInLearningOutcome" type="text" id="learningBloomLevelKnowledge" v-model="learningBloomLevelKnowledge" name="description" class="form-control" placeholder="Enter BloomLevel Knowledge">
                </div>  
                <label for="description"> Learning item(s) </label>
                <div style="display: flex;align-items: center;justify-content: center;">
                <div style="width: 435px; border: 2px solid green; display: flex;align-items: center;justify-content: center;">
                <multiselect
                      v-model="selectedLearningItems"
                      :options="Object.values(dropdownLearningItems)"
                      :maxHeight="180"
                      @input="changeInLearningOutcome"
                      placeholder="Select learning item"
                      style="width: 435px;"
                      :multiple="true"
                ></multiselect></div></div><br>
                <label for="description"> Content Section(s) </label>
                <div style="display: flex;align-items: center;justify-content: center;">
                <div style="width: 435px; border: 2px solid green; display: flex;align-items: center;justify-content: center;">
                <multiselect
                      v-model="selectedContentSections"
                      :options="Object.values(dropdownContentSections)"
                      :maxHeight="180"
                      @input="changeInLearningOutcome"
                      placeholder="Select content section"
                      style="width: 435px;"
                      :multiple="true"
                ></multiselect></div></div><br>
                <label for="description"> Domain Concept(s) </label>
                <div style="display: flex;align-items: center;justify-content: center;">
                <div style="width: 435px; border: 2px solid green; display: flex;align-items: center;justify-content: center;">
                <multiselect 
                      v-model="selectedDomainConcepts"
                      :options="Object.values(dropdownDomainConcepts)"
                      :maxHeight="180"
                      @input="changeInLearningOutcome"
                      placeholder="Select domain concept(s)"
                      style="width: 435px;"
                      :multiple="true"
                ></multiselect></div></div><br><br><br><br>
                <div class="form-group col-md-4 pull-right">
                    <button v-if="modus=='create'" class="btn btn-success" @click="pushLearningOutcome"> Create new learning outcome </button>
                    <button v-if="modus=='edit'" class="btn btn-success" @click="pushLearningOutcome"> Edit learning outcome </button>
                    <button id="cancelButton" class="btn btn-success"  @click="hideLearningOutcomePopup"> Cancel </button>  
                </div>  
        </div>
      </modal>

      <!-- Popup for creating/editing learning item !-->
      <!-- Based on the global variable 'modus' some text/markup will be different: 'create' or 'edit' !-->
        <modal name="create-learningitem"  height="720" style="background: transparent;" @closed="hideLearningItemPopup">
            <div class="col-md-12 form-wrapper" style="text-align: center;">
            <br><h2 v-if="modus=='create'"> Create learning item </h2>
                <h2 v-if="modus=='edit'"> Edit learning item </h2>
                <div class="form-group col-md-12">
                    <label for="title"> Learning item </label>
                    <input v-if="modus=='create'" style="border: 2px solid red;" @input="changeInLearningItem" type="text" id="learningItemName" v-model="learningItemName" name="title" class="form-control" placeholder="Enter name">
                    <input v-if="modus=='edit'" style="border: 2px solid green;" @input="changeInLearningItem" type="text" id="learningItemName" v-model="learningItemName" name="title" class="form-control" placeholder="Enter name">
                </div>
                <div class="form-group col-md-12">
                    <label for="title"> URL </label>
                    <input v-if="modus=='create'" style="border: 2px solid red;" @input="changeInLearningItem" type="text" id="learningItemURL" v-model="learningItemURL" name="title" class="form-control" placeholder="Enter URL">
                    <input v-if="modus=='edit'" style="border: 2px solid green;" @input="changeInLearningItem" type="text" id="learningItemURL" v-model="learningItemURL" name="title" class="form-control" placeholder="Enter URL">
                </div>
                
                <div class="form-group col-md-12">
                    <label for="title"> Is an exercise item? <input @input="changeInLearningItem" type="checkbox" id="checkbox" v-model="learningItemIsExercise"></label>
                </div>
                <div v-if="learningItemIsExercise" class="form-group col-md-12">
                    <label for="description"> Difficulty </label>
                    <input v-if="modus=='create'" style="border: 2px solid red;" @input="changeInLearningItem" type="text" id="learningItemDifficulty" v-model="learningItemDifficulty" name="description" class="form-control" placeholder="Enter difficulty">
                    <input v-if="modus=='edit' && learningItemDifficulty.length > 0" style="border: 2px solid green;" @input="changeInLearningItem" type="text" id="learningItemDifficulty" v-model="learningItemDifficulty" name="description" class="form-control" placeholder="Enter difficulty">
                    <input v-if="modus=='edit' && learningItemDifficulty.length < 1" style="border: 2px solid red;" @input="changeInLearningItem" type="text" id="learningItemDifficulty" v-model="learningItemDifficulty" name="description" class="form-control" placeholder="Enter difficulty">
                </div>  
                <label for="description"> Content Section(s) </label>
                <div style="display: flex;align-items: center;justify-content: center;">
                <div style="width: 435px; border: 2px solid green; display: flex;align-items: center;justify-content: center;">
                <multiselect
                      v-model="selectedContentSections"
                      :options="Object.values(dropdownContentSections)"
                      :maxHeight="180"
                      @input="changeInLearningItem"
                      placeholder="Select content section(s)"
                      style="width: 435px;"
                      :multiple="true"
                ></multiselect></div></div><br>
                <label for="description"> Domain Concept(s) </label>
                <div style="display: flex;align-items: center;justify-content: center;">
                <div style="width: 435px; border: 2px solid green; display: flex;align-items: center;justify-content: center;">
                <multiselect
                      v-model="selectedDomainConcepts"
                      :options="Object.values(dropdownDomainConcepts)"
                      :maxHeight="180"
                      @input="changeInLearningItem"
                      placeholder="Select domain concept(s)"
                      style="width: 435px;"
                      :multiple="true"
                ></multiselect></div></div><br><br><br><br>
                <div class="form-group col-md-4 pull-right">
                    <button v-if="modus=='create'" class="btn btn-success" @click="pushLearningItem"> Create new learning item </button>
                    <button v-if="modus=='edit'" class="btn btn-success" @click="pushLearningItem"> Edit learning item </button>
                    <button id="cancelButton" class="btn btn-success"  @click="hideLearningItemPopup"> Cancel </button>  
                </div>  
        </div>
      </modal>

      <!-- Popup for creating/editing content section !-->
      <!-- Based on the global variable 'modus' some text/markup will be different: 'create' or 'edit' !-->
        <modal name="create-contentsection"  height="480" style="background: transparent;" @closed="hideContentSectionPopup">
            <div class="col-md-12 form-wrapper" style="text-align: center;">
            <br><h2 v-if="modus=='create'"> Create content section </h2>
                <h2 v-if="modus=='edit'"> Edit content section </h2>
                <div class="form-group col-md-12">
                    <label for="title"> Content section </label>
                    <input v-if="modus=='create'" style="border: 2px solid red;" @input="changeInContentSection" type="text" id="contentSectionName" v-model="contentSectionName" name="title" class="form-control" placeholder="Enter name">
                    <input v-if="modus=='edit'" style="border: 2px solid green;" @input="changeInContentSection" type="text" id="contentSectionName" v-model="contentSectionName" name="title" class="form-control" placeholder="Enter name">
                </div>
                <label for="description"> Domain Concept(s) </label>
                
                <div style="display: flex;align-items: center;justify-content: center;">
                <div id="contentsection-dropdown" v-if="selectedDomainConcepts != null" style="width: 435px; border: 2px solid green; display: flex;align-items: center;justify-content: center;">
                  <multiselect 
                      v-model="selectedDomainConcepts"
                      :options="Object.values(dropdownDomainConcepts)"
                      :maxHeight="180"
                      @input="changeInContentSection"
                      placeholder="Select domain concept(s)"
                      style="width: 435px;"
                      :multiple="true"
                ></multiselect></div></div>
                <div style="display: flex;align-items: center;justify-content: center;">
                <div id="contentsection-dropdown" v-if="selectedDomainConcepts == null" style="width: 435px; border: 2px solid red; display: flex;align-items: center;justify-content: center;">
                  <multiselect 
                      v-model="selectedDomainConcepts"
                      :options="Object.values(dropdownDomainConcepts)"
                      :maxHeight="180"
                      @input="changeInContentSection"
                      placeholder="Select domain concept(s)"
                      style="width: 435px;"
                      :multiple="true"
                ></multiselect></div></div><br><br><br><br>
                <div class="form-group col-md-4 pull-right">
                    <button v-if="modus=='create'" class="btn btn-success" @click="pushContentSection"> Create new content section </button>
                    <button v-if="modus=='edit'" class="btn btn-success" @click="pushContentSection"> Edit content section </button>
                    <button id="cancelButton" class="btn btn-success"  @click="hideContentSectionPopup"> Cancel </button>  
                </div>  
        </div>
      </modal>

      <!-- Popup for creating/editing domain concept !-->
      <!-- Based on the global variable 'modus' some text/markup will be different: 'create' or 'edit' !-->
        <modal name="create-domainconcept"  height="200" style="background: transparent;" @closed="hideDomainConceptPopup">
            <div class="col-md-12 form-wrapper" style="text-align: center;">
            <br><h2 v-if="modus=='create'"> Create domain concept </h2>
                <h2 v-if="modus=='edit'"> Edit domain concept </h2>
                <div class="form-group col-md-12">
                    <input v-if="modus=='create'" style="border: 2px solid red;" @input="changeInDomainConcept" type="text" id="domainConceptName" v-model="domainConceptName" name="title" class="form-control" placeholder="Enter name">
                    <input v-if="modus=='edit'" style="border: 2px solid green;" @input="changeInDomainConcept" type="text" id="domainConceptName" v-model="domainConceptName" name="title" class="form-control" placeholder="Enter name">
                </div>
                <div class="form-group col-md-4 pull-right">
                    <button v-if="modus=='create'" class="btn btn-success" @click="pushDomainConcept"> Create new domain concept </button>
                    <button v-if="modus=='edit'" class="btn btn-success" @click="pushDomainConcept"> Edit domain concept </button>
                    <button id="cancelButton" class="btn btn-success"  @click="hideDomainConceptPopup"> Cancel </button>  
                </div>    
          </div>
      </modal>

      <!-- Contains all the buttons in the left-side panel when working in the database !-->
      <div class="sidebar">
        <!-- Button for uploading a database !-->
            <div id="import-export">
                <b href="#">___________</b><br>
                <input type="file" id="input-excel" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"/>
                <!-- When importing a new database, a pop-up will give an alert that the current database will be lost !-->
                <b><p><i @click="importWarning" class="fas fa-file-upload" style="font-size: 40px;"></i></p>Import database</b>
                <b href="#">___________</b><br>
                <!-- Button for exporting, downloading, the current database locally !-->
                <b><p><i @click="exportDatabase" class="fas fa-file-download" style="font-size: 40px;"></i></p>Download database</b>
                <b href="#">___________</b>
            </div>
            <br>
            <!-- Button for deleting the currently selected items in the currently opened table !-->
            <b><p><i @click="deleteSelection" class="fas fa-trash-alt" style="font-size: 40px;"></i></p>Delete selection</b>
            <b href="#">___________</b>
            <div class="create"><br>
                <!-- The create button + the text/function under it which updates based on which table is currently opened!-->
                <b v-if="database=='errortype'" ><p><i @click="newError" class="fas fa-plus-square" style="font-size: 40px;"></i> </p>Create error</b>
                <b v-if="database=='learningoutcome'" ><p><i @click="newLearningOutcome" class="fas fa-plus-square" style="font-size: 40px;"></i> </p>Create learning outcome</b>
                <b v-if="database=='contentsection'" ><p><i @click="newContentSection" class="fas fa-plus-square" style="font-size: 40px;"></i> </p>Create content section</b>
                <b v-if="database=='domainconcept'" ><p><i @click="newDomainConcept" class="fas fa-plus-square" style="font-size: 40px;"></i> </p>Create domain concept</b>
                <b v-if="database=='learningitem'" ><p><i @click="newLearningItem" class="fas fa-plus-square" style="font-size: 40px;"></i> </p>Create learning item</b>
                <b href="#">___________</b>
            </div> 
        </div>
        <div id="core"><br>

      <div>
        <!-- Buttons to change between the tables in the database !-->
        <button id="errortype-database" class="btn btn-success" @click="changeDatabase('errortype')"> Errortypes </button>
        <button id="learningoutcome-database" class="btn btn-success" @click="changeDatabase('learningoutcome')"> Learning Outcomes </button>
        <button id="learningitem-database" class="btn btn-success" @click="changeDatabase('learningitem')"> Learning Items </button>
        <button id="contentsection-database" class="btn btn-success" @click="changeDatabase('contentsection')"> Content Sections </button>
        <button id="domainconcept-database" class="btn btn-success" @click="changeDatabase('domainconcept')"> Domain Concepts </button>
      </div><br>

      <!-- If the currently opened database is null, than no connection is possible with the database server for some reason and a loading circle icon is displayed!-->
      <div class="text-center">
       <div v-if="(errorTypes == null && database=='errortype')
                  || (learningOutcomes == null && database=='learningoutcome')
                  || (contentSections == null && database=='contentsection')
                  || (domainConcepts == null && database=='domainconcept')
                  || (learningItems == null && database=='learningitem')" 
                  style="display: flex;align-items: center;justify-content: center;">
            <circle2></circle2>
        </div>
      </div>

      <!-- The errortype table and its columns -->
      <div v-if="errorTypes != null && database == 'errortype'" class="">
          <table class="table table-bordered">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Select </th>
                <th scope="col">Type of error</th>
                <th scope="col">Weight</th>
                <th scope="col">Description</th>
                <th scope="col">Learning outcome</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="errortype in errorTypes" :key="errortype._id">
                <td>
                  <div class="pretty p-icon p-round p-smooth">
                    <input @input="updateSelected(errortype._id)" type="checkbox" v-bind:id="errortype._id"/>
                    <div class="state p-success" >
                        <i class="icon mdi mdi-check"></i>
                        <label></label>
                    </div>
                  </div>
                </td>
                <td>{{ errortype.name }}</td>
                <td>{{ errortype.weight }}</td>
                <td>{{ errortype.description }}</td>
                <td>{{ learningOutcomeIDToName[errortype.learningOutcome] }}</td>
                <td>
                  <div style="display: flex;align-items: center;justify-content: center;">
                    <div>
                      <button @click="editError(errortype)" class="btn btn-sm btn-outline-secondary">Edit Errortype </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      <!-- The learning outcome table and its columns -->
      <div v-if="learningOutcomes != null && database == 'learningoutcome'" class="">
          <table class="table table-bordered">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Select </th>
                <th scope="col">Learning outcome</th>
                <th scope="col">BloomLevel Cognitive</th>
                <th scope="col">BloomLevel Knowledge</th>
                <th scope="col">Learning Items</th>
                <th scope="col">Content Sections</th>
                <th scope="col">Domain Concepts</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="learningoutcome in learningOutcomes" :key="learningoutcome._id">
                <td>
                  <div class="pretty p-icon p-round p-smooth">
                    <input @input="updateSelected(learningoutcome._id)" type="checkbox" v-bind:id="learningoutcome._id"/>
                    <div class="state p-success" >
                        <i class="icon mdi mdi-check"></i>
                        <label></label>
                    </div>
                  </div>
                </td>
                <td>{{ learningoutcome.name }}</td>
                <td>{{ learningoutcome.BloomLevelCognitive }}</td>
                <td>{{ learningoutcome.BloomLevelKnowledge }}</td>
                <td>{{ multipleLearningItemIDsToString(learningoutcome.LearningItems)}}</td>
                <td>{{ multipleContentSectionIDsToString(learningoutcome.ContentSections)}}</td>
                <td>{{ multipleDomainConceptIDsToString(learningoutcome.DomainConcepts) }}</td>
                <td>
                  <div style="display: flex;align-items: center;justify-content: center;">
                    <div>
                      <button @click="editLearningOutcome(learningoutcome)" class="btn btn-sm btn-outline-secondary">Edit Learning Outcome </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      <!-- The learning item table and its columns -->
      <div v-if="learningItems != null && database == 'learningitem'" class="">
          <table class="table table-bordered">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Select </th>
                <th scope="col">Learning item</th>
                <th scope="col">URL</th>
                <th scope="col">Difficulty</th>
                <th scope="col">Content Sections</th>
                <th scope="col">Domain Concepts</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="learningitem in learningItems" :key="learningitem._id">
                <td>
                  <div class="pretty p-icon p-round p-smooth">
                    <input @input="updateSelected(learningitem._id)" type="checkbox" v-bind:id="learningitem._id"/>
                    <div class="state p-success" >
                        <i class="icon mdi mdi-check"></i>
                        <label></label>
                    </div>
                  </div>
                </td>
                <td>{{ learningitem.name }}</td>
                <td><a v-bind:href="getValidURL(learningitem.url)" class="linkified" target="_blank">{{learningitem.url}}</a></td>
                <td>{{ learningitem.difficulty }}</td>
                <td>{{ multipleContentSectionIDsToString(learningitem.ContentSections) }}</td>
                <td>{{ multipleDomainConceptIDsToString(learningitem.DomainConcepts) }}</td>
                <td>
                  <div style="display: flex;align-items: center;justify-content: center;">
                    <div>
                      <button @click="editLearningItem(learningitem)" class="btn btn-sm btn-outline-secondary">Edit Learning Item </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      <!-- The content section table and its columns -->
      <div v-if="contentSections != null && database == 'contentsection'" class="">
        <table class="table table-bordered">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Select </th>
              <th scope="col">Content section</th>
              <th scope="col">Domain Concepts</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="contentsection in contentSections" :key="contentsection._id">
              <td>
                <div class="pretty p-icon p-round p-smooth">
                  <input @input="updateSelected(contentsection._id)" type="checkbox" v-bind:id="contentsection._id"/>
                  <div class="state p-success" >
                      <i class="icon mdi mdi-check"></i>
                      <label></label>
                  </div>
                </div>
              </td>
              <td>{{ contentsection.name }}</td>
              <td>{{ multipleDomainConceptIDsToString(contentsection.DomainConcepts) }}</td>
              <td>
                <div style="display: flex;align-items: center;justify-content: center;">
                  <div>
                    <button @click="editContentSection(contentsection)" class="btn btn-sm btn-outline-secondary">Edit Content Section </button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        </div>

      <!-- The domain concept table and its columns -->
      <div v-if="domainConcepts != null && database == 'domainconcept'" class="">
          <table class="table table-bordered">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Select </th>
                <th scope="col">Domain Concept</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="domainconcept in domainConcepts" :key="domainconcept._id">
                <td>
                  <div class="pretty p-icon p-round p-smooth">
                    <input @input="updateSelected(domainconcept._id)" type="checkbox" v-bind:id="domainconcept._id"/>
                    <div class="state p-success" >
                        <i class="icon mdi mdi-check"></i>
                        <label></label>
                    </div>
                  </div>
                </td>
                <td>{{ domainconcept.name }}</td>
                <td>
                  <div style="display: flex;align-items: center;justify-content: center;">
                    <div>
                      <button @click="editDomainConcept(domainconcept)" class="btn btn-sm btn-outline-secondary">Edit Domain Concept </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
</template>

<script>
import $ from 'jquery';
import { server } from "../helper";
import axios from "axios";
import alasql from 'alasql';
import XLSX from 'xlsx';
alasql.utils.isBrowserify = false;
alasql.utils.global.XLSX = XLSX;
import {Circle2} from 'vue-loading-spinner'


export default {
  data() {
    return {
      // the global modus can be in "create"/"edit" modus depending on when clicked on "create new X" or "edit X" where X can be any item in any table
      // many html code is based on this variable what kind of markup to display, e.g. in the Errortype popup "Create Errortype" has to be shown instead of 
      // "Edit Errortype" when clicking on Create errortype
      // Also the pushErrortype function for example creates a new errortype when in "create" modus and edits an existing one when in "edit" modus
      modus: "create", 

      // Variables containing whole tables from the data
      errorTypes: null,       // this global variable contains all the currently existing errorTypes in the database
      learningOutcomes: null, // this global variable contains all the currently existing learningOutcomes in the database
      learningItems: null,    // this global variable contains all the currently existing learningItems in the database
      contentSections: null,  // this global variable contains all the currently existing contentSections in the database
      domainConcepts: null,   // this global variable contains all the currently existing domainConcepts in the database
      
      // Errortype variables, needed when creating/editing an ErrorType item in a pop-up
      // These are linked with the inputfields in this pop-up
      errorName: "",
      errorWeight: "",
      errorDescription: "",
      errorID: null,
      selectedLearningOutcome: null, // The variable which the multiselect will fill while choosing a learning outcome from a create/edit pop-up

      // Learning outcome variables, needed when creating/editing a LearningOutcome item in a pop-up
      // These are linked with the inputfields in this pop-up
      learningName: "",
      learningBloomLevelCognitive: "",
      learningBloomLevelKnowledge: "",
      learningID: null,
      // The variable which the multiselect will fill while choosing a domain concept from a create/edit pop-up
      selectedDomainConcepts: null, // used in this pop-ups: contentSection, LearningItem, LearningOutcome
      selectedLearningItems: null,  // The variable which the multiselect will fill while choosing learning items from a create/edit pop-up

      // Learning item variables, needed when creating/editing a LearningItem item in a pop-up
      // These are linked with the inputfields in this pop-up
      learningItemName: "",
      learningItemURL: "",
      learningItemIsExercise: false,
      learningItemDifficulty: "",
      learningItemID: null,
      // The variable which the multiselect will fill while choosing a content section from a create/edit pop-up
      selectedContentSections: null, // used in this pop-ups: LearningItem, LearningOutcome

      // Content section variables, needed when creating/editing a ContentSection item in a pop-up
      // These are linked with the inputfields in this pop-up
      contentSectionName: "",
      contentSectionID: null,

      // Domain concept variables, needed when creating/editing a DomainConcept item in a pop-up
      // These are linked with the inputfields in this pop-up
      domainConceptName: "",
      domainConceptID: null,

      // Variables needed for maintaining different dropdowns items when creating/editing in a pop-up
      dropdownErrorTypes: {}, // The list of strings as shown in the dropdown when selecting ErrorTypes
      sortedErrorTypeIDs: [], // to find the ID of the ErrorTypes with the index in dropdownErrorTypes
      errorTypeIDToName: {},  // Needed for converting ID's of the ErrorTypes ID's to their names 

      dropdownLearningOutcomes: {}, // The list of strings as shown in the dropdown when selecting learning outcomes
      sortedOutcomeIDs: [],         // to find the ID of the learningoutcome with the index in dropdownLearningOutcomes
      learningOutcomeIDToName: {},  // Needed for converting ID's of the learning outcome ID's to their names 

      dropdownDomainConcepts: {}, // The list of strings as shown in the dropdown when selecting domain concepts
      sortedDomainConceptIDs: [], // to find the ID of the domain concept with the index in dropdownDomainConcepts
      domainConceptIDToName: {},  // Needed for converting ID's of the domain concept ID's to their names 

      dropdownContentSections: {}, // The list of strings as shown in the dropdown when selecting content sections
      sortedContentSectionIDs: [], // to find the ID of the content section with the index in dropdownContentSections
      contentSectionIDToName: {},  // Needed for converting ID's of the content section ID's to their names

      dropdownLearningItems: {}, // The list of strings as shown in the dropdown when selecting learning items
      sortedLearningItemIDs: [], // to find the ID of the learning item with the index in dropdownLearningItems
      learningItemIDToName: {},  // Needed for converting ID's of the learning items ID's to their names

      selected: new Set(),   // this global variable is a set of all the currently selected items (to delete) in the currently opened table
      faultMessage: "empty", // this global string variable is linked in the 'fault-popup' pop-up and contains the current text to be displayed in the pop-up, it is changed accordingly the fault just before opening the pop-up 
      database: "errortype", // this global string variable contains which table currently is viewed. It is changed whenever button is clicked to open another table
    };
  },
  components: {
    Circle2
  },
  mounted(){
    $('#input-excel').hide()
    var vm = this;
    $('#input-excel').change(function(e){vm.importDatabase(e)}); // Add function to import the database when clicking on the import button
    this.changeDatabase('errortype'); // The standard first opened database is 'errortype'
  },
  created() {
    // Fetch all the data the first time
    this.fetchDomainConcepts();
    this.fetchContentSections();
    this.fetchLearningItems();
    this.fetchLearningOutcomes();
    this.fetchErrorTypes();
  },
  methods: {
    // This function will change for example google.com or www.google.com to https://google.com or https://www.google.com
    getValidURL(url){
      var prefix = 'http://';
      var prefix2 = 'https://';
      if ((url.substr(0, prefix.length) !== prefix) && (url.substr(0, prefix.length) !== prefix2)){
          url = prefix + url;
      }
      return url;
    },
    // This function gets as input some specific Domain Concepts their ID's in a list and converts the ID's to one string which will be shown in the tables
    multipleDomainConceptIDsToString(domainConcepts){
      var tableString = ""
      for(var i = 0; i < domainConcepts.length; i++){
        tableString += this.domainConceptIDToName[domainConcepts[i]] + ", "
      }
      return tableString.slice(0, tableString.length-2);
    },
    // This function gets as input some specific Content Sections their ID's in a list and converts the ID's to one string which will be shown in the tables
    multipleContentSectionIDsToString(contentSections){
      var tableString = ""
      for(var i = 0; i < contentSections.length; i++){
        tableString += this.contentSectionIDToName[contentSections[i]] + ", "
      }
      return tableString.slice(0, tableString.length-2);
    },
    // This function gets as input some specific Learning Items their ID's in a list and converts the ID's to one string which will be shown in the tables
    multipleLearningItemIDsToString(learningItems){
      var tableString = ""
      for(var i = 0; i < learningItems.length; i++){
        tableString += this.learningItemIDToName[learningItems[i]] + ", "
      }
      return tableString.slice(0, tableString.length-2);
    },
    // This function makes the warning visible when clicking on the button to import a database
    importWarning(){
      this.$modal.show('warning-popup');
    },
    // This function is called when one of the buttons is clicked to change to a different database
    changeDatabase(database){
      // Delete all the current tables and fetch all the tables again
      this.errorTypes = null;
      this.learningOutcomes = null;
      this.domainConcepts = null;
      this.contentSections = null;
      this.learningItems = null;
      this.fetchDomainConcepts();
      this.fetchContentSections();
      this.fetchLearningItems();
      this.fetchLearningOutcomes();
      this.fetchErrorTypes();

      // Change which database currently is opened
      this.database = database;

      // Change the colours of the buttons to show which database is opened
      this.selected = new Set();
      $('#errortype-database').get(0).setAttribute("style", "background-color: #2c3e50;");
      $('#learningoutcome-database').get(0).setAttribute("style", "background-color: #2c3e50;");
      $('#learningitem-database').get(0).setAttribute("style", "background-color: #2c3e50;");
      $('#domainconcept-database').get(0).setAttribute("style", "background-color: #2c3e50;");
      $('#contentsection-database').get(0).setAttribute("style", "background-color: #2c3e50;");
      $('#'+database+'-database').get(0).setAttribute("style", "background-color: green;");

    },
    // This function will delete all the currently selected items in the currently opened table IF possible and when no relationship requirements are violated
    deleteSelection(){
      var selection = Array.from(this.selected)

      if(this.database == "domainconcept"){ // This code will be executed when deleting Domain Concepts
        // First check if no Content Section will be left with zero Domain Concepts, since the relation is one to many. 
        var safeToDelete = true;
        for(var i = 0; i < this.contentSections.length; i++){
          var currentDomainConcepts = [...this.contentSections[i].DomainConcepts];
          var oldLength = currentDomainConcepts.length;
          for (var j = 0; j < selection.length; j++){
            var index = currentDomainConcepts.indexOf(selection[j]);
            if (index > -1) {
              currentDomainConcepts.splice(index, 1);
            }
          }
          if(currentDomainConcepts.length == 0 && oldLength != 0){
            // If there exists a Content Section from which its length is zero after deleting the Domain Concepts and its original length was not zero, it's not safe to delete
            // And none of the selected Domain Concepts will be deleted
            safeToDelete = false;
          }
        }
        if(!safeToDelete){ // If it's not safe to delete: show a pop-up which contains the error message
          this.faultMessage = "The delete command is not executed.\nThe selection contains a combination of domain concepts that will cause a Content Section having zero domain concepts."
          this.$modal.show('fault-popup');
        }
        else{ 
          // If it's safe to delete: delete the selected Domain Concepts in all the Content Sections/Learning Items/Learning Outcomes having those Domain Concepts
          this.deleteDomainConceptsInContentSections(selection);
          this.deleteDomainConceptsInLearningItems(selection);
          this.deleteDomainConceptsInLearningOutcomes(selection);
          
          // And afterwards delete all the selected Domain Concepts
          for (j = 0; j < selection.length; j++){
            this.deleteID(selection[j], "domainconcept");
          }
        }
      }
      else if(this.database == "contentsection"){ // This code will be executed when deleting Content Sections
        // First delete the Content Sections in all the Learning Items/Learning Outcomes having those Content Sections
        this.deleteContentSectionsInLearningItems(selection);
        this.deleteContentSectionsInLearningOutcomes(selection);

        // Then delete all the selected Content Sections
        for (j = 0; j < selection.length; j++){
          this.deleteID(selection[j], "contentsection");
        }
      }
      else if(this.database == "learningitem"){ // This code will be executed when deleting Learning Items
        // First delete the Learning Items in all the Learning Outcomes having those Learning Items
        this.deleteLearningItemsInLearningOutcomes(selection);
        // Then delete all the selected Learning Items
        for (j = 0; j < selection.length; j++){
          this.deleteID(selection[j], "learningitem");
        }
      }
      else if(this.database == "learningoutcome"){ // This code will be executed when deleting Learning Outcomes
        // First delete the Learning Outcomes in all the ErrorTypes having those Learning Outcomes
        this.deleteLearningOutcomesInErrorTypes(selection);
        // Then delete all the selected Learning Outcomes
        for (j = 0; j < selection.length; j++){
          this.deleteID(selection[j], "learningoutcome");
        }
      }
      else if(this.database == "errortype"){ // This code will be executed when deleting Error Types
        // Delete all the selected Error Types
        for (j = 0; j < selection.length; j++){
          this.deleteID(selection[j], "errortype");
        }
      }
    },
    // This function updates the selectionbuttons in the tables of the database from true to false or vice versa when clicked
    updateSelected(checkbox_id){
      if($('#'+checkbox_id).get(0).checked){
        this.selected.add(checkbox_id);
      }
      else{
        this.selected.delete(checkbox_id);
      }
    },
    // When the button to create a new errortype is clicked, the modus will change to "create" and the correct pop-up will be shown
    newError(){
      this.modus = "create";
      this.$modal.show('create-errortype');
    },
    // When the button to create a new learning outcome is clicked, the modus will change to "create" and the correct pop-up will be shown
    newLearningOutcome(){
      this.modus = "create";
      this.$modal.show('create-learningoutcome');
    },
    // When the button to create a new learning item is clicked, the modus will change to "create" and the correct pop-up will be shown
    newLearningItem(){
      this.modus = "create";
      this.$modal.show('create-learningitem');
    },
    // When the button to create a new content section is clicked, the modus will change to "create" and the correct pop-up will be shown
    newContentSection(){
      this.modus = "create";
      this.$modal.show('create-contentsection');
    },
    // When the button to create a new domain concept is clicked, the modus will change to "create" and the correct pop-up will be shown
    newDomainConcept(){
      this.modus = "create";
      this.$modal.show('create-domainconcept');
    },
    // When the button to edit an errortype is clicked, the modus will change to "edit" and the correct pop-up will be shown
    editError(errortype){
      // Fill in the linked inputfields with the information of the selected item
      this.modus = "edit";
      this.errorName = errortype.name;
      this.errorWeight = errortype.weight;
      this.errorDescription = errortype.description;
      this.selectedLearningOutcome = this.learningOutcomeIDToName[errortype.learningOutcome];
      this.errorID = errortype._id;
      // Show the pop-up with the filled in fields
      this.$modal.show('create-errortype');
    },
    // When the button to edit a learning outcome is clicked, the modus will change to "edit" and the correct pop-up will be shown
    editLearningOutcome(outcome){
      // Fill in the linked inputfields with the information of the selected item
      this.modus = "edit";
      this.learningName = outcome.name;
      this.learningBloomLevelCognitive = outcome.BloomLevelCognitive;
      this.learningBloomLevelKnowledge = outcome.BloomLevelKnowledge;
      this.learningID = outcome._id;
      this.selectedDomainConcepts = [];
      for(var i = 0; i < outcome.DomainConcepts.length; i++){
        this.selectedDomainConcepts.push(this.dropdownDomainConcepts[outcome.DomainConcepts[i]]);
      }
      this.selectedContentSections = [];
      for(i = 0; i < outcome.ContentSections.length; i++){
        this.selectedContentSections.push(this.dropdownContentSections[outcome.ContentSections[i]]);
      }
      this.selectedLearningItems = [];
      for(i = 0; i < outcome.LearningItems.length; i++){
        this.selectedLearningItems.push(this.dropdownLearningItems[outcome.LearningItems[i]]);
      }
      // Show the pop-up with the filled in fields
      this.$modal.show('create-learningoutcome');
    },
    // When the button to edit a learning item is clicked, the modus will change to "edit" and the correct pop-up will be shown
    editLearningItem(learningitem){
      // Fill in the linked inputfields with the information of the selected item
      this.modus = "edit";
      this.learningItemName = learningitem.name;
      this.learningItemURL = learningitem.url;
      this.learningItemIsExercise = learningitem.isExerciseItem;
      this.learningItemDifficulty = learningitem.difficulty;
      this.selectedContentSections = [];
      for(var i = 0; i < learningitem.ContentSections.length; i++){
        this.selectedContentSections.push(this.dropdownContentSections[learningitem.ContentSections[i]]);
      }
      this.selectedDomainConcepts = [];
      for(i = 0; i < learningitem.DomainConcepts.length; i++){
        this.selectedDomainConcepts.push(this.dropdownDomainConcepts[learningitem.DomainConcepts[i]]);
      }
      this.learningItemID = learningitem._id;
      // Show the pop-up with the filled in fields
      this.$modal.show('create-learningitem');
    },
    // When the button to edit a content section is clicked, the modus will change to "edit" and the correct pop-up will be shown
    editContentSection(contentsection){
      // Fill in the linked inputfields with the information of the selected item
      this.modus = "edit";
      this.contentSectionName = contentsection.name;
      this.contentSectionID = contentsection._id;
      this.selectedDomainConcepts = [];
      for(var i = 0; i < contentsection.DomainConcepts.length; i++){
        this.selectedDomainConcepts.push(this.dropdownDomainConcepts[contentsection.DomainConcepts[i]]);
      }
      this.$modal.show('create-contentsection');
    },
    // When the button to edit a domain concept is clicked, the modus will change to "edit" and the correct pop-up will be shown
    editDomainConcept(domainconcept){
      // Fill in the linked inputfields with the information of the selected item
      this.modus = "edit";
      this.domainConceptName = domainconcept.name;
      this.domainConceptID = domainconcept._id;
      // Show the pop-up with the filled in fields
      this.$modal.show('create-domainconcept');
    },
    // Hides the general warning pop-up
    hideImportWarning(){
      this.$modal.hide('warning-popup');
    },
    // Hide the pop-up for creating/editing ErrorTypes
    hideErrorTypePopup(){
      // Make the linked inputfields empty for the next time when the pop-up occurs and set modus back to "create"
      this.modus = "create";
      this.errorName = "";
      this.errorWeight = "";
      this.errorDescription = "";
      this.selectedLearningOutcome = null;
      this.errorID = null;
      // Hide the pop-up
      this.$modal.hide('create-errortype');     
    },
    // Hide the pop-up for creating/editing Learning Outcomes
    hideLearningOutcomePopup(){
      // Make the linked inputfields empty for the next time when the pop-up occurs and set modus back to "create"
      this.modus = "create";
      this.learningName = "",
      this.learningBloomLevelCognitive = "",
      this.learningBloomLevelKnowledge = "",
      this.learningID = null,
      this.selectedDomainConcepts = null,
      this.selectedLearningItems = null,
      this.selectedContentSections = null,
      // Hide the pop-up
      this.$modal.hide('create-learningoutcome');
    },
    // Hide the pop-up for creating/editing Learning Items
    hideLearningItemPopup(){
      // Make the linked inputfields empty for the next time when the pop-up occurs and set modus back to "create"
      this.modus = "create";
      this.learningItemName = "";
      this.learningItemURL = "";
      this.learningItemIsExercise = false;
      this.learningItemDifficulty = "";
      this.selectedContentSections = null; 
      this.selectedDomainConcepts = null; 
      this.learningItemID = null;
      // Hide the pop-up
      this.$modal.hide('create-learningitem');
    },
    // Hide the pop-up for creating/editing Content Sections
    hideContentSectionPopup(){
      // Make the linked inputfields empty for the next time when the pop-up occurs and set modus back to "create"
      this.modus = "create";
      this.contentSectionName = "",
      this.contentSectionID = null,
      this.selectedDomainConcepts = null,
      // Hide the pop-up
      this.$modal.hide('create-contentsection');
    },
    // Hide the pop-up for creating/editing Domain Concepts
    hideDomainConceptPopup(){
      // Make the linked inputfields empty for the next time when the pop-up occurs and set modus back to "create"
      this.modus = "create";
      this.domainConceptName = "",
      this.domainConceptID = null,
      // Hide the pop-up
      this.$modal.hide('create-domainconcept');
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
    // Creates a new ErrorType, or edits the existing one in the database when all the filled in attributes are valid and hide the pop-up
    pushErrorType(){
      if(this.areAttributesValid(['description','name','weight','dropdown'])){
        var currentLearningOutcome = "";
        if(this.selectedLearningOutcome != null){
          currentLearningOutcome = this.sortedOutcomeIDs[Number(this.selectedLearningOutcome.slice(0,this.selectedLearningOutcome.indexOf(':')))-1];
        }
          let errorTypeData = {
              name: this.errorName,
              weight: this.errorWeight,
              description: this.errorDescription,
              learningOutcome: currentLearningOutcome,
          };
          this.__submitErrorTypeToServer(errorTypeData);   
          this.hideErrorTypePopup();
      }
    },
    // Creates a new Learning Outcome, or edits the existing one in the database when all the filled in attributes are valid and hide the pop-up
    pushLearningOutcome(){
      if(this.areAttributesValid(['learningName','learningBloomLevelCognitive','learningBloomLevelKnowledge'])){
          var newDomainConcepts = [];
          if(this.selectedDomainConcepts != null){
            for(var i = 0; i < this.selectedDomainConcepts.length;i++){
              newDomainConcepts.push(this.sortedDomainConceptIDs[Number(this.selectedDomainConcepts[i].slice(0,this.selectedDomainConcepts[i].indexOf(':')))-1]);
            }
          }
          var newContentSections = [];
          if(this.selectedContentSections != null){
            for(i = 0; i < this.selectedContentSections.length;i++){
              newContentSections.push(this.sortedContentSectionIDs[Number(this.selectedContentSections[i].slice(0,this.selectedContentSections[i].indexOf(':')))-1]);
            }
          }
          var currentLearningItems = [];
          if(this.selectedLearningItems != null){
            for(i = 0; i < this.selectedLearningItems.length;i++){
              currentLearningItems.push(this.sortedLearningItemIDs[Number(this.selectedLearningItems[i].slice(0,this.selectedLearningItems[i].indexOf(':')))-1]);
            }
          }
          let learningOutcomeData = {
              name: this.learningName,
              BloomLevelCognitive: this.learningBloomLevelCognitive,
              BloomLevelKnowledge: this.learningBloomLevelKnowledge,
              DomainConcepts: newDomainConcepts,
              ContentSections: newContentSections,
              LearningItems: currentLearningItems,
          };
          this.__submitLearningOutcomeToServer(learningOutcomeData);   
          this.hideLearningOutcomePopup();
      }
    },
    // Creates a new Learning Item, or edits the existing one in the database when all the filled in attributes are valid and hide the pop-up
    pushLearningItem(){
      if((this.learningItemIsExercise && this.areAttributesValid(['learningItemName','learningItemURL','learningItemDifficulty']))
          || (!this.learningItemIsExercise && this.areAttributesValid(['learningItemName','learningItemURL']))){
        var newDomainConcepts = [];
        if(this.selectedDomainConcepts != null){
          for(var i = 0; i < this.selectedDomainConcepts.length;i++){
            newDomainConcepts.push(this.sortedDomainConceptIDs[Number(this.selectedDomainConcepts[i].slice(0,this.selectedDomainConcepts[i].indexOf(':')))-1]);
          }
        }
        var newContentSections = [];
        if(this.selectedContentSections != null){
          for(i = 0; i < this.selectedContentSections.length;i++){
            newContentSections.push(this.sortedContentSectionIDs[Number(this.selectedContentSections[i].slice(0,this.selectedContentSections[i].indexOf(':')))-1]);
          }
        }
        if(!this.learningItemIsExercise){
          this.learningItemDifficulty = "";
        }
        let learningItemData = {
            name: this.learningItemName,
            url: this.learningItemURL,
            ContentSections: newContentSections,
            DomainConcepts: newDomainConcepts,
            isExerciseItem: this.learningItemIsExercise,
            difficulty: this.learningItemDifficulty,

          };
          this.__submitLearningItemToServer(learningItemData);   
          this.hideLearningItemPopup();
      }
    },
    // Creates a new Content Section, or edits the existing one in the database when all the filled in attributes are valid and hide the pop-up
    pushContentSection(){
      if(this.areAttributesValid(['contentSectionName','contentsection-dropdown'])){
            var newDomainConcepts = [];
            if(this.selectedDomainConcepts != null){
              for(var i = 0; i < this.selectedDomainConcepts.length;i++){
                newDomainConcepts.push(this.sortedDomainConceptIDs[Number(this.selectedDomainConcepts[i].slice(0,this.selectedDomainConcepts[i].indexOf(':')))-1]);
              }
            }
            let contentSectionData = {
              name: this.contentSectionName,
              DomainConcepts: newDomainConcepts,
            };
            this.__submitContentSectionToServer(contentSectionData);   
            this.hideContentSectionPopup();
          }
    },
    // Creates a new Domain Concept, or edits the existing one in the database when all the filled in attributes are valid and hide the pop-up
    pushDomainConcept(){
      if(this.areAttributesValid(['domainConceptName'])){
          let domainConceptData = {
              name: this.domainConceptName,
          };
          this.__submitDomainConceptToServer(domainConceptData);   
          this.hideDomainConceptPopup();
      }
    },
    // Submit the new or edited ErrorType to the database based on the modus (create/edit)
    __submitErrorTypeToServer(data) {
      var context = this;
      if(this.modus == "create"){
        axios.post(`${server.baseURL}/errortype/create`, data)
        .then(function(){
            context.fetchErrorTypes();
        });
      }
      else if(this.modus == "edit"){
        axios.put(`${server.baseURL}/errortype/update?errorTypeID=${this.errorID}`,data)
        .then(function(){
            context.fetchErrorTypes();
        });
      }
    },
    // Submit the new or edited Learning Outcome to the database based on the modus (create/edit)
    __submitLearningOutcomeToServer(data) {
      var context = this;
      if(this.modus == "create"){
        axios.post(`${server.baseURL}/learningoutcome/create`, data)
        .then(function(){
            context.fetchLearningOutcomes();
        });
      }
      else if(this.modus == "edit"){
        axios.put(`${server.baseURL}/learningoutcome/update?learningOutcomeID=${this.learningID}`,data)
        .then(function(){
            context.fetchLearningOutcomes();
        });
      }
    },
    // Submit the new or edited Learning Item to the database based on the modus (create/edit)
    __submitLearningItemToServer(data){
      var context = this;
      if(this.modus == "create"){
        axios.post(`${server.baseURL}/learningitem/create`, data)
        .then(function(){
            context.fetchLearningItems();
        });
      }
      else if(this.modus == "edit"){
        axios.put(`${server.baseURL}/learningitem/update?learningItemID=${this.learningItemID}`,data)
        .then(function(){
            context.fetchLearningItems();
        });
      }
    },
    // Submit the new or edited Content Section to the database based on the modus (create/edit)
    __submitContentSectionToServer(data){
      var context = this;
      if(this.modus == "create"){
        axios.post(`${server.baseURL}/contentsection/create`, data)
        .then(function(){
            context.fetchContentSections();
        });
      }
      else if(this.modus == "edit"){
        axios.put(`${server.baseURL}/contentsection/update?contentSectionID=${this.contentSectionID}`,data)
        .then(function(){
            context.fetchContentSections();
        });
      }
    },
    // Submit the new or edited Domain Concept to the database based on the modus (create/edit)
    __submitDomainConceptToServer(data) {
      var context = this;
      if(this.modus == "create"){
        axios.post(`${server.baseURL}/domainconcept/create`, data)
        .then(function(){
            context.fetchDomainConcepts();
        });
      }
      else if(this.modus == "edit"){
        axios.put(`${server.baseURL}/domainconcept/update?domainConceptID=${this.domainConceptID}`,data)
        .then(function(){
            context.fetchDomainConcepts();
        });
      }
    },
    // The given attribute gets a green border when at least one symbol is filled in, otherwise a red border
    atLeastOneSymbol(item){ 
      if($('#'+item).get(0).value.length < 1){
          $('#'+item).get(0).setAttribute("style", "border: 2px solid red;");}
      else{
          $('#'+item).get(0).setAttribute("style", "border: 2px solid green;");
      }
    },
    // When a change is made in an inputfield in the pop-up during the creation/editing of an ErrorType, 
    // change the borders of the inputfields to red or green depending on if they're invalid or valid
    changeInErrorType(){
      this.atLeastOneSymbol('name');
      this.atLeastOneSymbol('description');

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
    // When a change is made in an inputfield in the pop-up during the creation/editing of an Learning Outcome, 
    // change the borders of the inputfields to red or green depending on if they're invalid or valid
    changeInLearningOutcome(){
      this.atLeastOneSymbol('learningName');
      this.atLeastOneSymbol('learningBloomLevelCognitive');
      this.atLeastOneSymbol('learningBloomLevelKnowledge');
    },
    // When a change is made in an inputfield in the pop-up during the creation/editing of an Learning Item, 
    // change the borders of the inputfields to red or green depending on if they're invalid or valid
    changeInLearningItem(){
      this.atLeastOneSymbol('learningItemName');
      this.atLeastOneSymbol('learningItemURL');
      if(this.learningItemIsExercise){
        this.atLeastOneSymbol('learningItemDifficulty');
      }
    },
    // When a change is made in an inputfield in the pop-up during the creation/editing of an Content Section, 
    // change the borders of the inputfields to red or green depending on if they're invalid or valid
    changeInContentSection(){
      this.atLeastOneSymbol('contentSectionName');
      // the dropdown of domain concepts gets a green border when at least one domainconcept is chosen, otherwise a red border
      if(this.selectedDomainConcepts == null || this.selectedDomainConcepts.length == 0){
          $('#contentsection-dropdown').get(0).setAttribute("style", "border: 2px solid red;");}
      else{
          $('#contentsection-dropdown').get(0).setAttribute("style", "border: 2px solid green;");
      }
    },
    // When a change is made in an inputfield in the pop-up during the creation/editing of an Domain Concept, 
    // change the borders of the inputfields to red or green depending on if they're invalid or valid
    changeInDomainConcept(){
      this.atLeastOneSymbol('domainConceptName');
    },
    // Fetch the ErrorTypes from the database and put them in the according global variable
    fetchErrorTypes() {
      axios
        .get(`${server.baseURL}/errortype/errortypes`)
        .then(data => (this.updateNewErrorTypes(this, data.data)));
    },
    // Fetch the Learning Outcomes from the database and update the variables containing Learning Outcome information 
    fetchLearningOutcomes() {
      axios
        .get(`${server.baseURL}/learningoutcome/learningoutcomes`)
        .then(data => (this.updateNewLearningOutcomes(this, data.data)));
    },
    // Fetch the Learning Items from the database and update the variables containing Learning Item information 
    fetchLearningItems(){
      axios
        .get(`${server.baseURL}/learningitem/learningitems`)
        .then(data => (this.updateNewLearningItems(this, data.data)));
    },
    // Fetch the Content Sections from the database and update the variables containing Content Section information 
    fetchContentSections(){
      axios
        .get(`${server.baseURL}/contentsection/contentsections`)
        .then(data => (this.updateNewContentSections(this, data.data)));
    },
    // Fetch the Domain Concepts from the database and update the variables containing Domain Concept information 
    fetchDomainConcepts(){
      axios
        .get(`${server.baseURL}/domainconcept/domainconcepts`)
        .then(data => (this.updateNewDomainConcepts(this, data.data)));
    },
    // This function updates all the error types in 'errorTypes'
    // + makes a dictionary 'dropdownErrorTypes' that links the ID's with the name in stringform (accompanied by an index in front of the name) of all the error types -> these indexes + names in stringform are visible in the dropdowns
    // + makes a list 'sortedErrorTypeIDs' of the ID's in the same order as the strings as presented in the dropdowns
    // + makes a dictionary 'errorTypeIDToName' that links the name of the error types WITH the index in front of it to the correct ID
    updateNewErrorTypes(context, data){
      context.dropdownErrorTypes = {};
      context.sortedErrorTypeIDs = [];
      context.errorTypeIDToName = {};
      context.errorTypes = data;
      var i
      for (i = 0; i < context.errorTypes.length; i++) {
          context.dropdownErrorTypes[context.errorTypes[i]._id] = String(i+1) + ": " + String(context.errorTypes[i].name);
          context.errorTypeIDToName[context.errorTypes[i]._id] = context.errorTypes[i].name;
          context.sortedErrorTypeIDs.push(context.errorTypes[i]._id);
      }
    },
    // This function updates all the learning outcomes in 'learningOutcomes'
    // + makes a dictionary 'dropdownLearningOutcomes' that links the ID's with the name in stringform (accompanied by an index in front of the name) of all the learning Outcomes -> these indexes + names in stringform are visible in the dropdowns
    // + makes a list 'sortedOutcomeIDs' of the ID's in the same order as the strings as presented in the dropdowns
    // + makes a dictionary 'learningOutcomeIDToName' that links the name of the learning Outcomes WITH the index in front of it to the correct ID
    updateNewLearningOutcomes(context, data){
      context.dropdownLearningOutcomes = {};
      context.sortedOutcomeIDs = [];
      context.learningOutcomeIDToName = {};
      context.learningOutcomes = data;
      var i
      for (i = 0; i < context.learningOutcomes.length; i++) {
          context.dropdownLearningOutcomes[context.learningOutcomes[i]._id] = String(i+1) + ": " + String(context.learningOutcomes[i].name);
          context.learningOutcomeIDToName[context.learningOutcomes[i]._id] = context.learningOutcomes[i].name;
          context.sortedOutcomeIDs.push(context.learningOutcomes[i]._id);
      }
    },
    // This function updates all the learning items in 'learningItems'
    // + makes a dictionary 'dropdownLearningItems' that links the ID's with the name in stringform (accompanied by an index in front of the name) of all the learning items -> these indexes + names in stringform are visible in the dropdowns
    // + makes a list 'sortedLearningItemIDs' of the ID's in the same order as the strings as presented in the dropdowns
    // + makes a dictionary 'learningItemIDToName' that links the name of the learning items WITH the index in front of it to the correct ID
    updateNewLearningItems(context, data){
      context.dropdownLearningItems = {};
      context.sortedLearningItemIDs = [];
      context.learningItemIDToName = {};
      context.learningItems = data;
      var i
      for (i = 0; i < context.learningItems.length; i++) {
          context.dropdownLearningItems[context.learningItems[i]._id] = String(i+1) + ": " + String(context.learningItems[i].name);
          context.learningItemIDToName[context.learningItems[i]._id] = context.learningItems[i].name;
          context.sortedLearningItemIDs.push(context.learningItems[i]._id);
      }
    },
    // This function updates all the content sections in 'contentSections'
    // + makes a dictionary 'dropdownContentSections' that links the ID's with the name in stringform (accompanied by an index in front of the name) of all the content sections -> these indexes + names in stringform are visible in the dropdowns
    // + makes a list 'sortedContentSectionIDs' of the ID's in the same order as the strings as presented in the dropdowns
    // + makes a dictionary 'contentSectionIDToName' that links the name of the content sections WITH the index in front of it to the correct ID
    updateNewContentSections(context, data){
      context.dropdownContentSections = {};
      context.sortedContentSectionIDs = [];
      context.contentSectionIDToName = {};
      context.contentSections = data;
      var i
      for (i = 0; i < context.contentSections.length; i++) {
          context.dropdownContentSections[context.contentSections[i]._id] = String(i+1) + ": " + String(context.contentSections[i].name);
          context.contentSectionIDToName[context.contentSections[i]._id] = context.contentSections[i].name;
          context.sortedContentSectionIDs.push(context.contentSections[i]._id);
      }
      
    },
    // This function updates all the domain concepts in 'domainConcepts'
    // + makes a dictionary 'dropdownDomainConcepts' that links the ID's with the name in stringform (accompanied by an index in front of the name) of all the domain concepts -> these indexes + names in stringform are visible in the dropdowns
    // + makes a list 'sortedDomainConceptIDs' of the ID's in the same order as the strings as presented in the dropdowns
    // + makes a dictionary 'domainConceptIDToName' that links the name of the domain concepts WITH the index in front of it to the correct ID
    updateNewDomainConcepts(context, data){
      context.dropdownDomainConcepts = {};
      context.sortedDomainConceptIDs = [];
      context.domainConceptIDToName = {};
      context.domainConcepts = data;
      var i;
      for (i = 0; i < context.domainConcepts.length; i++) {
          context.dropdownDomainConcepts[context.domainConcepts[i]._id] = String(i+1) + ": " + String(context.domainConcepts[i].name);
          context.domainConceptIDToName[context.domainConcepts[i]._id] = context.domainConcepts[i].name;
          context.sortedDomainConceptIDs.push(context.domainConcepts[i]._id);
      }
    },
    // This function deletes an item in the database based on a given ID and in which table it belongs 
    // Next it updates the variable from which the item was deleted from the updated database by fetching the new information
    deleteID(id, db) {
      var context = this;
      if(db == 'errortype'){
        axios
          .delete(`${server.baseURL}/errortype/delete?errorTypeID=${id}`)
          .then(function(){
              context.fetchErrorTypes();
          });
      }
      else if(db == 'learningoutcome'){
        axios
          .delete(`${server.baseURL}/learningoutcome/delete?learningOutcomeID=${id}`)
          .then(function(){
              context.fetchLearningOutcomes();
          });
      }
      else if(db == 'learningitem'){
        axios
          .delete(`${server.baseURL}/learningitem/delete?learningItemID=${id}`)
          .then(function(){
              context.fetchLearningItems();
          });
      }
      else if(db == 'contentsection'){
        axios
          .delete(`${server.baseURL}/contentsection/delete?contentSectionID=${id}`)
          .then(function(){
              context.fetchContentSections();
          });
      }
      else if(db == 'domainconcept'){
        axios
          .delete(`${server.baseURL}/domainconcept/delete?domainConceptID=${id}`)
          .then(function(){
              context.fetchDomainConcepts();
          });
      }
    },
    // This function calculates the intersection between 2 given sets
    intersection(setA, setB) {
      var _intersection = new Set();
      for (var elem of setB) {
          if (setA.has(elem)) {
              _intersection.add(elem);
          }
      }
      return _intersection;
    },
    // This function calculates the difference between 2 given sets
    difference(setA, setB) {
      var _difference = new Set(setA);
      for (var elem of setB) {
          _difference.delete(elem);
      }
      return _difference;
    },
    // This function deletes a list of IDs of learning outcomes in all the Error Types if they contain those learning outcomes
    // Then it fetches the new error types from the database
    deleteLearningOutcomeInErrorTypes(ids){
      var id = null;
      for(var m = 0; m < ids.length; m++){
        id = ids[m];
        for(var i = 0; i < this.errorTypes.length; i++){
          if(this.errorTypes[i].learningOutcome == id){
            let errorTypeData = {
                learningOutcome: null,
            };
            var context = this;
            axios.put(`${server.baseURL}/errortype/update?errorTypeID=${this.errorTypes[i]._id}`,errorTypeData)
            .then(function(){
                context.fetchErrorTypes();
            });
          }
        }
      }
    },
    // This function deletes a list of IDs of domain concepts in all the Content Sections if they contain those domain concepts
    // Then it fetches the new content sections from the database
    deleteDomainConceptsInContentSections(ids){
      var overlap;
      for(var i = 0; i < this.contentSections.length; i++){
        var currentDomainConceptIds = new Set(this.contentSections[i].DomainConcepts);
        var intersection = this.intersection(new Set(ids), currentDomainConceptIds);
        overlap = Array.from(intersection).length > 0;
        if(overlap){
          var newDomainConcepts = Array.from(this.difference(currentDomainConceptIds, intersection));
          let data = {
            DomainConcepts: newDomainConcepts,
          };
          var context = this;
          axios.put(`${server.baseURL}/contentsection/update?contentSectionID=${this.contentSections[i]._id}`, data)
          .then(function(){
              context.fetchContentSections();
          });
        }
      }
    },
    // This function deletes a list of IDs of domain concepts in all the learning items if they contain those domain concepts
    // Then it fetches the new learning items from the database
    deleteDomainConceptsInLearningItems(ids){
      var overlap;
      for(var i = 0; i < this.learningItems.length; i++){
        var currentDomainConceptIds = new Set(this.learningItems[i].DomainConcepts);
        var intersection = this.intersection(new Set(ids), currentDomainConceptIds);
        overlap = Array.from(intersection).length > 0;
        if(overlap){
          var newDomainConcepts = Array.from(this.difference(currentDomainConceptIds, intersection));
          let data = {
            DomainConcepts: newDomainConcepts,
          };
          var context = this;
          axios.put(`${server.baseURL}/learningitem/update?learningItemID=${this.learningItems[i]._id}`, data)
          .then(function(){
              context.fetchLearningItems();
          });
        }
      }
    },
    // This function deletes a list of IDs of domain concepts in all the learning outcomes if they contain those domain concepts
    // Then it fetches the new learning outcomes from the database
    deleteDomainConceptsInLearningOutcomes(ids){
      var overlap;
      for(var i = 0; i < this.learningOutcomes.length; i++){
        var currentDomainConceptIds = new Set(this.learningOutcomes[i].DomainConcepts);
        var intersection = this.intersection(new Set(ids), currentDomainConceptIds);
        overlap = Array.from(intersection).length > 0;
        if(overlap){
          var newDomainConcepts = Array.from(this.difference(currentDomainConceptIds, intersection));
          let data = {
            DomainConcepts: newDomainConcepts,
          };
          var context = this;
          axios.put(`${server.baseURL}/learningoutcome/update?learningOutcomeID=${this.learningOutcomes[i]._id}`, data)
          .then(function(){
              context.fetchLearningOutcomes();
          });
        }
      }
    },
    // This function deletes a list of IDs of content sections in all the learning items if they contain those content sections
    // Then it fetches the new learning items from the database
    deleteContentSectionsInLearningItems(ids){
      var idSet = new Set(ids);
      for(var i = 0; i < this.learningItems.length; i++){
        var currentContentSections = new Set(this.learningItems[i].ContentSections);
        var difference = new Set([...currentContentSections].filter(x => !idSet.has(x)));
        let learningItemData = {
            ContentSections: Array.from(difference),
          };
          var context = this;
          axios.put(`${server.baseURL}/learningitem/update?learningItemID=${this.learningItems[i]._id}`,learningItemData)
          .then(function(){
              context.fetchLearningItems();
          }); 
      }
    },
    // This function deletes a list of IDs of content sections in all the learning outcomes if they contain those content sections
    // Then it fetches the new learning outcomes from the database
    deleteContentSectionsInLearningOutcomes(ids){
      var idSet = new Set(ids);
      for(var i = 0; i < this.learningOutcomes.length; i++){
        var currentContentSections = new Set(this.learningOutcomes[i].ContentSections);
        var difference = new Set([...currentContentSections].filter(x => !idSet.has(x)));
        let data = {
            ContentSections: Array.from(difference),
          };
          var context = this;
          axios.put(`${server.baseURL}/learningoutcome/update?learningOutcomeID=${this.learningOutcomes[i]._id}`,data)
          .then(function(){
              context.fetchLearningOutcomes();
          }); 
      }
    },
    // This function deletes a list of IDs of learning items in all the learning outcomes if they contain those learning items
    // Then it fetches the new learning outcomes from the database
    deleteLearningItemsInLearningOutcomes(ids){
      var idSet = new Set(ids);
      for(var i = 0; i < this.learningOutcomes.length; i++){
        var currentLearningItems = new Set(this.learningOutcomes[i].LearningItems);
        var difference = new Set([...currentLearningItems].filter(x => !idSet.has(x)));
        let data = {
            LearningItems: Array.from(difference),
          };
          var context = this;
          axios.put(`${server.baseURL}/learningoutcome/update?learningOutcomeID=${this.learningOutcomes[i]._id}`,data)
          .then(function(){
              context.fetchLearningOutcomes();
          }); 
      }
    },
    // This function deletes a list of IDs of learning outcomes in all the error types if they contain those learning outcomes
    // Then it fetches the new error types from the database
    deleteLearningOutcomesInErrorTypes(ids){
      for(var i = 0; i < this.errorTypes.length; i++){
        var currentErrorType = this.errorTypes[i];
        for(var j = 0; j < ids.length; j++){
          if(currentErrorType.learningOutcome == ids[j]){
            let data = {
              learningOutcome: "",
            };
            var context = this;
            axios.put(`${server.baseURL}/errortype/update?errorTypeID=${currentErrorType._id}`,data)
            .then(function(){
                context.fetchErrorTypes();
            });
          }
        }
      }
    },
    // This function exports the database in a XLSX Excel file 
    // Normally, no errors in the database should be possible, so the export should always succeed
    exportDatabase(){
      var domainconcepts = [];
      var contentsections = [];
      var learningitems = [];
      var learningoutcomes = [];
      var errortypes = [];

      // Creating the different sheets in the excel file
      var opts = [{sheetid:'ERROR TYPES',header:true},
                  {sheetid:'LEARNING OUTCOMES',header:true},
                  {sheetid:'LEARNING ITEMS',header:true},
                  {sheetid:'CONTENT SECTIONS',header:true},
                  {sheetid:'DOMAIN CONCEPTS',header:true}];
                  
      // Start filling in the different sheets

      for(var i = 0; i < this.domainConcepts.length; i++){
        domainconcepts.push({
          "ID": this.domainConcepts[i]._id,
          "DOMAIN CONCEPT": this.domainConcepts[i].name,
        });
      }
      for(i = 0; i < this.contentSections.length; i++){
        contentsections.push({
          "ID": this.contentSections[i]._id,
          "CONTENT SECTION": this.contentSections[i].name,
          "DOMAIN CONCEPT IDS": this.contentSections[i].DomainConcepts,
        });
      }
      for(i = 0; i < this.learningItems.length; i++){
        learningitems.push({
          "ID": this.learningItems[i]._id,
          "LEARNING ITEM": this.learningItems[i].name,
          "URL": this.learningItems[i].url,
          "EXERCISE ITEM": String(this.learningItems[i].isExerciseItem),
          "DIFFICULTY": this.learningItems[i].difficulty,
          "CONTENT SECTION IDS": this.learningItems[i].ContentSections,
          "DOMAIN CONCEPT IDS": this.learningItems[i].DomainConcepts,
        });
      }
      for(i = 0; i < this.learningOutcomes.length; i++){
        learningoutcomes.push({
          "ID": this.learningOutcomes[i]._id,
          "LEARNING OUTCOME": this.learningOutcomes[i].name,
          'BLOOMLEVEL COGNITIVE': this.learningOutcomes[i].BloomLevelCognitive,
          "BLOOMLEVEL KNOWLEDGE": this.learningOutcomes[i].BloomLevelKnowledge,
          "LEARNING ITEM IDS": this.learningOutcomes[i].LearningItems,
          "CONTENT SECTION IDS": this.learningOutcomes[i].ContentSections,
          "DOMAIN CONCEPT IDS": this.learningOutcomes[i].DomainConcepts,
        });
      }
      for(i = 0; i < this.errorTypes.length; i++){
        errortypes.push({
          "ID": this.errorTypes[i]._id,
          "ERROR TYPE": this.errorTypes[i].name,
          'WEIGHT': this.errorTypes[i].weight,
          "DESCRIPTION": this.errorTypes[i].description,
          "LEARNING OUTCOME ID": this.errorTypes[i].learningOutcome,
        });
      }

      // Add this to every sheet should there be no row in a specific table to avoid an error when creating the excel file
      // (no sheet can be empty)
      errortypes.push({"": "",});
      learningoutcomes.push({"": "",});
      learningitems.push({"": "",});
      contentsections.push({"": "",});
      domainconcepts.push({"": "",});

      // Download the database
      alasql('SELECT INTO XLSX("database.xlsx",?) FROM ?',[opts,[errortypes, learningoutcomes, learningitems, contentsections, domainconcepts]]);
    },
    // When the user clicks to import a new database during the warning pop-up that previous data will be lost, a new window will pop-up to browse for the file
    triggerUpload(){
      this.$modal.hide('warning-popup');
      $('#input-excel').trigger('click');
    },
    // This function will try to import a new database and delete the old one if the new database does not contain errors
    importDatabase(e){
      // Preparing to read the file
      var reader = new FileReader();
      var vm = this;
      reader.readAsArrayBuffer(e.target.files[0]);
      reader.onload = function() {     
        var data = new Uint8Array(reader.result);
        var wb = XLSX.read(data,{type:'array'});
        // Check if no faults/errors occur in the to be imported database
        if(vm.isImportReady(wb)){
          var i;

          // Delete all items in all the tables
          for(i = 0; i < vm.errorTypes.length; i++){vm.deleteID(vm.errorTypes[i]._id, "errortype");}
          for(i = 0; i < vm.learningOutcomes.length; i++){vm.deleteID(vm.learningOutcomes[i]._id, "learningoutcome");}
          for(i = 0; i < vm.learningItems.length; i++){vm.deleteID(vm.learningItems[i]._id, "learningitem");}
          for(i = 0; i < vm.contentSections.length; i++){vm.deleteID(vm.contentSections[i]._id, "contentsection");}
          for(i = 0; i < vm.domainConcepts.length; i++){vm.deleteID(vm.domainConcepts[i]._id, "domainconcept");}

          // Fetch the readed data in separate lists
          var readedData = vm.isImportReady(wb);
          var errortypes = readedData[1];
          var learningoutcomes = readedData[2];
          var learningitems = readedData[3];
          var contentsections = readedData[4];
          var domainconcepts = readedData[5];

          // Recursively import the different tables, starting with the tables that don't contain ID's of other tables. (Domain Concepts)
          // this function will call the importfunction of the next table to import after all new IDs are known
          vm.importDomainConcepts([...domainconcepts], [domainconcepts,contentsections,learningitems,learningoutcomes,errortypes]);
        }
      }
    },
    // This function looks for errors in the possible new database that the user is trying to upload
    isImportReady(wb){
      // Check if all the sheets are present in the excel file
      if(wb.SheetNames.indexOf("ERROR TYPES") < 0){ this.faultMessage = "No sheet named 'ERROR TYPES' found!"; this.$modal.show('fault-popup'); return false;}
      if(wb.SheetNames.indexOf("LEARNING OUTCOMES") < 0){ this.faultMessage = "No sheet named 'LEARNING OUTCOMES' found!"; this.$modal.show('fault-popup'); return false;}
      if(wb.SheetNames.indexOf("LEARNING ITEMS") < 0){ this.faultMessage = "No sheet named 'LEARNING ITEMS' found!"; this.$modal.show('fault-popup'); return false;}
      if(wb.SheetNames.indexOf("CONTENT SECTIONS") < 0){ this.faultMessage = "No sheet named 'CONTENT SECTIONS' found!"; this.$modal.show('fault-popup'); return false;}
      if(wb.SheetNames.indexOf("DOMAIN CONCEPTS") < 0){ this.faultMessage = "No sheet named 'DOMAIN CONCEPTS' found!"; this.$modal.show('fault-popup'); return false;}
      
      // Empty lists, ready to be populated
      var domainconcepts = [];
      var contentsections = [];
      var learningitems = [];
      var learningoutcomes = [];
      var errortypes = [];
      
      // Check if all the values are valid in every domain concept
      var sheet = wb.Sheets["DOMAIN CONCEPTS"];
      var index = 1;
      while(!this.isUndefinedOrEmpty(sheet[XLSX.utils.encode_cell({c:0, r:index})])){
        if(this.isUndefinedOrEmpty(sheet[XLSX.utils.encode_cell({c:1, r:index})])){this.faultMessage = "There is no NAME in sheet 'DOMAIN CONCEPTS' in cell "+ XLSX.utils.encode_cell({c:1, r:index}) +"!"; this.$modal.show('fault-popup'); return false;}
        let data = {
          _id: sheet[XLSX.utils.encode_cell({c:0, r:index})].v,
          name: sheet[XLSX.utils.encode_cell({c:1, r:index})].v,
        }
        domainconcepts.push(data);
        index += 1;
      }

      // Check if all the values are valid in every content section
      sheet = wb.Sheets["CONTENT SECTIONS"];
      index = 1;
      while(!this.isUndefinedOrEmpty(sheet[XLSX.utils.encode_cell({c:0, r:index})])){
        if(this.isUndefinedOrEmpty(sheet[XLSX.utils.encode_cell({c:1, r:index})])){this.faultMessage = "There is no NAME in sheet 'CONTENT SECTIONS' in cell "+ XLSX.utils.encode_cell({c:1, r:index}) +"!"; this.$modal.show('fault-popup'); return false;}
        if(this.isUndefinedOrEmpty(sheet[XLSX.utils.encode_cell({c:2, r:index})])){this.faultMessage = "There has to be at least one DOMAIN CONCEPT ID in sheet 'CONTENT SECTIONS' in cell "+ XLSX.utils.encode_cell({c:2, r:index}) +"!"; this.$modal.show('fault-popup'); return false;}
        let data = {
          _id: sheet[XLSX.utils.encode_cell({c:0, r:index})].v,
          name: sheet[XLSX.utils.encode_cell({c:1, r:index})].v,
          DomainConcepts: sheet[XLSX.utils.encode_cell({c:2, r:index})].v,
        }
        contentsections.push(data);
        index += 1;
      }

      // Check if all the values are valid in every learning item
      sheet = wb.Sheets["LEARNING ITEMS"];
      index = 1;
      while(!this.isUndefinedOrEmpty(sheet[XLSX.utils.encode_cell({c:0, r:index})])){
        if(this.isUndefinedOrEmpty(sheet[XLSX.utils.encode_cell({c:1, r:index})])){this.faultMessage = "There is no NAME in sheet 'LEARNING ITEMS' in cell "+ XLSX.utils.encode_cell({c:1, r:index}) +"!"; this.$modal.show('fault-popup'); return false;}
        if(this.isUndefinedOrEmpty(sheet[XLSX.utils.encode_cell({c:2, r:index})])){this.faultMessage = "There is no URL in sheet 'LEARNING ITEMS' in cell "+ XLSX.utils.encode_cell({c:2, r:index}) +"!"; this.$modal.show('fault-popup'); return false;}
        if(this.isUndefinedOrEmpty(sheet[XLSX.utils.encode_cell({c:3, r:index})])
           || ['true','false'].indexOf(sheet[XLSX.utils.encode_cell({c:3, r:index})].v) < 0){this.faultMessage = "The value of EXERCISE ITEM in sheet 'LEARNING ITEMS' has to be 'true' or 'false' in cell "+ XLSX.utils.encode_cell({c:3, r:index}) +"!"; this.$modal.show('fault-popup'); return false;}
        if(sheet[XLSX.utils.encode_cell({c:3, r:index})].v == 'true' 
           && this.isUndefinedOrEmpty(sheet[XLSX.utils.encode_cell({c:4, r:index})])){this.faultMessage = "In sheet 'LEARNING ITEMS', the DIFFICULTY cell can't be empty in cell "+ XLSX.utils.encode_cell({c:4, r:index}) +" when EXERCISE ITEM is 'true'!"; this.$modal.show('fault-popup'); return false;}
        var currentDifficulty = "";
        if(sheet[XLSX.utils.encode_cell({c:3, r:index})].v == 'true'){
          currentDifficulty = sheet[XLSX.utils.encode_cell({c:4, r:index})].v;
        } 
        var currentContentSections = "";
        var currentDomainConcepts = "";
        if(!this.isUndefinedOrEmpty(sheet[XLSX.utils.encode_cell({c:5, r:index})])){
          currentContentSections = sheet[XLSX.utils.encode_cell({c:5, r:index})].v;
        }
        if(!this.isUndefinedOrEmpty(sheet[XLSX.utils.encode_cell({c:6, r:index})])){
          currentDomainConcepts = sheet[XLSX.utils.encode_cell({c:6, r:index})].v;
        }
        let data = {
          _id: sheet[XLSX.utils.encode_cell({c:0, r:index})].v,
          name: sheet[XLSX.utils.encode_cell({c:1, r:index})].v,
          url: sheet[XLSX.utils.encode_cell({c:2, r:index})].v,
          isExerciseItem: sheet[XLSX.utils.encode_cell({c:3, r:index})].v,
          difficulty: currentDifficulty,
          ContentSections: currentContentSections,
          DomainConcepts: currentDomainConcepts,
        }
        learningitems.push(data);
        index += 1;
      }

      // Check if all the values are valid in every learning outcome
      sheet = wb.Sheets["LEARNING OUTCOMES"];
      index = 1;
      while(!this.isUndefinedOrEmpty(sheet[XLSX.utils.encode_cell({c:0, r:index})])){
        if(this.isUndefinedOrEmpty(sheet[XLSX.utils.encode_cell({c:1, r:index})])){this.faultMessage = "There is no NAME in sheet 'LEARNING OUTCOMES' in cell "+ XLSX.utils.encode_cell({c:1, r:index}) +"!"; this.$modal.show('fault-popup'); return false;}
        if(this.isUndefinedOrEmpty(sheet[XLSX.utils.encode_cell({c:2, r:index})])){this.faultMessage = "There is no BLOOMLEVEL COGNITIVE in sheet 'LEARNING OUTCOMES' in cell "+ XLSX.utils.encode_cell({c:2, r:index}) +"!"; this.$modal.show('fault-popup'); return false;}
        if(this.isUndefinedOrEmpty(sheet[XLSX.utils.encode_cell({c:3, r:index})])){this.faultMessage = "There is no BLOOMLEVEL KNOWLEDGE in sheet 'LEARNING OUTCOMES' in cell "+ XLSX.utils.encode_cell({c:3, r:index}) +"!"; this.$modal.show('fault-popup'); return false;}
        var currentLearningItems = "";
        currentContentSections = "";
        currentDomainConcepts = "";
        if(!this.isUndefinedOrEmpty(sheet[XLSX.utils.encode_cell({c:4, r:index})])){
          currentLearningItems = sheet[XLSX.utils.encode_cell({c:4, r:index})].v;
        }
        if(!this.isUndefinedOrEmpty(sheet[XLSX.utils.encode_cell({c:5, r:index})])){
          currentContentSections = sheet[XLSX.utils.encode_cell({c:5, r:index})].v;
        }
        if(!this.isUndefinedOrEmpty(sheet[XLSX.utils.encode_cell({c:6, r:index})])){
          currentDomainConcepts = sheet[XLSX.utils.encode_cell({c:6, r:index})].v;
        }
        let data = {
          _id: sheet[XLSX.utils.encode_cell({c:0, r:index})].v,
          name: sheet[XLSX.utils.encode_cell({c:1, r:index})].v,
          BloomLevelCognitive: sheet[XLSX.utils.encode_cell({c:2, r:index})].v,
          BloomLevelKnowledge: sheet[XLSX.utils.encode_cell({c:3, r:index})].v,
          LearningItems: currentLearningItems,
          ContentSections: currentContentSections,
          DomainConcepts: currentDomainConcepts,
        }
        learningoutcomes.push(data);
        index += 1;
      }

      // Check if all the values are valid in every error type
      sheet = wb.Sheets["ERROR TYPES"];
      index = 1;
      while(!this.isUndefinedOrEmpty(sheet[XLSX.utils.encode_cell({c:0, r:index})])){
        if(this.isUndefinedOrEmpty(sheet[XLSX.utils.encode_cell({c:1, r:index})])){this.faultMessage = "There is no NAME in sheet 'ERROR TYPES' in cell "+ XLSX.utils.encode_cell({c:1, r:index}) +"!"; this.$modal.show('fault-popup'); return false;}
        if(this.isUndefinedOrEmpty(sheet[XLSX.utils.encode_cell({c:2, r:index})])){this.faultMessage = "There is no WEIGHT in sheet 'ERROR TYPES' in cell "+ XLSX.utils.encode_cell({c:2, r:index}) +"!"; this.$modal.show('fault-popup'); return false;}
        var numbers = new Set("01234567890");
        var weight = sheet[XLSX.utils.encode_cell({c:2, r:index})].v;
        var onlyNumbers = true;
        for(var j = 0; j < weight.length; j++){
            if(!numbers.has(weight[j])){
                onlyNumbers = false;
            }
        }
        if(!onlyNumbers){this.faultMessage = "The WEIGHT in sheet 'ERROR TYPES' in cell "+ XLSX.utils.encode_cell({c:2, r:index}) +" can only contain numbers!"; this.$modal.show('fault-popup'); return false;}
        if(this.isUndefinedOrEmpty(sheet[XLSX.utils.encode_cell({c:3, r:index})])){this.faultMessage = "There is no DESCRIPTION in sheet 'ERROR TYPES' in cell "+ XLSX.utils.encode_cell({c:3, r:index}) +"!"; this.$modal.show('fault-popup'); return false;}
        var currentLearningOutcome = "";
        if(!this.isUndefinedOrEmpty(sheet[XLSX.utils.encode_cell({c:4, r:index})])){
          currentLearningOutcome = sheet[XLSX.utils.encode_cell({c:4, r:index})].v;
        }
        if(currentLearningOutcome.indexOf(',') > -1){this.faultMessage = "There can't be more than one LEARNING OUTCOME in sheet 'ERROR TYPES' in cell "+ XLSX.utils.encode_cell({c:4, r:index}) +"! So no commas are allowed to separate multiple IDs."; this.$modal.show('fault-popup'); return false;}
        let data = {
          _id: sheet[XLSX.utils.encode_cell({c:0, r:index})].v,
          name: sheet[XLSX.utils.encode_cell({c:1, r:index})].v,
          weight: sheet[XLSX.utils.encode_cell({c:2, r:index})].v,
          description: sheet[XLSX.utils.encode_cell({c:3, r:index})].v,
          learningOutcome: currentLearningOutcome,
        }
        errortypes.push(data);
        index += 1;
      }

      // Check if all IDs are unique
      var allIDs = [];
      var domainconceptIDs = [];
      var contentsectionIDs = [];
      var learningitemIDs = [];
      var learningoutcomeIDs = [];
      var errortypeIDs = [];
      for (var i = 0; i < domainconcepts.length; i++){allIDs.push(domainconcepts[i]._id); domainconceptIDs.push(domainconcepts[i]._id)}
      for (i = 0; i < contentsections.length; i++){allIDs.push(contentsections[i]._id);   contentsectionIDs.push(contentsections[i]._id)}
      for (i = 0; i < learningitems.length; i++){allIDs.push(learningitems[i]._id);       learningitemIDs.push(learningitems[i]._id)}
      for (i = 0; i < learningoutcomes.length; i++){allIDs.push(learningoutcomes[i]._id); learningoutcomeIDs.push(learningoutcomes[i]._id)}
      for (i = 0; i < errortypes.length; i++){allIDs.push(errortypes[i]._id);             errortypeIDs.push(errortypes[i]._id)}
      var setAllIDs = new Set(allIDs);
      if(allIDs.length != Array.from(setAllIDs).length){this.faultMessage = "Not every ID is unique in the database!"; this.$modal.show('fault-popup'); return false;}

      // Check if all the used IDs link to the correct type of items
      for (i = 0; i < contentsections.length; i++){
        currentDomainConcepts = contentsections[i].DomainConcepts.split(",");
        for(j = 0; j < currentDomainConcepts.length; j++){
          if(domainconceptIDs.indexOf(currentDomainConcepts[j]) < 0 && currentDomainConcepts[j].length > 0){this.faultMessage = "A CONTENT SECTION exists with an invalid ID of a DOMAIN CONCEPT! The invalid ID = '" + currentDomainConcepts[j] + "'"; this.$modal.show('fault-popup'); return false;}
        }
      }
      for (i = 0; i < learningitems.length; i++){
        currentDomainConcepts = learningitems[i].DomainConcepts.split(",");
        for(j = 0; j < currentDomainConcepts.length; j++){
          if(domainconceptIDs.indexOf(currentDomainConcepts[j]) < 0 && currentDomainConcepts[j].length > 0){this.faultMessage = "A LEARNING ITEM exists with an invalid ID of a DOMAIN CONCEPT! The invalid ID = '" + currentDomainConcepts[j] + "'"; this.$modal.show('fault-popup'); return false;}
        }
        currentContentSections = learningitems[i].ContentSections.split(",");
        for(j = 0; j < currentContentSections.length; j++){
          if(contentsectionIDs.indexOf(currentContentSections[j]) < 0 && currentContentSections[j].length > 0){this.faultMessage = "A LEARNING ITEM exists with an invalid ID of a CONTENT SECTION! The invalid ID = '" + currentContentSections[j] + "'"; this.$modal.show('fault-popup'); return false;}
        }
      }
      for (i = 0; i < learningoutcomes.length; i++){
        currentDomainConcepts = learningoutcomes[i].DomainConcepts.split(",");
        for(j = 0; j < currentDomainConcepts.length; j++){
          if(domainconceptIDs.indexOf(currentDomainConcepts[j]) < 0 && currentDomainConcepts[j].length > 0){this.faultMessage = "A LEARNING OUTCOME exists with an invalid ID of a DOMAIN CONCEPT! The invalid ID = '" + currentDomainConcepts[j] + "'"; this.$modal.show('fault-popup'); return false;}
        }
        currentContentSections = learningoutcomes[i].ContentSections.split(",");
        for(j = 0; j < currentContentSections.length; j++){
          if(contentsectionIDs.indexOf(currentContentSections[j]) < 0 && currentContentSections[j].length > 0){this.faultMessage = "A LEARNING OUTCOME exists with an invalid ID of a CONTENT SECTION! The invalid ID = '" + currentContentSections[j] + "'"; this.$modal.show('fault-popup'); return false;}
        }
        currentLearningItems = learningoutcomes[i].LearningItems.split(",");
        for(j = 0; j < currentLearningItems.length; j++){
          if(learningitemIDs.indexOf(currentLearningItems[j]) < 0 && currentLearningItems[j].length > 0){this.faultMessage = "A LEARNING OUTCOME exists with an invalid ID of a LEARNING ITEM! The invalid ID = '" + currentLearningItems[j] + "'"; this.$modal.show('fault-popup'); return false;}
        }
      }
      for (i = 0; i < errortypes.length; i++){
        if(errortypes[i].learningOutcome.length > 0 && learningoutcomeIDs.indexOf(errortypes[i].learningOutcome) < 0){this.faultMessage = "An ERROR TYPE exists with an invalid ID of a LEARNING OUTCOME! The invalid ID = '" + errortypes[i].learningOutcome + "'"; this.$modal.show('fault-popup'); return false;}
      }
      return [true, errortypes, learningoutcomes, learningitems, contentsections, domainconcepts];
    },
    // This function gets the old objects and their IDs from the uploaded excel file and the new objects with their new IDs that are already pushed (imported) to the database
    // it returns a dictionary that links the old IDs with the new IDs ( the new IDs are created after pushing them to the database)
    createOldIDtoNew(oldObjects, newObjects){
      var oldIDToNew = {};
      for(var i = 0; i < oldObjects.length; i++){
        oldIDToNew[oldObjects[i]._id] = newObjects[i]._id;
      }
      return oldIDToNew;
    },
    // This function replaces the reference of old IDs to DomainConcepts to their new IDs in a data object to be imported (could be content sections/learning items/learning outcomes)
    updateDomainSectionIDs(data, oldDomainConceptIDsToNew){
      var currentDomainConcepts = data.DomainConcepts.split(",");
      var newDomainConcepts = [];
      for(var i = 0; i < currentDomainConcepts.length; i++){
        if(currentDomainConcepts[i].length > 0){
          newDomainConcepts.push(oldDomainConceptIDsToNew[currentDomainConcepts[i]]);
        }
      }
      return newDomainConcepts;
    },
    // This function replaces the reference of old IDs to ContentSecions to their new IDs in a data object to be imported (could be learning items/learning outcomes)
    updateContentSectionIDs(data, oldContentSectionIDsToNew){
      var currentContentSections = data.ContentSections.split(",");
      var newContentSections = [];
      for(var i = 0; i < currentContentSections.length; i++){
        if(currentContentSections[i].length > 0){
          newContentSections.push(oldContentSectionIDsToNew[currentContentSections[i]]);
        }
      }
      return newContentSections;
    },
    // This function replaces the reference of old IDs to Learning items to their new IDs in a data object to be imported (learning outcomes)
    updateLearningItemIDs(data, oldLearningItemIDsToNew){
      var currentLearningItems = data.LearningItems.split(",");
      var newLearningItems = [];
      for(var i = 0; i < currentLearningItems.length; i++){
        if(currentLearningItems[i].length > 0){
          newLearningItems.push(oldLearningItemIDsToNew[currentLearningItems[i]]);
        }
      }
      return newLearningItems;
    },
    // This function recursively takes a domain concept from the excel file, and pushes it to the database
    // After alle the domain concepts are pushed to the database, a dictionary can be made linking the old IDs to the new ones of this table
    // And next the function is called to import the content sections
    importDomainConcepts(list, all_data){
      var context = this;
      var first = list.shift();
      var data = {...first};
      delete data._id;
      if(list.length > 0){
        axios.post(`${server.baseURL}/domainconcept/create`, data)
        .then(function(){
          context.importDomainConcepts(list, all_data);
        });   
      }
      else{
        axios.post(`${server.baseURL}/domainconcept/create`, data)
        .then(function(){
          axios
          .get(`${server.baseURL}/domainconcept/domainconcepts`)
          .then(data => (context.updateNewDomainConcepts(context, data.data),
                         context.importContentSections([...all_data[1]], context.createOldIDtoNew(all_data[0], context.domainConcepts), all_data)));
        }); 
      }
    },
    // This function recursively takes a content section from the excel file, replaces the old ID references to other objects with new IDs, and pushes it to the database
    // After alle the content sections are pushed to the database, a dictionary can be made linking the old IDs to the new ones of this table
    // And next the function is called to import the learning items
    importContentSections(list, oldDomainConceptIDsToNew, all_data){
      var context = this;
      var first = list.shift();
      var data = {...first};
      delete data._id;
      data.DomainConcepts = context.updateDomainSectionIDs(data, oldDomainConceptIDsToNew);
      if(list.length > 0){
        axios.post(`${server.baseURL}/contentsection/create`, data)
        .then(function(){
          context.importContentSections(list, oldDomainConceptIDsToNew, all_data);
        });   
      }
      else{
        axios.post(`${server.baseURL}/contentsection/create`, data)
        .then(function(){
          axios
          .get(`${server.baseURL}/contentsection/contentsections`)
          .then(data => (context.updateNewContentSections(context, data.data),
                         context.importLearningItems([...all_data[2]], oldDomainConceptIDsToNew, context.createOldIDtoNew(all_data[1], context.contentSections), all_data)));
        }); 
      }
    },
    // This function recursively takes a learning item from the excel file, replaces the old ID references to other objects with new IDs, and pushes it to the database
    // After alle the learning items are pushed to the database, a dictionary can be made linking the old IDs to the new ones of this table
    // And next the function is called to import the learning outcomes
    importLearningItems(list, oldDomainConceptIDsToNew, oldContentSectionIDsToNew, all_data){
      var context = this;
      var first = list.shift();
      var data = {...first};
      delete data._id;
      data.DomainConcepts = context.updateDomainSectionIDs(data, oldDomainConceptIDsToNew);
      data.ContentSections = context.updateContentSectionIDs(data, oldContentSectionIDsToNew);
      if(list.length > 0){
        axios.post(`${server.baseURL}/learningitem/create`, data)
        .then(function(){
          context.importLearningItems(list, oldDomainConceptIDsToNew, oldContentSectionIDsToNew, all_data);
        });   
      }
      else{
        axios.post(`${server.baseURL}/learningitem/create`, data)
        .then(function(){
          axios
          .get(`${server.baseURL}/learningitem/learningitems`)
          .then(data => (context.updateNewLearningItems(context, data.data),
                         context.importLearningOutcomes([...all_data[3]], oldDomainConceptIDsToNew, oldContentSectionIDsToNew, context.createOldIDtoNew(all_data[2], context.learningItems), all_data)));
        }); 
      }
    },
    // This function recursively takes a learning outcome from the excel file, replaces the old ID references to other objects with new IDs, and pushes it to the database
    // After alle the learning outcomes are pushed to the database, a dictionary can be made linking the old IDs to the new ones of this table
    // And next the function is called to import the error types
    importLearningOutcomes(list, oldDomainConceptIDsToNew, oldContentSectionIDsToNew, oldLearningItemIDsToNew, all_data){
      var context = this;
      var first = list.shift();
      var data = {...first};
      delete data._id;
      data.DomainConcepts = context.updateDomainSectionIDs(data, oldDomainConceptIDsToNew);
      data.ContentSections = context.updateContentSectionIDs(data, oldContentSectionIDsToNew);
      data.LearningItems = context.updateLearningItemIDs(data, oldLearningItemIDsToNew);
      if(list.length > 0){
        axios.post(`${server.baseURL}/learningoutcome/create`, data)
        .then(function(){
          context.importLearningOutcomes(list, oldDomainConceptIDsToNew, oldContentSectionIDsToNew, oldLearningItemIDsToNew, all_data);
        });   
      }
      else{
        axios.post(`${server.baseURL}/learningoutcome/create`, data)
        .then(function(){
          axios
          .get(`${server.baseURL}/learningoutcome/learningoutcomes`)
          .then(data => (context.updateNewLearningOutcomes(context, data.data),
                         context.importErrorTypes([...all_data[4]], context.createOldIDtoNew(all_data[3], context.learningOutcomes), all_data)));
        }); 
      }
    },
    // This function recursively takes an error type from the excel file, replaces the old ID references to other objects with new IDs, and pushes it to the database
    // After alle the error types are pushed to the database it updates the current Error Types
    // When this function finishes, the new database is imported
    importErrorTypes(list, oldLearningOutcomeIDsToNew, all_data){
      var context = this;
      var first = list.shift();
      var data = {...first};
      delete data._id;
      if(data.learningOutcome.length > 0){
        data.learningOutcome = oldLearningOutcomeIDsToNew[data.learningOutcome];  
      }
      if(list.length > 0){
        axios.post(`${server.baseURL}/errortype/create`, data)
        .then(function(){
          context.importErrorTypes(list, oldLearningOutcomeIDsToNew, all_data);
        });   
      }
      else{
        axios.post(`${server.baseURL}/errortype/create`, data)
        .then(function(){
          axios
          .get(`${server.baseURL}/errortype/errortypes`)
          .then(data => (context.updateNewErrorTypes(context, data.data)));
        }); 
      }
    },
    // Checks if given variable is undefined or empty
    isUndefinedOrEmpty(x){
      if(x == undefined || x.v.length < 1){ return true;}
      else{ return false;}
    },
  }
};
</script>

<style>
/*This section contains some styles for some specific buttons*/
  #core{
    margin-left: 160px;
  }
  #cancelButton{
        position: absolute;
        top: 0px; left: 380px;
  }
  #errortype-database{
    margin-right: 10px;
    margin-left: 10px;
  }
  #learningoutcome-database{
    margin-right: 10px;
    margin-left: 10px;
  }
  #domainconcept-database{
    margin-right: 10px;
    margin-left: 10px;
  }
  #learningitem-database{
    margin-right: 10px;
    margin-left: 10px;
  }
  #contentsection-database{
    margin-right: 10px;
    margin-left: 10px;
  }
</style>