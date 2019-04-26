import { LightningElement } from 'lwc';
// Import custom labels
import searchLabel from '@salesforce/label/c.Search_Label';
import placeholderLabel from '@salesforce/label/c.Search_Place_Holder';
export default class GS_TypeAhead extends LightningElement {

    label = {
        searchLabel,
        placeholderLabel,
    };
}