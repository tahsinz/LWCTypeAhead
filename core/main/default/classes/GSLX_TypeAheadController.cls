/**
*  Controller Class containing the core methods for UI Type ahead
* 
* @author  Tahsin Zulkarnine <tahsin@gscloudsolutions.com>
* @version 1.0
* @since   2017-09-07
*/
public class GSLX_TypeAheadController {

   
   
    @AuraEnabled(cacheable=true)
    public static  List<GSLX_TypeAheadItemWrapper> getSearchResults(String searchTerm, String searchGroup, String returnFields, Integer limitOfRecord, 
                                                Integer Offset, String whereClause, String orderString){
            System.debug('Search term: '+searchTerm);
            System.debug('Search group: '+searchGroup);
            System.debug('Returning fields: '+returnFields);
            System.debug('Limits: '+limitOfRecord);
            System.debug('Offset: '+Offset);
            System.debug('Where clause: '+whereClause);
            System.debug('Order String: '+orderString);
        
            return  GSLX_TypeAheadService.getSearchResults(searchTerm,searchGroup,returnFields,limitOfRecord,Offset,whereClause,orderString);
        
    }
}