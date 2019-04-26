/**
*  Core Class containing the SOSL operations for Typeahead
* 
* @author  Tahsin Zulkarnine <tahsin@gscloudsolutions.com>
* @version 1.0
* @since   2017-09-07
*/
public without sharing class GSLX_TypeAheadSelector {

    /*
    * Core method to get the search results
    *
    * @param String search term
    * @param String search group
    * @param String return fields
    * @param Integer limit Of Record
    * @param Integer Offset for search
    * @param String where clause
    * @param String order by for sorting purposes
    * @return List<List<SObject>>   list of result returned from sosl
    * @exception NoSuchElementException, NoDataFoundException, SerializationException
    */
    public List<List<SObject>> getSearchResults(String searchTerm, String searchGroup, String returnFields, Integer limitOfRecord, 
                                                Integer Offset, String whereClause, String orderString){
    
        List<List<SObject>> resultItems;
        
        if(searchTerm == null || String.isBlank(searchTerm) || searchGroup == null || String.isBlank(searchGroup) || returnFields == null || String.isBlank(returnFields))  {
            System.debug('GSLX_TypeAheadSelector - getSearchResults() Invalid input provided ');
            return resultItems;
        }
        // Preventing SOSL Injection be escaping the inputs
        String query ='FIND \''+String.escapeSingleQuotes(searchTerm)+'\' IN '+ String.escapeSingleQuotes(searchGroup) +' RETURNING '+String.escapeSingleQuotes(returnFields)+' ';
        if(whereClause != null && !String.isBlank(whereClause)) query+=' WHERE '+String.escapeSingleQuotes(whereClause);
        if(orderString != null && !String.isBlank(orderString)) query+=' ORDER BY '+String.escapeSingleQuotes(orderString);
        if(limitOfRecord != null && Integer.valueOf(limitOfRecord) > 0) query+= ' LIMIT '+ limitOfRecord;
        //TODO: Offsets are geneally used in return fields. Need to look into how to use the offset
        //query+= ' Offset '+ Offset;
        System.debug('SOSL Query: '+query);
        resultItems = search.query(query);
        
        return resultItems;
    }
}