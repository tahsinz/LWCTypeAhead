/**
*  Class containing the core methods for UI Type ahead services uses cases
* 
* @author  Tahsin Zulkarnine <tahsin@gscloudsolutions.com>
* @version 1.0
* @since   2017-09-07
*/
public class GSLX_TypeAheadService {

    
    public static List<GSLX_TypeAheadItemWrapper> getSearchResults(String searchTerm, String searchGroup, String returnFields, Integer limitOfRecord, 
                                                Integer Offset, String whereClause, String orderString){
        
        
        System.debug('Search term: '+searchTerm);
        System.debug('Search group: '+searchGroup);
        System.debug('Returning fields: '+returnFields);
        System.debug('Limits: '+limitOfRecord);
        System.debug('Offset: '+Offset);
        System.debug('Where clause: '+whereClause);
        System.debug('Order String: '+orderString);
        
        List<GSLX_TypeAheadItemWrapper> searchItems = new List<GSLX_TypeAheadItemWrapper>();
        
        if(searchTerm == null || String.isBlank(searchTerm) || searchGroup == null || String.isBlank(searchGroup) || returnFields == null || String.isBlank(returnFields))  {
            System.debug('GSLX_TypeAheadService - getSearchResults() Invalid input provided ');
            return searchItems;
        }
        
        try{
            GSLX_TypeAheadSelector typeaheadSelector = new GSLX_TypeAheadSelector();
            List<List<SObject>> searchResult =  typeaheadSelector.getSearchResults(searchTerm,searchGroup,returnFields,limitOfRecord,Offset,whereClause,orderString);
            System.debug('Search Result: '+searchResult);
            if(searchResult.size() > 0) {
            
                for(List<SObject> result: searchResult){
                
                    System.debug('Size: '+result.size());
                    for(SObject s: result){
                        GSLX_TypeAheadItemWrapper itemWrapper = new GSLX_TypeAheadItemWrapper(s);
                        searchItems.add(itemWrapper);
                    }
                }
            }
        }
        catch(Exception ex){
            
            String errorMsg = 'Typeahead Service: Operation failed for search term: '+searchTerm;
            System.debug(errorMsg);
            //GSLX_ExceptionDomain.saveException('Error from Typeahead service:', searchTerm, errorMsg, ex );
            return searchItems;
        }
        return searchItems;
    }
}