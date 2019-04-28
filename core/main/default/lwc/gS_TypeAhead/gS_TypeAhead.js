/* eslint-disable no-console */
import { LightningElement, api , track, wire} from 'lwc';
import getSearchResults from '@salesforce/apex/GSLX_TypeAheadController.getSearchResults';
// Import custom labels
import searchLabel from '@salesforce/label/c.Search_Label';
import placeholderLabel from '@salesforce/label/c.Search_Place_Holder';

export default class GS_TypeAhead extends LightningElement {

    
    @api PlaceHolderText = "Search";
    @api MinLength = 3;
    @api HighlightResult;
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

    label = {
        searchLabel,
        placeholderLabel,
    };
    goToSearchPage( event) {
        console.log('clicked on search button');
        this.handleSearch();
        
    }

    handleSearch(){
        this.searchTerm = 'Test';
        this.searchGroup = 'All Fields';
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
            console.log(JSON.parse(JSON.stringify(this.searchResults)));
            
        })
        .catch(error => {
            this.error = error;
            this.searchResults = undefined;
        });

    }


    
  
}