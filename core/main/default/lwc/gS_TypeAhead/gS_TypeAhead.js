/* eslint-disable no-console */
import { LightningElement, api , track, wire} from 'lwc';
import getSearchResults from '@salesforce/apex/GSLX_TypeAheadController.getSearchResults';
// Import custom labels
import searchLabel from '@salesforce/label/c.Search_Label';
import placeholderLabel from '@salesforce/label/c.Search_Place_Holder';
//static resources
import typeAheadResource from '@salesforce/resourceUrl/Typeahed';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

export default class GS_TypeAhead extends LightningElement {

    
    @api PlaceHolderText = "Search";
    @api MinLength = 3;
    @api HighlightResult = false;
    @api SearchGroups = "ALL FIELDS";   
    @api  ReturningFields;
    @api LoadingHTML;
    @api NoResultHTML;
    @api SearchItemHTML;
    @api SearchItemLandingPageURLPrefix;
    @api SearchResultLandingPageURLPrefix;
    @api CustomCssUrl;
    @api DataCacheEnabled;
    @api SearchLimit = 10;
    @api SearchOffset=0;
    @api SortByFields;
    @api SearchWhereClause;
    @api SearchItemTextBoxVisibleField;
    @track searchTerm;
    @track searchResults;
    @track error;
    @track actualFields = [];

    typeaheadInitialized = false;


    label = {
        searchLabel,
        placeholderLabel,
    };

    renderedCallback() {

        if (this.typeaheadInitialized) {
            return;
        }
        this.typeaheadInitialized = true;
        this.initializeTypeAhead();
        
    }

    goToSearchPage( event) {
        console.log('clicked on search button');
        let searchString = this.getSearchValue();
        console.log(searchString);
        this.handleSearch(searchString);
        
    }
    initializeTypeAhead(){

        // load required JS and css files
        Promise.all([
            loadScript(this, typeAheadResource+'/Typeahead/jquery-3.2.1.min.js'),
            loadScript(this, typeAheadResource+'/Typeahead/DataCache.js'),
            loadScript(this, typeAheadResource+'/Typeahead/typeahead.js'),
            loadStyle(this, typeAheadResource + '/Typeahead/salesforce-lightning-design-system.min.css'),
        ])
        .then(() => { 
            console.log('Loaded typeahead related resources');
            // check the attribute degined in community
            console.log('Checking configurd attributes');
            console.log('Loading html: '+this.LoadingHTML);
            console.log('No Result HTML: '+this.NoResultHTML);
            console.log('Min Length:'+this.MinLength);
            console.log('Highlight Result: '+this.HighlightResult);
            // get the input element
            const inputBox = this.template.querySelector('.gs-global-search');
            if(inputBox === undefined)   console.log('No element found');
            else console.log('Found input element. Placeholder used: '+inputBox.getAttribute('placeholder'));
            //initialize jquery typeahead
            this.configureTypeHead(inputBox);
            
            
            
        })
        .error(error => { 
            console.log('Found Error loading jquery:'+JSON.stringify(error))
        });
        
        
        

    }
    getSearchValue(){
        const inputBox = this.template.querySelector('.gs-global-search');
        if(inputBox === undefined)   {
            console.log('No element found');
            return null;
        }
        return inputBox.value; 
    }
    configureTypeHead(inputBox){
        
        //debugger;
        $(inputBox).typeahead(
            {
                minLength: this.MinLength,
                highlight: this.HighlightResult
            },
            {
                name: 'searchResults',
                limit: Infinity,
                async: false,
                templates: {
                   pending :   this.LoadingHTML,
                   notFound : this.NoResultHTML
                },
                source: function() {
                      let searchTerm =   inputBox.value;
                      this.handleSearch(searchTerm)
                }
                ,
               
                display: (item) => {
                    
                }
                
            }
            
        )
       
        //debugger;
        console.log('finished');

        return true;
        
    }

    handleSearch(queryTerm){


        this.searchTerm = queryTerm;
        if(queryTerm === undefined )    {
            console.log('Invalid search term provided.');
            return;
        }
        if(this.searchGroup === undefined)   this.searchGroup = 'All Fields';
        console.log('Making Apex call ..');

        getSearchResults(
            {
                searchTerm : this.searchTerm,
                searchGroup: this.searchGroup,
                returnFields: this.ReturningFields,
                limitOfRecord: this.SearchLimit,
                Offset: this.SearchOffset,
                whereClause: this.SearchWhereClause,
                orderString: this.SortByFields
            }
        )
        .then(result => {
            this.searchResults = result;
            this.error = undefined;
            console.log('Response found:' +JSON.stringify(this.searchResults));
            
        })
        .catch(error => {
            this.error = error;
            this.searchResults = undefined;
        });

    }
  
}