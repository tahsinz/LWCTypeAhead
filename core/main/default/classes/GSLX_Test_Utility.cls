/**
* Utility class for helping test cases setup
* 
* @author  Tahsin Zulkarnine <tahsin@gscloudsolutions.com>
* @version 1.0
* @since   2017-09-20 
*/
@isTest
public class GSLX_Test_Utility {

    @testSetup
    public static void setup() {
    
        List<Account> accounts = new List<Account>();
        
        for(Integer i=0; i <15; i++){
            
            Account a = new Account();
            a.Name = 'united '+String.valueOf(i);
            accounts.add(a);
        }
                    
        insert accounts;
        
        List<Contact> contacts = new List<Contact>();
        Integer counter = 0;
        for(Account a:accounts){
        
            Contact contact = new Contact();
            contact.AccountId = a.Id;
            contact.FirstName = 'united';
            contact.LastName = String.valueOf(counter);
            counter++;
            contacts.add(contact);
        }
                    
        insert contacts;
    }
}