/**
*  Wrapper Class containing the core field for Typeahead
* 
* @author  Tahsin Zulkarnine <tahsin@gscloudsolutions.com>
* @version 1.0
* @since   2017-09-07
*/

public class GSLX_TypeAheadItemWrapper {

     @AuraEnabled public SObject element{get;set;}
     @AuraEnabled public String objectName {get;set;}
    
    /*
    * Constructor of the class
    *
    * @param none
    * @return none
    */
    public GSLX_TypeAheadItemWrapper( SObject objectItem){
    
        this.element = objectItem;
        this.objectName = objectItem.getSObjectType().getDescribe().getName();
    }
}